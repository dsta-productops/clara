---
title: "Problem-impact ranker"
phase: "research"
domain: "shared"
tool: "clara"
task: "consolidate the captured problems for a programme into a single ranked Problem-impact analysis — each problem scored on reach, severity, evidence and leverage, grouped into leverage tiers, so the team knows which problem to build for first"
expectedOutput: "A single markdown page: a scoring rubric, a ranked at-a-glance table (each problem scored /20), tiered problem entries (whose pain, grounded-in evidence, value, research maturity), and a 'reading the ranking' analysis. Clarifying questions where the evidence is thin."
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
      description: "The Friction-points table, Themes, and Problem-statement sections of `Knowledge Base/{{track}}/Research-synthesis`. Falls back to `Knowledge Base/Programme-wide/Research-synthesis` when no track-level version exists. The friction table is the seed for the ranked register — its Severity/Frequency/Evidence columns feed the score directly."
    - what: "Persona(s) for the affected roles"
      description: "Pages under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Used to score Reach — which roles are hit and how often (the 'whose pain' line)."
    - what: "Prior-knowledge summaries (optional)"
      description: "Search `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*`. Tells you what's already been proven or is in flight — this informs the Evidence and Value scoring and stops you re-discovering known problems."
    - what: "Raw field notes / captured problem sources"
      description: "Field notes, workshop/board exports, or a pasted list of pain points. The source of the verbatims and evidence markers each problem entry must cite. Never invent evidence."
    - what: "Journeys and service blueprints (optional)"
      description: "Pages under `Knowledge Base/{{track}}/Journeys/*` and `.../Service-blueprints/*`. Used to score Leverage — which problems share a single root cause seen from several seats."
    - what: "Heuristic evaluation of an existing/competitor product (optional)"
      description: "Pages under `Knowledge Base/{{track}}/Heuristic-evaluations/*` or `Knowledge Base/Programme-wide/Heuristic-evaluations/*`. Each severity-rated finding is a candidate problem already scored for severity and grounded to a screen — fold them into the register (cite the finding ID as evidence), and let their severity inform the Severity and Evidence scores."
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

- Read the **Friction-points table, Themes, and Problem-statement** sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide). The friction table is the seed: each friction row becomes a candidate problem, and its Severity / Frequency / Evidence columns feed the score directly.
- Look up the **persona(s)** at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide) to score Reach — which roles each problem hits, and how often.
- Search `Knowledge Base/{{track}}/Prior-knowledge/*` and programme-wide for **prior-knowledge summaries** — what's already proven or already in flight. This grounds the Evidence and Value scores.
- Gather the **raw sources** the problems came from — field notes, workshop/board exports, or a pasted list — for the verbatims and evidence each entry must cite.
- Search `Knowledge Base/{{track}}/Heuristic-evaluations/*` and programme-wide for a **heuristic evaluation** of an existing or competitor product. Each finding is a candidate problem already scored for severity and tied to a screen — fold them into the register and cite the finding ID as evidence.
@@if confluence@@
- Optionally read **journeys and service blueprints** in the space to judge Leverage — which problems are one root cause seen from several seats.
- Show the user everything you found — the friction table, personas, prior-knowledge, and raw sources — and ask them to confirm or refine the problem set before you score it.
@@endif@@
@@if plane@@
- Optionally read **journeys and service blueprints** in the project to judge Leverage — which problems are one root cause seen from several seats.
- Show the user everything you found — the friction table, personas, prior-knowledge, and raw sources — and ask them to confirm or refine the problem set before you score it.
@@endif@@
- In copy-paste mode: ask the user to paste the captured problems (or the board/workshop export), plus any verbatims and evidence they have. Ask for each missing input in turn.

# draft

Produce a single page. Score every problem, rank them, tier them, then read the ranking back. Output as markdown:

# Problem-impact analysis

**Scope:** [the problem set being ranked]
**Sources:** [links to the Research synthesis, personas, prior-knowledge, and raw sources — referenced throughout]

## How impact was scored

Each problem is rated **1–5 on four dimensions**, giving a total out of 20. Nothing is invented — where the source records no evidence, the item scores low on Evidence and is flagged discovery-stage rather than dropped.

