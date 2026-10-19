import { describe, it, expect, vi } from 'vitest';
import { register } from '../hooks/fast-jev.ts';

describe('speculative compaction', () => {
  it('skips precomputation without reading secrets, sending HTTP or changing history', async () => {
    const hooks: Record<string, (...args: any[]) => Promise<any>> = {};
    register(((name: string, handler: any) => { hooks[name] = handler; }) as never, {});
    const env = vi.fn(); const fetch = vi.fn(); const next = vi.fn();
    const messages = [{ role: 'user', text: 'Keep my pending instruction', toolUses: [] }];
    const result = await hooks['session.compact']!({ env: { get: env }, http: { fetch } },
      { trigger: 'precompute', messages }, next);
    expect(result).toEqual({ skip: 'Jev Relay waits for a live compaction' });
    expect(env).not.toHaveBeenCalled(); expect(fetch).not.toHaveBeenCalled(); expect(next).not.toHaveBeenCalled();
    expect(messages[0]?.text).toBe('Keep my pending instruction');
  });
});
