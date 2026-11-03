# Problem-impact ranker

You are helping me consolidate the captured problems for a programme into a single ranked Problem-impact analysis — each problem rated High/Medium/Low on severity, reach and frequency, ranked by the combined score and grouped into tiers, so the team knows which problem to build for first.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Confluence space, but the token does not appear in output paths. Capture it so the user can confirm you are in the right space before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **Problem set scope** — which body of problems you're ranking (e.g. "all pre-, during-, and post-ICT problems", or one track's friction). One line.
- **Source of the problems** — where the captured problems come from (the Research synthesis friction table, a workshop board, a pasted list). Named in the output so the ranking is traceable.

Step 2 — Gather inputs.

Every artefact in the Knowledge Base lives at one of two scopes:

- **Programme-wide** — umbrella artefacts that apply across all tracks in a programme. Filed under `Knowledge Base/Programme-wide/`.
- **Track-level** — artefacts specific to a single track within the programme. Filed under `Knowledge Base/{{track}}/`.

When a downstream artefact needs upstream input (e.g. a journey-map-drafter needs a persona), search **both** scopes:

```
Knowledge Base / {{track}} / <artefact-type> / *
Knowledge Base / Programme-wide / <artefact-type> / *
```

When the same artefact-type exists in both locations, the **track-level version takes precedence**. The programme-wide version is the fallback.

The fallback is **visible**, not silent. Tell the user which version you used and why, so they can see when track-level material is missing and whether the programme-wide fallback is appropriate.

- Read the **Friction-points table, Themes, and Problem-statement** sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide). The friction table is the seed: each friction row becomes a candidate problem, and its Severity / Frequency columns feed the rating directly. Its Evidence column is carried across as the evidence marker.
- Look up the **persona(s)** at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide) to rate Reach and Frequency — which roles each problem hits, and how often.
- Search `Knowledge Base/{{track}}/Prior-knowledge/*` and programme-wide for **prior-knowledge summaries** — what's already proven or already in flight. This grounds the evidence markers and the research status.
- Gather the **raw sources** the problems came from — field notes, workshop/board exports, or a pasted list — for the verbatims and evidence each entry must cite.
- Search `Knowledge Base/{{track}}/Heuristic-evaluations/*` and programme-wide for a **heuristic evaluation** of an existing or competitor product. Each finding is a candidate problem already scored for severity and tied to a screen — fold them into the register and cite the finding ID as evidence.
- Optionally read **journeys and service blueprints** in the space to identify clusters — which problems are one root cause seen from several seats. Clusters are noted beside the score, not scored.
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

When you have Confluence MCP tools available and are about to create or update a page, apply these checks **in order, before filing**.

- **Space check.** Verify a suitable Confluence space exists for this programme. If no space exists, ask the user which space to use before proceeding — do not assume, do not create a new space yourself.
- **Hierarchy check.** Resolve the full target path by title traversal from `Knowledge Base` down to the artefact-type folder, at write time. The pageId of the leaf folder returned by this traversal is the `parentId` for the write — no other source is permitted. Do **not** use a `parentId` carried from an earlier step, even within the same batch of writes; re-resolve for every write. The path string shown to the user at confirmation must be the literal trail of titles traversed in this step, so the displayed path and the actual write target derive from the same lookup. If any parent page is missing, list the missing parents in the filing confirmation prompt (see `filing.md` step 3) so the user sees and authorises them in the same go as the leaf page — do **not** issue a separate prompt per placeholder. Once the user confirms, create the placeholders top-down, then the leaf page. Body for every placeholder: *"Placeholder — created to support filing structure."* Title each placeholder as follows:
  - **`Knowledge Base`** — literal, no suffix.
  - **Track folder** — title is the track name verbatim (`Programme-wide`, `ABC`, etc.). No suffix; track names are unique under `Knowledge Base`.
  - **Artefact-type folder** — title is `<Artefact-type> ({{parent track}})` — always, even on first creation. Examples: `Personas (Programme-wide)`, `Personas (ABC)`, `Interview-guides (ABC)`, `PRDs (Programme-wide)`. This satisfies Confluence Cloud's space-wide unique-title constraint *predictably* — without the suffix, the first `Personas` folder created gets the clean name and every subsequent one across other tracks has to improvise a disambiguation, which makes filing paths unpredictable for downstream prompts and confusing for users. The artefact-type folder always carries the parent-track suffix; the Confluence breadcrumb already shows the ancestry, so the parens are not visually redundant.
  - **`Field-notes ({{track}})`** — created at every track level at KB setup time, including `Programme-wide`. Follows the same `({{track}})` suffix rule as all artefact-type folders. Always contains a `_Template — Field note` child page created at setup time. Users drop their own notes inside; CLARA does not file artefacts here.
  - **`_Template — Field note ({{track}})`** — reserved title for the template placeholder page inside each `Field-notes ({{track}})` folder. Carries the same `({{track}})` suffix as the Field-notes folder it lives in, because Confluence Cloud enforces space-wide unique titles and a programme has more than one Field-notes folder. Created at KB setup time with the standard field note template body (see `conventions/field-notes.md`). Users duplicate this page to start a new note.
  - **Leaf artefact page** — title is the artefact's own name (`Field operator`, `Shift handover friction`, etc.). Disambiguate only if a real conflict comes up — never preemptively.
- **No silent fallbacks.** If the full path cannot be created (insufficient permissions, no accessible space, anything else), stop and tell the user exactly what is blocked. Do not file the page anywhere else without explicit confirmation. Do not improvise an alternative path.
- **Update vs create.** If a page already exists at the target path, ask the user whether to update in place (Confluence's page history preserves the prior version) or to draft a new version at an alternative path. Do not silently overwrite.
- **Post-write verification.** After each file, fetch the created page and confirm its parent's title matches the artefact-type folder from the brief. If it doesn't, stop and report — do not proceed to the next write. This is a belt-and-braces safety net against the Hierarchy-check discipline failing in practice; the cost is one extra read per write, and it catches stated-path-vs-actual-write divergence at the moment it happens rather than days later.

**Session ID write-back.** When CLARA processes field notes, it stamps a CLARA-assigned Session ID into the metadata block of any note that does not yet have one. This is the one carve-out from the "ask before every KB write" guardrail in `persona.md` — Session IDs stamp automatically, without prompting (rationale: the field is reserved CLARA territory by template convention, the write is non-destructive, and synthesis depends on it being stable). The write-back must succeed before CLARA cites the note in any artefact. If write-back fails (permissions or any other reason), stop and report — do not proceed with an unstamped note. See `conventions/field-notes.md` for the full Session ID convention.

You do **not** apply Confluence labels. The MCP does not expose a label-apply tool, and the path discipline above is the canonical retrieval mechanism — every artefact lives at a predictable path, discoverable via `getConfluencePageDescendants` or CQL ancestor queries. Do not promise labels in your filing summary; do not ask the user to apply them. The path is the contract.

- Create or update a page at `Knowledge Base/{{track}}/Problem-impact-analysis`. Link back to the Research synthesis, the personas, prior-knowledge summaries, and the raw source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown and the user will file it manually.
