import { describe, expect, it, vi } from 'vitest';
import { register } from '../hooks/fast-jev.ts';

const refusal = 'jev-relay: $.session.compact: not available in a headless (-p / SDK) session yet';
function harness() {
  const hooks: Record<string, (...args: any[]) => Promise<any>> = {};
  register(((name: string, handler: any) => { hooks[name] = handler; }) as never, {});
  const compact = vi.fn(async (): Promise<unknown> => ({ messages: [] }));
  const run = vi.fn(async (_input: unknown): Promise<unknown> => ({}));
  const log = vi.fn();
  const usage = vi.fn(async () => ({ context: { percent: 70 } }));
  const $ = { session: { compact, usage }, command: { run }, ui: { log } };
  const next = vi.fn(async () => ({ text: 'done' }));
  return { compact, run, log, usage, next,
    turn: (event: object = {}) => hooks['turn.complete']!($, { reason: 'answer', ...event }, next) };
}
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

describe('local SDK auto-compaction', () => {
  it('retains native terminal compaction', async () => {
    const h = harness();
    expect(await h.turn()).toEqual({ text: 'done' });
    expect(h.compact).toHaveBeenCalledTimes(1);
    expect(h.run).not.toHaveBeenCalled();
  });
  it('queues compact on the exact SDK refusal without blocking the turn', async () => {
    const h = harness();
    h.compact.mockRejectedValue(new Error(refusal));
    let finish!: (value: unknown) => void;
    h.run.mockImplementation(() => new Promise(resolve => { finish = resolve; }));
    expect(await h.turn()).toEqual({ text: 'done' });
    expect(h.run).toHaveBeenCalledWith({ command: 'compact' });
    h.usage.mockResolvedValue({ context: { percent: 90 } });
    await h.turn();
    expect(h.compact).toHaveBeenCalledTimes(1);
    finish({}); await flush();
    await h.turn();
    expect(h.compact).toHaveBeenCalledTimes(2);
  });
  it('does not queue on unrelated errors', async () => {
    const h = harness(); h.compact.mockRejectedValue(new Error('permission denied'));
    await h.turn();
    expect(h.run).not.toHaveBeenCalled();
    expect(h.log).toHaveBeenCalledWith('auto-compact skipped (permission denied)');
  });
  it('reports queue failures and releases the guard', async () => {
    const h = harness(); h.compact.mockRejectedValue(new Error(refusal));
    h.run.mockRejectedValue(new Error('queue unavailable'));
    await h.turn(); await flush();
    expect(h.log).toHaveBeenCalledWith('auto-compact queue failed (queue unavailable)');
    h.usage.mockResolvedValue({ context: { percent: 80 } });
    await h.turn(); await flush();
    expect(h.compact).toHaveBeenCalledTimes(2);
  });
  it('avoids loops above threshold, retries on growth, and rearms below threshold', async () => {
    const h = harness(); h.compact.mockRejectedValue(new Error(refusal));
    await h.turn(); await flush(); await h.turn(); await flush();
    expect(h.run).toHaveBeenCalledTimes(1);
    h.usage.mockResolvedValue({ context: { percent: 75 } });
    await h.turn(); await flush();
    expect(h.run).toHaveBeenCalledTimes(2);
    h.usage.mockResolvedValue({ context: { percent: 50 } }); await h.turn();
    h.usage.mockResolvedValue({ context: { percent: 61 } }); await h.turn(); await flush();
    expect(h.run).toHaveBeenCalledTimes(3);
  });
  it('ignores child loops and interrupted/error/refusal turns', async () => {
    const h = harness();
    for (const event of [{ agentId: 'child' }, { reason: 'aborted' }, { reason: 'error' }, { reason: 'refusal' }]) await h.turn(event);
    expect(h.usage).not.toHaveBeenCalled();
  });
  it('takes the guard before awaiting usage', async () => {
    const h = harness();
    await Promise.all([h.turn(), h.turn()]);
    expect(h.compact).toHaveBeenCalledTimes(1);
  });
  it('ignores missing/invalid usage and below-threshold turns', async () => {
    const h = harness();
    for (const percent of [undefined, NaN, 59]) {
      h.usage.mockResolvedValue({ context: { percent } } as never); await h.turn();
    }
    expect(h.compact).not.toHaveBeenCalled();
  });
});
