# Problem-impact ranker

You are helping me consolidate the captured problems for a programme into a single ranked Problem-impact analysis — each problem rated High/Medium/Low on severity, reach and frequency, ranked by the combined score and grouped into tiers, so the team knows which problem to build for first.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Plane project, but the token does not appear in output paths. Capture it so the user can confirm you are in the right project before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **Problem set scope** — which body of problems you're ranking (e.g. "all pre-, during-, and post-ICT problems", or one track's friction). One line.
- **Source of the problems** — where the captured problems come from (the Research synthesis friction table, a workshop board, a pasted list). Named in the output so the ranking is traceable.

Step 2 — Gather inputs.

Every artefact in the Knowledge Base lives at one of two scopes:

- **Programme-wide** — umbrella artefacts that apply across all tracks in a programme. Nested under the `Knowledge Base / Programme-wide` node.
- **Track-level** — artefacts specific to a single track within the programme. Nested under the `Knowledge Base / {{track}}` node.

When a downstream artefact needs upstream input (e.g. a journey-map-drafter needs a persona), search **both** scopes — list the children of the artefact-type node under each track:

```
Knowledge Base / {{track}} / <artefact-type> / *
Knowledge Base / Programme-wide / <artefact-type> / *
```

Resolve each artefact-type node by walking the parent chain, then list its child pages (`list_pages` filtered by `parent_id`). Where the project applies a track label, the same two-scope search can be expressed as a query filtering on the track and `Programme-wide` scopes. When the same artefact-type exists in both locations, the **track-level version takes precedence**. The programme-wide version is the fallback.

The fallback is **visible**, not silent. Tell the user which version you used and why, so they can see when track-level material is missing and whether the programme-wide fallback is appropriate.

- Read the **Friction-points table, Themes, and Problem-statement** sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide). The friction table is the seed: each friction row becomes a candidate problem, and its Severity / Frequency columns feed the rating directly. Its Evidence column is carried across as the evidence marker.
- Look up the **persona(s)** at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide) to rate Reach and Frequency — which roles each problem hits, and how often.
- Search `Knowledge Base/{{track}}/Prior-knowledge/*` and programme-wide for **prior-knowledge summaries** — what's already proven or already in flight. This grounds the evidence markers and the research status.
- Gather the **raw sources** the problems came from — field notes, workshop/board exports, or a pasted list — for the verbatims and evidence each entry must cite.
- Search `Knowledge Base/{{track}}/Heuristic-evaluations/*` and programme-wide for a **heuristic evaluation** of an existing or competitor product. Each finding is a candidate problem already scored for severity and tied to a screen — fold them into the register and cite the finding ID as evidence.
- Optionally read **journeys and service blueprints** in the project to identify clusters — which problems are one root cause seen from several seats. Clusters are noted beside the score, not scored.
- Show the user everything you found — the friction table, personas, prior-knowledge, and raw sources — and ask them to confirm or refine the problem set before you score it.
- In copy-paste mode: ask the user to paste the captured problems (or the board/workshop export), plus any verbatims and evidence they have. Ask for each missing input in turn.

Step 3 — Draft.

Produce a single page. Rate every problem, rank them, tier them, then read the ranking back. Output as markdown:

# Problem-impact analysis

**Scope:** [the problem set being ranked]
**Sources:** [links to the Research synthesis, personas, prior-knowledge, and raw sources — referenced throughout]

*Provenance. Every claim is grounded in the sources above. Nothing has been invented, and where the sources record no evidence the statement says so.*

## How impact was scored

Each problem is rated **High / Medium / Low** on three factors:

- **Severity** — how painful is the problem? **H** = safety, accuracy, pay or morale consequence, or work that has to be redone; **M** = significant extra effort or delay; **L** = an annoyance with a workaround.
- **Reach** — how many people are affected? Name the roles. **H** = several roles, or the whole user population; **M** = one role at scale; **L** = a narrow group.
- **Frequency** — how often does it occur? **H** = every cycle or every person; **M** = some cycles or a subset; **L** = occasional or edge cases.

**Score.** H = 3, M = 2, L = 1. The score is Severity + Reach + Frequency, from 3 to 9. H-H-H scores 9 and ranks first. Show the triple next to the score (for example `H-H-M · 8`).

**Tie-break.** Equal scores are ordered by Severity, then Reach, then Frequency. Problems still tied share a rank, marked `=`. Do not invent an order.

**Missing data.** Where the sources record nothing for a factor, mark it `?`, sort it as M, and flag the problem `[provisional]`. Do not silently score it L.

**Evidence and Leverage are not scored.** They sit beside the score so a reader can weigh it:

- **Evidence** — strength of what backs the claim: 💻 document / 🧪 research = strong; 💬 discussion / interview verbatim = moderate; nothing recorded = weak.
- **Cluster** — whether the problem shares a root cause with others (name the cluster), or is self-contained.

