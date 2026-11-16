<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## UI architecture
- Shared visual styling is defined by semantic tokens in src/styles.css and shared UI controls; keep content and existing routes independent of visual reference files so redesigns do not replace business content.
- Live voice uses the server-owned Gateway relay and shared React hook, with language chosen from an allowlist and read-only service catalogue tools; preserve heartbeats, usage draining, origin checks, and explicit Stop so public guidance cannot execute government decisions or leave paid calls running.