- **Reach** — how many roles are affected and how often (name the roles).
- **Severity** — the effort cost, accuracy/safety risk, or morale consequence recorded in the evidence.
- **Evidence** — strength of what backs the claim: 💻 document / 🧪 research = strong (4–5); 💬 discussion / interview verbatim = moderate (2–3); nothing recorded = weak (1).
- **Leverage** — whether fixing it removes a root cause other problems depend on (high) versus a self-contained fix (low).

## Ranking at a glance

| # | Problem statement (short) | Source ref | Reach | Sev | Evid | Lev | Total |
|---|---|---|---|---|---|---|---|
| 1 | [short statement] | [ref] | [1–5] | [1–5] | [1–5] | [1–5] | [/20] |

Sort strictly by Total descending. Break ties by Leverage (a shared root cause outranks a self-contained fix at the same score).

## Ranked problems

Group the entries into leverage tiers, highest-leverage first. Use the tier headings that fit the set — typically:

- **Tier 1 — Systemic root causes** — fix these and several items below shrink on their own.
- **Tier 2 — High-volume process friction** — narrower blast radius, but the strongest hard numbers and clearest fixes.
- **Tier 3 — Validated but narrower** — real pain, contained to one role or one moment.
- **Tier 4 — Discovery-stage or engagement-led** — need evidence before they can be prioritised against the above.

For each problem, one entry in this shape:

### RANK N · [source ref] · IMPACT [total]/20 — [short title]

[One paragraph. Frame it as a *problem*, not a solution in disguise. Name who has the problem, what the impact is, and why the current state persists — the same discipline as the Research synthesis problem statement.]

- **Whose pain** — the roles carrying it (workload, accuracy risk, or morale), most-affected first.
- **Grounded in** — the verbatims and evidence, each with a strength marker (💻 / 🧪 / 💬) and a citable Session ID or page link. If a claim has no recorded evidence, say so plainly and score Evidence low — never fabricate a source or a number.
- **Value** — what fixing it yields (whose jobscope shrinks, what accuracy/experience improves).
- **Research status** — is the *issue* proven, or only the *scale*? Note the maturity (prove-issue vs prove-value/scale), any metric already drafted, and — at most one line — the candidate direction if it proves out. Do not design the solution here.

## Reading the ranking

Step back from the individual scores and surface what the ranking makes visible:

- **Clusters** — problems that are one root cause seen from several seats. Name them and argue whether to scope them as a single effort rather than N separate fixes.
- **Where evidence is thin** — high-ranked items resting on 💬 discussion only, and what piece of research would move them from persuasive to defensible.
- **Policy vs product** — items whose recorded preferred fix is a policy change, not a build. Separate these so they aren't judged on shippability.
- **Constraints carried over** — assumptions declared out of scope, and open impetus questions that would reshuffle the ranking if answered differently.

Rules:
- Score only from recorded evidence. Where the source records nothing for a dimension, score it low and flag the gap — do not invent reach, severity, or numbers.
- Keep each problem statement to one paragraph, framed as a problem.
- **Don't solution here.** "Value" and an optional one-line candidate direction are the ceiling; the PRD generator picks up the top-ranked problem and does the design.
- Where the problem set or evidence is incomplete, ask the user up to 3 clarifying questions BEFORE scoring. If you'd be guessing a score, mark it provisional and note it under "Where evidence is thin."

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
- Reach × Severity says how much a problem *hurts*; **Leverage says whether fixing one thing fixes many**. A high-leverage root cause should usually be scoped as a single product, not N point fixes — that judgement is the whole point of the "Clusters" note.
- **Evidence scoring keeps you honest.** A persuasive problem backed only by 💬 discussion should rank below a duller one with 💻/🧪 behind it — and the gap is exactly what tells research what to go prove next.
- This page is the hand-off between synthesis and build: the Research synthesis says *what is wrong*, this artefact says *which wrong thing to fix first*, and the [PRD generator](/prompts/prd-generator) builds for the top-ranked (or user-chosen) problem. Keep the problem statements clean enough that the PRD can lift one straight out.
