# Local VS Code compaction fix

Based on upstream commit e3f262a7f4d42bd8dd32ced30d26176f7cb545b0 (0.3.0).
Local plugin version: 0.4.0. Marketplace: fast-jev-local.

When the SDK host rejects $.session.compact(), queue the built-in compact
command without awaiting it from turn.complete. This invokes the existing
Jev session.compact handler after the turn finishes. Inspired by upstream
PR https://github.com/tamaratran/fast-jev-compaction/pull/111.

The pending guard stays set until the queued command settles. Only successful
main-conversation turns can request main-conversation compaction. A repeated
attempt requires five percentage points of growth or a dip below the threshold,
preventing loops when compaction keeps context above the trigger. Subagent
compaction events still use the existing Jev handler.

Defaults remain 60 percent trigger and 25 percent minimum reduction. API keys
remain in the existing user settings environment; none are stored here.

Initial SDK fix validated with 37 unit tests, TypeScript checks, plugin validation, and a live
SDK stream session using the VS Code 2.1.301 executable and synthetic Read data.
The live test queued compact, received Jev decisions, emitted compact_boundary,
and retained 4 of 10 messages (99 percent character reduction), without core
summarization. The smoke test lowers the trigger only through test settings.

This local source is independent of upstream marketplace updates. After editing
it, bump the plugin and marketplace versions and update the local installation.
Existing sessions need /reload-plugins or a VS Code window reload.

Rollback from PowerShell:

    claude plugin disable fast-jev-compaction@fast-jev-local --scope user
    claude plugin enable fast-jev-compaction@fast-jev-compaction --scope user

Then reload the session. Keep the upstream copy disabled during local use.

Version 0.4.0 adds reviewed upstream reliability fixes. See docs/upstream-review.md
for sources, adoption decisions, current checks and remaining host limitations.
