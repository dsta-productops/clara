---
title: "Problem-impact ranker"
phase: "research"
domain: "shared"
tool: "clara"
task: "consolidate the captured problems for a programme into a single ranked Problem-impact analysis — each problem rated High/Medium/Low on severity, reach and frequency, ranked by the combined score and grouped into tiers, so the team knows which problem to build for first"
expectedOutput: "A single markdown page: a scoring rubric, a ranked at-a-glance table (each problem rated H/M/L on severity, reach and frequency, scored out of 9, with its evidence strength and cluster alongside), tiered problem entries (a problem paragraph, What / Where & when / Who / Why tables, evidence and status), and a 'reading the ranking' analysis. Clarifying questions where the evidence is thin."
inputsFrom:
  - research-synthesiser
  - persona-generator
  - prior-knowledge-summariser
  - heuristic-evaluator
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Friction points, themes and problem statement from the Research synthesis"
      description: "The Friction-points table, Themes, and Problem-statement sections of `Knowledge Base/{{track}}/Research-synthesis`. Falls back to `Knowledge Base/Programme-wide/Research-synthesis` when no track-level version exists. The friction table is the seed for the ranked register — its Severity/Frequency columns feed the rating directly, and its Evidence column is carried across as the evidence marker."
    - what: "Persona(s) for the affected roles"
      description: "Pages under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Used to rate Reach and Frequency — which roles are hit and how often (the 'Who' line)."
    - what: "Prior-knowledge summaries (optional)"
      description: "Search `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*`. Tells you what's already been proven or is in flight — this informs the evidence markers and the research status and stops you re-discovering known problems."
    - what: "Raw field notes / captured problem sources"
      description: "Field notes, workshop/board exports, or a pasted list of pain points. The source of the verbatims and evidence markers each problem entry must cite. Never invent evidence."
    - what: "Journeys and service blueprints (optional)"
      description: "Pages under `Knowledge Base/{{track}}/Journeys/*` and `.../Service-blueprints/*`. Used to identify clusters — which problems share a single root cause seen from several seats."
    - what: "Heuristic evaluation of an existing/competitor product (optional)"
      description: "Pages under `Knowledge Base/{{track}}/Heuristic-evaluations/*` or `Knowledge Base/Programme-wide/Heuristic-evaluations/*`. Each severity-rated finding is a candidate problem already scored for severity and grounded to a screen — fold them into the register (cite the finding ID as evidence), and let their severity inform the Severity rating and the evidence marker."
  outputPathTemplate: "Knowledge Base/{{track}}/Problem-impact-analysis"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to consolidate the problems captured for a programme into a single **Problem-impact analysis** — a ranked, tiered register that turns a pile of pain points into an ordered action queue. It sits between the Research synthesis (which says *what is wrong*) and the PRD generator (which builds for *one* problem): this artefact decides *which wrong thing to fix first*.

# context

- **Problem set scope** — which body of problems you're ranking (e.g. "all pre-, during-, and post-ICT problems", or one track's friction). One line.
- **Source of the problems** — where the captured problems come from (the Research synthesis friction table, a workshop board, a pasted list). Named in the output so the ranking is traceable.

# inputs

- Read the **Friction-points table, Themes, and Problem-statement** sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide). The friction table is the seed: each friction row becomes a candidate problem, and its Severity / Frequency columns feed the rating directly. Its Evidence column is carried across as the evidence marker.
- Look up the **persona(s)** at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide) to rate Reach and Frequency — which roles each problem hits, and how often.
- Search `Knowledge Base/{{track}}/Prior-knowledge/*` and programme-wide for **prior-knowledge summaries** — what's already proven or already in flight. This grounds the evidence markers and the research status.
- Gather the **raw sources** the problems came from — field notes, workshop/board exports, or a pasted list — for the verbatims and evidence each entry must cite.
- Search `Knowledge Base/{{track}}/Heuristic-evaluations/*` and programme-wide for a **heuristic evaluation** of an existing or competitor product. Each finding is a candidate problem already scored for severity and tied to a screen — fold them into the register and cite the finding ID as evidence.
@@if confluence@@
- Optionally read **journeys and service blueprints** in the space to identify clusters — which problems are one root cause seen from several seats. Clusters are noted beside the score, not scored.
- Show the user everything you found — the friction table, personas, prior-knowledge, and raw sources — and ask them to confirm or refine the problem set before you score it.
@@endif@@
@@if plane@@
- Optionally read **journeys and service blueprints** in the project to identify clusters — which problems are one root cause seen from several seats. Clusters are noted beside the score, not scored.
- Show the user everything you found — the friction table, personas, prior-knowledge, and raw sources — and ask them to confirm or refine the problem set before you score it.
@@endif@@
- In copy-paste mode: ask the user to paste the captured problems (or the board/workshop export), plus any verbatims and evidence they have. Ask for each missing input in turn.

# draft

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

# filing

@@if confluence@@
- Create or update a page at `Knowledge Base/{{track}}/Problem-impact-analysis`. Link back to the Research synthesis, the personas, prior-knowledge summaries, and the raw source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create or update a page at `Knowledge Base/{{track}}/Problem-impact-analysis`. Link the page to the Research synthesis, the personas, prior-knowledge summaries, and the raw source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- The ranking is an **action queue, not a complaint list**. Its value is the sort order and the tiers — an unranked pile of problems tells the team nothing about where to start.
- **Severity, Reach and Frequency are each High, Medium or Low** (3, 2, 1), and the score is their sum out of 9. H-H-H ranks first. Ties are broken by Severity, then Reach, then Frequency.
- **Evidence and clusters are shown, not scored.** A persuasive problem backed only by 💬 discussion keeps its rank but is flagged `[provisional]` — the gap is exactly what tells research what to go prove next. A cluster of problems sharing one root cause should usually be scoped as a single product, not N point fixes — that judgement is the whole point of the "Clusters" note.
- **A missing rating is a `?`, not an L.** It sorts as Medium and is flagged, so unmeasured problems aren't quietly pushed down.
- This page is the hand-off between synthesis and build: the Research synthesis says *what is wrong*, this artefact says *which wrong thing to fix first*, and the [PRD generator](/prompts/prd-generator) builds for the top-ranked (or user-chosen) problem. Keep the problem statements clean enough that the PRD can lift one straight out.