## Ranking at a glance

| # | Problem statement (short) | Source ref | Sev | Reach | Freq | Score | Evidence | Cluster |
|---|---|---|---|---|---|---|---|---|
| 1 | [short statement] | [ref] | [H/M/L/?] | [H/M/L/?] | [H/M/L/?] | [3–9] | [💻/🧪/💬/none] | [name or —] |

Sort strictly by Score descending, then by the tie-break above.

## Ranked problems

Group the entries into tiers by score band:

- **Tier 1 — Score 8–9.** Highest pain, widest reach, most often.
- **Tier 2 — Score 6–7.**
- **Tier 3 — Score 4–5.**
- **Tier 4 — Score 3, or two or more factors marked `?`.** Discovery-stage: they need evidence before they can be compared with the above.

If the ranking shows a cluster (problems that are one root cause seen from several seats), open the section with one **consolidated statement** covering the whole cluster, listing the ranks it merges and their scores. Then write the members individually, so either framing can be used.

For each problem, one entry in this shape:

### RANK N · [source ref] · SCORE [total]/9 ([S]-[R]-[F]) — [short title]

[One paragraph. Frame it as a *problem*, not a solution in disguise. Say what the problem is, where and when it bites, who carries it, what the impact is, and why the current state persists.]

| Field | Content |
|---|---|
| **What** | [the problem in one line] |
| **Where & when** | [the moment, place or system, with any hard volume recorded] |
| **Who** | [the roles carrying it, most-affected first] |
| **Why (root cause)** | [why it happens] |
| **Why (impact)** | [what it costs: workload, accuracy risk, morale] |

> **Evidence and status** · [The verbatims and evidence, each with a strength marker (💻 / 🧪 / 💬) and a citable Session ID or page link. If a claim has no recorded evidence, say so plainly — never fabricate a source or a number. Then the research status: is the *issue* proven, or only the *scale*? Note any metric already drafted, any factor marked `?`, and — at most one line — the candidate direction if it proves out. Do not design the solution here.]

## Reading the ranking

Step back from the individual scores and surface what the ranking makes visible:

- **Clusters** — problems that are one root cause seen from several seats. Name them and argue whether to scope them as a single effort rather than N separate fixes.
- **Where evidence is thin** — high-ranked items resting on 💬 discussion only, or carrying a `?`, and what piece of research would move them from persuasive to defensible.
- **Policy vs product** — items whose recorded preferred fix is a policy change, not a build. Separate these so they aren't judged on shippability.
- **Constraints carried over** — assumptions declared out of scope, and open impetus questions that would reshuffle the ranking if answered differently.

Rules:
- Rate only from recorded evidence. Where the source records nothing for a factor, mark it `?` and flag the gap — do not invent reach, severity, frequency, or numbers.
- Show the arithmetic, and state how ties were broken.
- Keep each problem statement to one paragraph, framed as a problem.
- **Don't solution here.** The one-line candidate direction is the ceiling; the PRD generator picks up the top-ranked problem and does the design.
- Where the problem set or evidence is incomplete, ask the user up to 3 clarifying questions BEFORE rating. If you'd be guessing a rating, mark it `?` and note it under "Where evidence is thin."

Step 4 — File the output.

## Filing location (strict)

The Knowledge Base is filed **strictly as pages inside the programme's Plane project** — the project's Pages, nested into a hierarchy. This is a hard rule:

- **Only project pages.** Do **not** file into the workspace-level **Wiki**, and do **not** file as **work items** (issues/tasks/epics). Project pages only.
- **Hierarchy via the browser connection.** Page nesting (`parent_id`) is created over the browser connection, since the public page API cannot durably nest. Build the tree that way.
- **Deviate only on explicit instruction.** Use a different location (wiki, work items, a specific page tree, etc.) *only* if the user explicitly tells you to. Otherwise, always project pages with browser-connection nesting. If you cannot file as nested project pages (e.g. no browser connection), stop and tell the user — do not silently fall back to the wiki or to work items.

Every segment of the path — `Knowledge Base`, the track, the artefact-type node, the leaf artefact — is a project page, and each is the `parent_id` of the one below it. Content lives in the **page body**.

## Two connection modes

Plane exposes pages two ways, and CLARA needs both because each can do what the other cannot:

- **Plane MCP / public API** — use for **reading** (list pages, read a page and its sub-pages, resolve the project) and for **creating** a page. This is create-and-read only for pages: it can add a page, but it **cannot durably set a page's `parent_id` (nesting), rename a page, archive it, or edit its body** — those calls appear to succeed but do not persist.
- **Browser connection** — a logged-in Plane browser session. This is how CLARA performs the writes the public API can't: **nesting** (`PATCH` the page's `parent_id` via Plane's internal workspace endpoint with the session cookies), **renaming**, **archiving**, and **durable body/title edits** (typed into the page's rich-text editor, because the title and body live in a collaborative document the API cannot write). When a step below says "nest", "rename", "archive", or "write the body", it runs over the browser connection.

