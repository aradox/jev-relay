# Upstream review for Jev Relay 0.4.0

Reviewed 2026-10-19. Triaged all 150 upstream issue/PR entries (50 issues,
100 pull requests, open and closed). Selected changes were reviewed as source
diffs, integrated with attribution, and tested together. This is a reliability
release, not a blanket merge of every upstream proposal.

## Applied changes

- [#40](https://github.com/tamaratran/fast-jev-compaction/pull/40): Validate response objects, discriminators, own properties and probabilities.
- [#41](https://github.com/tamaratran/fast-jev-compaction/pull/41): Validate thresholds at both library entry points.
- [#42](https://github.com/tamaratran/fast-jev-compaction/pull/42): Reject ambiguous pairs; protect pinned calls even with injected decisions.
- [#43](https://github.com/tamaratran/fast-jev-compaction/pull/43): Keep unresolved calls visible in classifier state.
- [#44](https://github.com/tamaratran/fast-jev-compaction/pull/44): Limit batch concurrency to four by default; stop queued work after failure.
- [#45](https://github.com/tamaratran/fast-jev-compaction/pull/45): Add library HTTP deadlines, response-body deadlines and caller cancellation.
- [#46](https://github.com/tamaratran/fast-jev-compaction/pull/46): Already covered by Relay: acquire lock before async usage read.
- [#47](https://github.com/tamaratran/fast-jev-compaction/pull/47): Make logging and toast failures unable to change compaction outcomes.
- [#48](https://github.com/tamaratran/fast-jev-compaction/pull/48): Build public exports before npm pack.
- [#49](https://github.com/tamaratran/fast-jev-compaction/pull/49): Reserve request space for questions before fitting state.
- [#50](https://github.com/tamaratran/fast-jev-compaction/pull/50): Include explicit compaction instructions alongside the task goal.
- [#64](https://github.com/tamaratran/fast-jev-compaction/pull/64): Redact credential-shaped tool-input fields without mutating the transcript.
- [#85](https://github.com/tamaratran/fast-jev-compaction/pull/85): Charge dense identifiers/hash-like text more conservatively in token estimates.
- [#110](https://github.com/tamaratran/fast-jev-compaction/pull/110): Truncate results without splitting Unicode surrogate pairs.
- [#112](https://github.com/tamaratran/fast-jev-compaction/pull/112): Adapted: skip speculative precompute; existing main-turn guards retained. Subagent compaction interception remains enabled.
- [#117](https://github.com/tamaratran/fast-jev-compaction/pull/117): Bound the entire hook Jev round with the host clock; ignore late responses.
- [#142](https://github.com/tamaratran/fast-jev-compaction/pull/142): Expose optional System One endpoint and TYPESAFE_BASE_URL lookup.
- [#143](https://github.com/tamaratran/fast-jev-compaction/pull/143): Enforce 128 questions (64 tool calls) per request; omit unrelated provider changes.
- [#146](https://github.com/tamaratran/fast-jev-compaction/pull/146): Make per-call decision logs opt-in; keep outcome logs.

The SDK fallback from #111 remains in place. The upstream hardening stack was
merged with its original commit history; independent commits retain authors.
Overlapping hooks were reconciled so best-effort diagnostics, explicit goals,
deadlines, the SDK queue and Relay's pending guard all coexist.

## Validation

- TypeScript checks for library, plugin and native host tests.
- Vitest unit tests, Node regression suite (including a clean package build),
  and native dispatcher tests with a virtual clock.
- Live SDK stream compaction using the installed VS Code runtime and synthetic
  data, with no production conversation used as a test fixture.
- Plugin manifest validation and installed hook/source hash comparison.

The exact release test outcomes are recorded in the release commit and local
verification result. Unit/host tests use fake responses; the SDK smoke test
uses TypeSafe. Character reduction is not proof of safe fact retention.

## Remaining limitations and deferred changes

- **Resume/message identity (#89, #129, #137, #139, #145):** upstream proposals
  conflict: one retains handles on rebuilt rows, another strips all handles.
  The current API documents handles as references to original complete content.
  Blindly retaining them can undo edits; stripping them removes hidden reasoning,
  images and host metadata. Neither workaround is enabled by this release.
  Long, mixed-media, parallel-tool and repeated resume sessions remain unverified.
- **Queued mid-turn instructions (#133):** the compact API may not expose host
  attachments. No plugin patch can reliably preserve content it cannot see.
  Avoid assuming this release fixes that host limitation.
- **Retention policy/calibration (#25, #26, #52, #56, #65, #70, #147):** no scoring
  thresholds were guessed, no user/assistant text is newly shortened, and no
  evidence-preservation guarantee is claimed. Broad pruning/rewriting features
  are deferred pending a critical-fact replay evaluation.
- Redaction masks credential-shaped structured tool-input fields. It is not a
  general secret detector: free-form text and shell command strings may contain
  secrets. The API key header is still required for the chosen endpoint.
- The host timeout bounds the wait but cannot cancel host HTTP requests already
  sent. Their late result cannot replace the conversation. Library clients
  separately support AbortSignal cancellation.
- A plugin-triggered timeout skips compaction; a manual/engine-triggered timeout
  retains native fallback. The SDK queue raises a manual compact event, so its
  timeout also follows that native fallback path.
- Custom baseUrl uses the same System One request format, not arbitrary chat APIs.
- Other agent platforms, new decision providers and aggressive content rewriting
  are separate features, not prerequisites for this installation.

## Complete triage index

| Entry | Kind | Title | Decision |
|---|---|---|---|
| [1](https://github.com/tamaratran/fast-jev-compaction/pull/1) | PR | Initial fast-jev-compaction library | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [2](https://github.com/tamaratran/fast-jev-compaction/pull/2) | PR | Add Claude Code mod that replaces compaction with Jev pruning | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [3](https://github.com/tamaratran/fast-jev-compaction/pull/3) | PR | Fix mod API key fallback and doubled log prefix | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [4](https://github.com/tamaratran/fast-jev-compaction/pull/4) | PR | Add native macOS animated compaction demo (demo/JevDemo) | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [5](https://github.com/tamaratran/fast-jev-compaction/pull/5) | PR | Shorten compaction demo, simplify text, and add animated token counter | Triaged; no additional change selected for this Claude Code reliability release. |
| [6](https://github.com/tamaratran/fast-jev-compaction/pull/6) | PR | Make Jev compaction effective on real tool output and visible in the UI | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [7](https://github.com/tamaratran/fast-jev-compaction/pull/7) | PR | Ask Jev directly whether a message is a protected constraint or pending task | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [8](https://github.com/tamaratran/fast-jev-compaction/pull/8) | PR | Let Jev truncate stale tool results instead of only dropping them | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [9](https://github.com/tamaratran/fast-jev-compaction/pull/9) | PR | Compact by asking Jev per tool call/result against the whole stripped history | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [10](https://github.com/tamaratran/fast-jev-compaction/pull/10) | PR | Keep the head of a tool result Jev drops instead of only a note | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [11](https://github.com/tamaratran/fast-jev-compaction/pull/11) | PR | Port the tool-call compaction model into the core library; plugin becomes a thin adapter | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [12](https://github.com/tamaratran/fast-jev-compaction/pull/12) | PR | Require the TypeSafe API key as a plugin option | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [13](https://github.com/tamaratran/fast-jev-compaction/pull/13) | PR | Conservative token estimate and deeper state fitting for long histories | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [14](https://github.com/tamaratran/fast-jev-compaction/pull/14) | PR | Document installing the plugin in Claude Code | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [15](https://github.com/tamaratran/fast-jev-compaction/pull/15) | PR | Summarize only what Jev drops, in front of the kept messages | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [16](https://github.com/tamaratran/fast-jev-compaction/pull/16) | PR | Split the per-call decision log into ui.log lines under the host's 4096-char limit | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [17](https://github.com/tamaratran/fast-jev-compaction/pull/17) | PR | README: update tagline to the current tool-call scoring design | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [18](https://github.com/tamaratran/fast-jev-compaction/pull/18) | PR | Trim long Bash output with Jev before the model sees it | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [19](https://github.com/tamaratran/fast-jev-compaction/pull/19) | PR | Add native Pi compaction extension using the shared Jev core | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [20](https://github.com/tamaratran/fast-jev-compaction/pull/20) | PR | Add /jevcompact slash command for on-demand Jev compaction | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [21](https://github.com/tamaratran/fast-jev-compaction/issues/21) | Issue | Hooks (0) on install — session.compact / turn.complete are not recognized Claude Code hook events (tested on Claude Code 2.1.272) | Triaged; no additional change selected for this Claude Code reliability release. |
| [22](https://github.com/tamaratran/fast-jev-compaction/pull/22) | PR | Add a pi extension that takes over compaction with Jev decisions | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [23](https://github.com/tamaratran/fast-jev-compaction/pull/23) | PR | Add optional Vercel AI Gateway transport for Jev requests | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [24](https://github.com/tamaratran/fast-jev-compaction/pull/24) | PR | Add native Codex plugin support | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [25](https://github.com/tamaratran/fast-jev-compaction/issues/25) | Issue | Protect non-reproducible tool results before relevance-based deletion | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [26](https://github.com/tamaratran/fast-jev-compaction/issues/26) | Issue | Keep scores give no signal while results are hidden (0 of 256 results scored ≥ 0.5 in a replay) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [27](https://github.com/tamaratran/fast-jev-compaction/pull/27) | PR | Reject out-of-range Jev probabilities | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [28](https://github.com/tamaratran/fast-jev-compaction/pull/28) | PR | Harden compaction against malformed Jev answers and control-flow races | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [29](https://github.com/tamaratran/fast-jev-compaction/issues/29) | Issue | Reject invalid Jev probabilities before making deletion decisions | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [30](https://github.com/tamaratran/fast-jev-compaction/issues/30) | Issue | Reject keep thresholds that discard even a certain keep decision | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [31](https://github.com/tamaratran/fast-jev-compaction/issues/31) | Issue | Reject ambiguous tool pairs before duplicate IDs remove pinned content | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [32](https://github.com/tamaratran/fast-jev-compaction/issues/32) | Issue | Keep unresolved tool calls visible in the classifier state | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [33](https://github.com/tamaratran/fast-jev-compaction/issues/33) | Issue | Bound concurrent Jev batches instead of dispatching the entire queue | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [34](https://github.com/tamaratran/fast-jev-compaction/issues/34) | Issue | Give JevClient requests a deadline and caller cancellation | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [35](https://github.com/tamaratran/fast-jev-compaction/issues/35) | Issue | Acquire the auto-compaction lock before awaiting session usage | Covered by Relay SDK queue/lock/cooldown; no second overlapping implementation. |
| [36](https://github.com/tamaratran/fast-jev-compaction/issues/36) | Issue | Do not let logging or toast failures break compaction fallback | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [37](https://github.com/tamaratran/fast-jev-compaction/issues/37) | Issue | Build exported files before creating an npm package | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [38](https://github.com/tamaratran/fast-jev-compaction/issues/38) | Issue | Reserve question capacity when fitting a smaller request budget | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [39](https://github.com/tamaratran/fast-jev-compaction/issues/39) | Issue | Pass explicit compact instructions to Jev without losing the current goal | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [40](https://github.com/tamaratran/fast-jev-compaction/pull/40) | PR | Reject malformed Jev probabilities before pruning | Applied / adapted: Validate response objects, discriminators, own properties and probabilities. |
| [41](https://github.com/tamaratran/fast-jev-compaction/pull/41) | PR | Validate keep thresholds at both compaction entry points | Applied / adapted: Validate thresholds at both library entry points. |
| [42](https://github.com/tamaratran/fast-jev-compaction/pull/42) | PR | Reject ambiguous tool pairs and preserve pinned calls | Applied / adapted: Reject ambiguous pairs; protect pinned calls even with injected decisions. |
| [43](https://github.com/tamaratran/fast-jev-compaction/pull/43) | PR | Keep unresolved tool calls visible to the classifier | Applied / adapted: Keep unresolved calls visible in classifier state. |
| [44](https://github.com/tamaratran/fast-jev-compaction/pull/44) | PR | Bound concurrent Jev batches and stop queued work on failure | Applied / adapted: Limit batch concurrency to four by default; stop queued work after failure. |
| [45](https://github.com/tamaratran/fast-jev-compaction/pull/45) | PR | Add request deadlines and cancellation to JevClient | Applied / adapted: Add library HTTP deadlines, response-body deadlines and caller cancellation. |
| [46](https://github.com/tamaratran/fast-jev-compaction/pull/46) | PR | Acquire the auto-compaction lock before awaiting usage | Applied / adapted: Already covered by Relay: acquire lock before async usage read. |
| [47](https://github.com/tamaratran/fast-jev-compaction/pull/47) | PR | Keep UI failures out of the compaction control path | Applied / adapted: Make logging and toast failures unable to change compaction outcomes. |
| [48](https://github.com/tamaratran/fast-jev-compaction/pull/48) | PR | Build exported files before packaging the library | Applied / adapted: Build public exports before npm pack. |
| [49](https://github.com/tamaratran/fast-jev-compaction/pull/49) | PR | Reserve question capacity before fitting the state | Applied / adapted: Reserve request space for questions before fitting state. |
| [50](https://github.com/tamaratran/fast-jev-compaction/pull/50) | PR | Preserve explicit compaction instructions in the Jev task | Applied / adapted: Include explicit compaction instructions alongside the task goal. |
| [51](https://github.com/tamaratran/fast-jev-compaction/pull/51) | PR | Route Jev through OpenRouter's Decisions endpoint | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [52](https://github.com/tamaratran/fast-jev-compaction/issues/52) | Issue | Question wording hides Jev's signal, and late fitting stages remove the messages being scored (replay on a 1084-message session) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [53](https://github.com/tamaratran/fast-jev-compaction/pull/53) | PR | Fall back when Jev keeps no scored call | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [54](https://github.com/tamaratran/fast-jev-compaction/issues/54) | Issue | Where do I get TYPESAFE_API_KEY? (no issuance path found on typesafe.com / console.akka.io) | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [55](https://github.com/tamaratran/fast-jev-compaction/pull/55) | PR | Fix the Jev request budget, the keep threshold, and the missing question criteria | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [56](https://github.com/tamaratran/fast-jev-compaction/issues/56) | Issue | keepThreshold 0.5 makes 'keep' unreachable: keepResult and keepCall come back on different scales | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [57](https://github.com/tamaratran/fast-jev-compaction/pull/57) | PR | Show Jev a preview of each tool result in its keep question | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [58](https://github.com/tamaratran/fast-jev-compaction/pull/58) | PR | Gateway options, quieter hooks, and retries with batch salvage | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [59](https://github.com/tamaratran/fast-jev-compaction/pull/59) | PR | fix: upgrade vitest to ^5.0.1 to resolve vite/esbuild security advisories | Deferred dependency-major upgrade: independent toolchain migration; no production server is exposed by current test-only dependencies. |
| [60](https://github.com/tamaratran/fast-jev-compaction/issues/60) | Issue | fast-jev-compaction is now a live context engine of Hermes Agent | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [61](https://github.com/tamaratran/fast-jev-compaction/pull/61) | PR | Add a resultQuestion option so the result question can ask what is still needed | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [62](https://github.com/tamaratran/fast-jev-compaction/issues/62) | Issue | question | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [63](https://github.com/tamaratran/fast-jev-compaction/pull/63) | PR | OpenRouter wiring + jev-compact/jev-gate CLI tools | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [64](https://github.com/tamaratran/fast-jev-compaction/pull/64) | PR | Redact credential fields before sending Jev state | Applied / adapted: Redact credential-shaped tool-input fields without mutating the transcript. |
| [65](https://github.com/tamaratran/fast-jev-compaction/issues/65) | Issue | drop_call keeps the assistant's narration but removes the evidence: after one compaction the model wrote 9 consecutive tool-free "work done" reports, all fabricated | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [66](https://github.com/tamaratran/fast-jev-compaction/issues/66) | Issue | Support for Desktop? | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [67](https://github.com/tamaratran/fast-jev-compaction/pull/67) | PR | Gate the tool call separately from its result | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [68](https://github.com/tamaratran/fast-jev-compaction/pull/68) | PR | fix: resolve text-floor deadlocks, dual threshold calibration, and prefix cache invalidation | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [69](https://github.com/tamaratran/fast-jev-compaction/pull/69) | PR | fix: mark dropped tool calls in assistant narration | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [70](https://github.com/tamaratran/fast-jev-compaction/issues/70) | Issue | Repeated compaction: the candidate set never covers what accumulates, and `< 25% removed → summary` mistakes "nothing left to prune" for "Jev failed" (two live sessions, 9 rounds) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [71](https://github.com/tamaratran/fast-jev-compaction/pull/71) | PR | feat: OpenCode 1 and 2 plugin, free Jev via OpenCode Zen, git install | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [72](https://github.com/tamaratran/fast-jev-compaction/issues/72) | Issue | No durable record of which path a compaction took: ui.log and ui.toast are TUI-only, so a headless install cannot tell Jev from the fallback | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [73](https://github.com/tamaratran/fast-jev-compaction/issues/73) | Issue | DSH 用户可以看一下这个：dsh-fast-jev-compaction | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [74](https://github.com/tamaratran/fast-jev-compaction/pull/74) | PR | Adding the Vercel AI Gateway, speak both Jev APIs from the hook | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [75](https://github.com/tamaratran/fast-jev-compaction/pull/75) | PR | Harden compaction safety and packaging | Triaged; no additional change selected for this Claude Code reliability release. |
| [76](https://github.com/tamaratran/fast-jev-compaction/issues/76) | Issue | Function hooks not loaded on Claude Code 2.1.278 — plugin shows Hooks (0) | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [77](https://github.com/tamaratran/fast-jev-compaction/pull/77) | PR | feat: add verdict-based compaction outcomes and result tombstones | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [78](https://github.com/tamaratran/fast-jev-compaction/pull/78) | PR | feat: exclude host text from goals and truncate notices | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [79](https://github.com/tamaratran/fast-jev-compaction/pull/79) | PR | fix: drop empty assistant messages after compaction | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [80](https://github.com/tamaratran/fast-jev-compaction/pull/80) | PR | chore: align package version with the published plugin manifests | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [81](https://github.com/tamaratran/fast-jev-compaction/issues/81) | Issue | max_tokens_exceeded 400 while the local maxStateTokens check passes: estimateTokens undercounts dense runs (hex, UUIDs, base64) | Triaged; no additional change selected for this Claude Code reliability release. |
| [82](https://github.com/tamaratran/fast-jev-compaction/issues/82) | Issue | Calibration datapoints for Han-bearing payloads: estimator stays above actual (10 archived pairs, Han ~0.99 tok/char) | Triaged; no additional change selected for this Claude Code reliability release. |
| [83](https://github.com/tamaratran/fast-jev-compaction/pull/83) | PR | Add dropCalls option: stub a no-longer-needed call instead of deleting it (#65) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [84](https://github.com/tamaratran/fast-jev-compaction/pull/84) | PR | Wire baseUrl through the hook | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [85](https://github.com/tamaratran/fast-jev-compaction/pull/85) | PR | fix(state): charge dense runs (hex, UUIDs, base64) ~3 chars per token in estimateTokens | Applied / adapted: Charge dense identifiers/hash-like text more conservatively in token estimates. |
| [86](https://github.com/tamaratran/fast-jev-compaction/issues/86) | Issue | Feature Proposal: Support local open-source decision engine (Laya) as an alternative to TypeSafe Jev API | Triaged; no additional change selected for this Claude Code reliability release. |
| [87](https://github.com/tamaratran/fast-jev-compaction/pull/87) | PR | feat: Add local open-source decision engine (Laya) support | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [88](https://github.com/tamaratran/fast-jev-compaction/issues/88) | Issue | hooks cannot actually replace compaction, and full transcripts are sent to a third-party API | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [89](https://github.com/tamaratran/fast-jev-compaction/issues/89) | Issue | Compaction is undone on --resume: hook boundary has no preservedSegment/preservedMessages anchors | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [90](https://github.com/tamaratran/fast-jev-compaction/pull/90) | PR | fix: read TYPESAFE_BASE_URL from env to support local decision models | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [91](https://github.com/tamaratran/fast-jev-compaction/pull/91) | PR | Let the hook point at an OpenRouter decisions endpoint | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [92](https://github.com/tamaratran/fast-jev-compaction/issues/92) | Issue | Feature Request: Support SemIf decision engine for Apple Silicon MPS | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [93](https://github.com/tamaratran/fast-jev-compaction/pull/93) | PR | feat: Add SemIf decision engine support for Apple Silicon MPS (fixes #92) | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [94](https://github.com/tamaratran/fast-jev-compaction/pull/94) | PR | feat: baseUrl option (or TYPESAFE_BASE_URL) for the Claude Code hook | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [95](https://github.com/tamaratran/fast-jev-compaction/pull/95) | PR | Let an OpenRouter key drive the compaction hook (baseUrl option + OpenRouter key lookup) | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [96](https://github.com/tamaratran/fast-jev-compaction/pull/96) | PR | feat(hook): let the Jev endpoint be configured so a key for another host works | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [97](https://github.com/tamaratran/fast-jev-compaction/issues/97) | Issue | Jev requests from real sessions are blocked by Cloudflare WAF (HTTP 403 HTML page) | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [98](https://github.com/tamaratran/fast-jev-compaction/pull/98) | PR | Redact secrets from the Jev request; keep compaction across --resume (#89) | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [99](https://github.com/tamaratran/fast-jev-compaction/issues/99) | Issue | Replay on real Claude Code sessions: Laya, SWE-Pruner, Needle 3 and a next-message oracle don't meaningfully beat head+tail (notes for #18, #86/#87) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [100](https://github.com/tamaratran/fast-jev-compaction/issues/100) | Issue | Is it really accurate? | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [101](https://github.com/tamaratran/fast-jev-compaction/pull/101) | PR | Explain HTML 403 responses from endpoint | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [102](https://github.com/tamaratran/fast-jev-compaction/pull/102) | PR | Clarify data handling and compaction hook scope | Triaged; no additional change selected for this Claude Code reliability release. |
| [103](https://github.com/tamaratran/fast-jev-compaction/pull/103) | PR | Fall back to the built-in summary only on Claude Code's auto compaction | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [104](https://github.com/tamaratran/fast-jev-compaction/issues/104) | Issue | jev | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [105](https://github.com/tamaratran/fast-jev-compaction/pull/105) | PR | Salvage identifiers from dropped results | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [106](https://github.com/tamaratran/fast-jev-compaction/pull/106) | PR | fix: forward-compatible typecheck and plugin metadata | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [107](https://github.com/tamaratran/fast-jev-compaction/issues/107) | Issue | session.compact / turn.complete: precompute, subagent/fork and non-answer turns are not filtered; in-flight guard can race | Context reviewed; existing setup, selected fixes or known limitations apply; no independent patch adopted. |
| [108](https://github.com/tamaratran/fast-jev-compaction/issues/108) | Issue | No codex? | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [109](https://github.com/tamaratran/fast-jev-compaction/issues/109) | Issue | Feature Request: Add support to use API KEY from Cloudflare AI Gateway to use Jev | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [110](https://github.com/tamaratran/fast-jev-compaction/pull/110) | PR | fix: truncate dropped tool results on a code point boundary | Applied / adapted: Truncate results without splitting Unicode surrogate pairs. |
| [111](https://github.com/tamaratran/fast-jev-compaction/pull/111) | PR | Queue /compact when an SDK session refuses $.session.compact | Covered by Relay SDK queue/lock/cooldown; no second overlapping implementation. |
| [112](https://github.com/tamaratran/fast-jev-compaction/pull/112) | PR | fix: filter speculative and subagent compaction hooks | Applied / adapted: Adapted: skip speculative precompute; existing main-turn guards retained. Subagent compaction interception remains enabled. |
| [113](https://github.com/tamaratran/fast-jev-compaction/pull/113) | PR | feat: allow custom endpoints without requiring API key | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [114](https://github.com/tamaratran/fast-jev-compaction/issues/114) | Issue | Does the plugin accept an OpenRouter API key? 401 authentication_error with it | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [115](https://github.com/tamaratran/fast-jev-compaction/issues/115) | Issue | Feature Request :: How to adptat this use with Laya (the Open Source jev) | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [116](https://github.com/tamaratran/fast-jev-compaction/pull/116) | PR | Reach any Jev endpoint, and read the key from a dotenv file | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [117](https://github.com/tamaratran/fast-jev-compaction/pull/117) | PR | Bound Jev waits in the Claude Code compaction hook | Applied / adapted: Bound the entire hook Jev round with the host clock; ignore late responses. |
| [118](https://github.com/tamaratran/fast-jev-compaction/pull/118) | PR | Keep non-reproducible facts when a call is dropped | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [119](https://github.com/tamaratran/fast-jev-compaction/pull/119) | PR | Ask Jev in windows when the history does not fit the state budget | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [120](https://github.com/tamaratran/fast-jev-compaction/pull/120) | PR | Size the reduction by window pressure and save reduced outputs to files (stacked on #118, #119) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [121](https://github.com/tamaratran/fast-jev-compaction/pull/121) | PR | Add Codex transcript compaction adapter | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [122](https://github.com/tamaratran/fast-jev-compaction/pull/122) | PR | Install the hook's own compaction when the built-in summary it fell back to fails (stacked on #120) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [123](https://github.com/tamaratran/fast-jev-compaction/issues/123) | Issue | Preserve a compaction marker when dropping tool calls and results | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [124](https://github.com/tamaratran/fast-jev-compaction/pull/124) | PR | Hook: read endpoint from JEV_BASE_URL / TYPESAFE_BASE_URL, route sk-or- keys to OpenRouter | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [125](https://github.com/tamaratran/fast-jev-compaction/pull/125) | PR | Stop retrying auto-compact in headless sessions | Covered by Relay SDK queue/lock/cooldown; no second overlapping implementation. |
| [126](https://github.com/tamaratran/fast-jev-compaction/pull/126) | PR | OpenRouter transport + cap batches per compaction | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [127](https://github.com/tamaratran/fast-jev-compaction/pull/127) | PR | Record the 2026-10-04 replay re-measure in the hooks README | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [128](https://github.com/tamaratran/fast-jev-compaction/issues/128) | Issue | Lone UTF-16 surrogates from slice() cuts can reach the request body (400: invalid Unicode text) | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [129](https://github.com/tamaratran/fast-jev-compaction/issues/129) | Issue | Kept assistant messages are multiplied after a session resume | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [130](https://github.com/tamaratran/fast-jev-compaction/pull/130) | PR | Show unanswerable lookups and flag harness-limited gave-ups | No additional patch: historical/merged, superseded, unrelated or closed proposal. |
| [131](https://github.com/tamaratran/fast-jev-compaction/pull/131) | PR | chore: bump package.json to 0.3.0 to match plugin manifest | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [132](https://github.com/tamaratran/fast-jev-compaction/pull/132) | PR | fix: keep surrogate pairs whole when cutting text for the Jev state (#128) | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [133](https://github.com/tamaratran/fast-jev-compaction/issues/133) | Issue | Prompts queued mid-turn are dropped by compaction | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [134](https://github.com/tamaratran/fast-jev-compaction/pull/134) | PR | Hardening: provenance-mark compacted content and screen policy-style text (compaction is not a trust boundary) | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [135](https://github.com/tamaratran/fast-jev-compaction/pull/135) | PR | Fix lone surrogates from slice() cuts in truncate and abridge | Triaged; no additional change selected for this Claude Code reliability release. |
| [136](https://github.com/tamaratran/fast-jev-compaction/issues/136) | Issue | Published npm tarball (0.4.1) contains a third party's logs and files absent from this repo | Packaging provenance warning reviewed: build from Git sources and inspect own package; do not install the unrelated published tarball. |
| [137](https://github.com/tamaratran/fast-jev-compaction/issues/137) | Issue | Truncating one call of a parallel tool-call group splits its message; Claude Code then repairs the pairing with "Tool result missing" | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [138](https://github.com/tamaratran/fast-jev-compaction/pull/138) | PR | Fall back to curl when $.http.fetch cannot resolve the host | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [139](https://github.com/tamaratran/fast-jev-compaction/pull/139) | PR | fix: keep a rebuilt message's handle so parallel tool-call groups stay on one message (#137) | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [140](https://github.com/tamaratran/fast-jev-compaction/issues/140) | Issue | Compact injected message text (skill bodies, command output, /context), not only tool calls | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [141](https://github.com/tamaratran/fast-jev-compaction/pull/141) | PR | Compact injected message text and long assistant replies, not only tool calls | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [142](https://github.com/tamaratran/fast-jev-compaction/pull/142) | PR | Let the plugin hook take a System One base URL | Applied / adapted: Expose optional System One endpoint and TYPESAFE_BASE_URL lookup. |
| [143](https://github.com/tamaratran/fast-jev-compaction/pull/143) | PR | Fix/jev question cap | Applied / adapted: Enforce 128 questions (64 tool calls) per request; omit unrelated provider changes. |
| [144](https://github.com/tamaratran/fast-jev-compaction/pull/144) | PR | Ignore TYPESAFE_BASE_URL when OpenRouter wins | Deferred: additional transports, platform adapters, tool interception or external command fallbacks; optional endpoint support adopted from #142. |
| [145](https://github.com/tamaratran/fast-jev-compaction/issues/145) | Issue | Compacted session loses most of its history after --resume | Deferred: host message identity, resume, attachment or text-rewrite changes need dedicated mixed-content and resume testing; see limitations. |
| [146](https://github.com/tamaratran/fast-jev-compaction/pull/146) | PR | Make the per-call decision log opt-in (logDecisions, off by default) | Applied / adapted: Make per-call decision logs opt-in; keep outcome logs. |
| [147](https://github.com/tamaratran/fast-jev-compaction/issues/147) | Issue | Discussion: Robustness of Jev-Based Context Compaction | Deferred: changes retention policy, classifier calibration or transcript semantics; requires evidence-retention evaluation. |
| [148](https://github.com/tamaratran/fast-jev-compaction/pull/148) | PR | Make the per-call decisions log opt-in (logDecisions, default off) | Covered fully or in relevant part by selected hardening, Unicode, logging or version-alignment work. |
| [149](https://github.com/tamaratran/fast-jev-compaction/pull/149) | PR | Defer automatic compaction until the turn closes | Deferred timer-based native workaround; current SDK queue remains tested and avoids introducing a second scheduler. |
| [150](https://github.com/tamaratran/fast-jev-compaction/issues/150) | Issue | Auto-compaction never runs in the Claude desktop app / SDK sessions: $.session.compact() is rejected and the error is only logged | Covered by Relay SDK queue/lock/cooldown; no second overlapping implementation. |