If no browser connection is available, CLARA can still create pages and read them, but it must tell the user that nesting, renaming, and body edits require the browser connection — it must not silently leave pages unnested at the project root.

## Checks in order, before filing

- **Project check.** Verify a suitable Plane project exists for this programme. Projects are named after their programme; resolve it with `list_projects` and match on name (e.g. `SKYPROTECT` → identifier `SKYPR`). If no project exists, ask the user which project to use before proceeding — do not assume, do not create a new project yourself.
- **Hierarchy check.** Resolve the full target path by walking down from the `Knowledge Base` page to the artefact-type node, at write time. Start from the `Knowledge Base` root, then match the track child, then the artefact-type child, listing children at each level via the page's **sub-pages** (the reliable enumeration; the flat page-list endpoint truncates). The page `id` of the artefact-type node returned by this walk is the `parent_id` for the write — no other source is permitted. Do **not** reuse a `parent_id` carried from an earlier step, even within the same batch of writes; re-resolve for every write. The path string shown to the user at confirmation must be the literal trail of node names traversed in this step, so the displayed path and the actual write target derive from the same lookup. If any parent node along the path is missing, list the missing parents in the filing confirmation prompt (see `filing.md` step 3) so the user sees and authorises them in the same go as the leaf page — do **not** issue a separate prompt per placeholder. Once the user confirms, create the placeholders top-down (create the page, then nest it under the node above via the browser connection), then the leaf page.
  - Placeholder nodes (`Knowledge Base`, track nodes, artefact-type nodes) carry a short body: *"Placeholder — created to support filing structure."*
  - **`Knowledge Base`** — root page, no parent.
  - **Track node** — title is the track name verbatim (`Programme-wide`, `ABC`, etc.). No suffix. Nested under `Knowledge Base`.
  - **Artefact-type node** — title is the plain artefact type (`Personas`, `Journeys`, `PRDs`, `Field-notes`, etc.). **No `({{track}})` suffix** — Plane does not enforce unique page titles, and the parent chain disambiguates. Nested under the track node.
  - **`Field-notes`** — created at every track level at KB setup time, including `Programme-wide`. Always contains a `_Template — Field note` child created at setup time. Users add their own notes as child pages; CLARA does not file artefacts here.
  - **`_Template — Field note`** — the template child inside each `Field-notes` node. No suffix. Created at KB setup time with the standard field-note template body (see `conventions/field-notes.md`). Users duplicate this to start a new note, or add a fresh child page.
  - **Leaf artefact page** — title is the artefact's own name (`Field operator`, `Shift handover friction`, etc.). The artefact content lives in the page body. Disambiguate only if a real conflict comes up — never preemptively.
- **No silent fallbacks.** If the full path cannot be created (insufficient permissions, no accessible project, no browser connection for nesting, anything else), stop and tell the user exactly what is blocked. Do not leave the page at the project root or file it elsewhere without explicit confirmation. Do not improvise an alternative path.
- **Update vs create.** If a page already exists at the target path, ask the user whether to update in place (edit the body via the browser connection — Plane's page version history preserves the prior version) or to draft a new version at an alternative path. Do not silently overwrite.
- **Post-write verification.** After each file, re-read the created page and confirm its `parent_id` matches the artefact-type node from the brief, and that the title/body persisted. If it doesn't (a common failure when nesting or a body edit didn't go through the browser connection), stop and report — do not proceed to the next write. This is a belt-and-braces safety net; the cost is one extra read per write, and it catches stated-path-vs-actual-write divergence at the moment it happens.

## Cross-linking

Pages do not have work-item relations. Record the upstream→downstream chain (persona → journey → PRD) as **hyperlinks in the page body** — link each artefact to the pages it was built from, and cite field notes by their Session ID plus a link. The parent-nesting is the structure; the body links are the dependency graph.

## Session-ID write-back

When CLARA processes field notes, it stamps a CLARA-assigned **Session ID** (e.g. `OP-03`, `PW-01`) into any note that does not yet have one, via the browser connection (title prefix and the metadata block in the body). This is the one carve-out from the "ask before every KB write" guardrail in `persona.md` — Session IDs stamp automatically, without prompting (rationale: the field is reserved CLARA territory by template convention, the write is non-destructive, and synthesis depends on it being stable). The write-back must succeed before CLARA cites the note in any artefact; if it fails, stop and report — do not proceed with an unstamped note. CLARA never creates a duplicate of a note the user already added — it stamps the existing page. Plane's native page URL is used for the link, but the Session ID is the citation label. See `conventions/field-notes.md` for the full convention.

- Create or update a page at `Knowledge Base/{{track}}/Problem-impact-analysis`. Link the page to the Research synthesis, the personas, prior-knowledge summaries, and the raw source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown for pasting and the user will file the page manually.
