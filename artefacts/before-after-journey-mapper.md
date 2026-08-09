---
title: "Before/after journey mapper"
phase: "design"
domain: "shared"
tool: "clara"
task: "map a phase-by-phase before/after user journey — today's current-state steps beside the future-state with the product — each phase tagged with the ranked problems it addresses, so stakeholders can see what the PRD changes"
expectedOutput: "A markdown page: one section per journey phase, each tagged with the ranks/impact it addresses, a BEFORE (today) step list beside an AFTER (with the product) step list expressed in the PRD's modules, and a coverage note flagging any high-ranked problem no phase addresses."
inputsFrom:
  - journey-map-drafter
  - problem-impact-ranker
  - prd-generator
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Current-state journey (the BEFORE)"
      description: "The as-is journey at `Knowledge Base/{{track}}/Journeys/*`. Its stages and steps are the BEFORE column — never invent current-state steps."
    - what: "The PRD whose solution defines the AFTER"
      description: "A PRD under `Knowledge Base/{{track}}/PRDs/*`. Its Scope-module table is the vocabulary for the AFTER column — every future-state step must trace to a module the PRD actually scopes."
    - what: "Problem-impact analysis (for the phase tags)"
      description: "`Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide). Supplies the 'Addresses Ranks N · Impact M' tag on each phase, and the coverage check that every high-ranked problem has an AFTER."
    - what: "Persona (optional)"
      description: "The persona whose journey this is, at `Knowledge Base/{{track}}/Personas/*`. Keeps the steps grounded in one operator's reality."
  outputPathTemplate: "Knowledge Base/{{track}}/Before-after-journeys/{{journey-scope}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to turn a PRD's proposed solution into a **before/after user journey** — the current-state steps laid beside the future-state, phase by phase, with each phase tagged by the ranked problems it addresses. It is a Design-phase communication device: it makes an abstract PRD legible to operators and commanders, and it doubles as a coverage check — every high-ranked problem should show up as an "after" somewhere, and every "after" should trace to a scoped module.

This artefact **visualises decisions already made upstream**; it does not make new ones. The BEFORE comes from the current-state journey, the AFTER from the PRD's modules, and the tags from the ranking. If the two columns don't line up cleanly, the fix belongs upstream (journey, ranking, or PRD), not here.

# context

- **Journey scope** — the journey being compared (e.g. "ICT cycle", "Handling a contradiction-class alert"). Becomes `{{journey-scope}}`.
- **PRD to compare against** — which PRD's solution defines the AFTER column. Its Scope-module table is the AFTER vocabulary.

# inputs

- Read the current-state journey at `Knowledge Base/{{track}}/Journeys/*` — its phases/stages and steps are the BEFORE column.
- Read the PRD at `Knowledge Base/{{track}}/PRDs/*` — its Scope-module table names the modules the AFTER column is written in. Do not introduce any capability the PRD does not scope.
- Read `Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide) — for the per-phase "Addresses Ranks · Impact" tags and the final coverage check.
- Optionally read the persona at `Knowledge Base/{{track}}/Personas/*` to keep steps grounded in one operator's reality.
- Show the user the journey, the PRD modules, and the ranking you found, and ask them to confirm the phase set and the pairing before you draft.
- In copy-paste mode: ask the user to paste the current-state journey and the PRD scope; ask for each in turn.

# draft

Produce a single page. One section per journey phase, in journey order. Output as markdown:

# [Journey scope] — Before / After user journey

Phase-by-phase comparison across [scope], grounded in the ranked problems each phase replaces. The AFTER column reflects the solution scoped in [PRD link] — no capability beyond it.
**Sources:** [current-state journey, PRD, Problem-impact analysis links]

## Phase N — [phase name] ([time window, if the journey has one])

**Addresses Ranks [x, y] · Impact [scores]** — via [the PRD module(s) that act in this phase]

**BEFORE — today**

1. [current-state step, taken from the journey]
2. …

**AFTER — with [product / module]**

1. [future-state step, expressed in the PRD's module vocabulary]
2. …

*(Repeat per phase.)*

## Coverage & caveats

- **Rank coverage** — confirm every problem in the Problem-impact analysis, especially the high-ranked ones, appears as an AFTER in some phase. Name any rank that has no "after" — that's either a PRD scope gap or a missing journey phase, and it belongs in the PRD's Open questions, not papered over here.
- **Illustrative, not measured** — note that step counts show the *mechanism* change (fewer manual handoffs, fewer full-rebuild triggers), not measured time savings. Point to the PRD's success metrics / the ranking's drafted measures as what would validate the actual reduction.

Rules:
- BEFORE steps come only from the current-state journey and its evidence. Never invent a current-state step to make the delta look bigger.
- AFTER steps come only from what the PRD scopes. If a phase's improvement isn't covered by any module, say so under Coverage — do not invent an AFTER.
- Tag every phase with the rank(s) and impact from the Problem-impact analysis. If a phase maps to no ranked problem, question whether it belongs in the comparison.
- Keep the two step lists parallel and short — the value is the delta, not prose.
- Never claim a quantified time saving the PRD or ranking doesn't already carry.

# filing

@@if confluence@@
- Create or update a page at `Knowledge Base/{{track}}/Before-after-journeys/{{journey-scope}}`. Link back to the current-state journey, the PRD, and the Problem-impact analysis. Confirm and show the link.
- In copy-paste mode: return the full markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create or update a page at `Knowledge Base/{{track}}/Before-after-journeys/{{journey-scope}}`. Link the page to the current-state journey, the PRD, and the Problem-impact analysis. Confirm and show the link.
- In copy-paste mode: return the full markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- This artefact earns its keep two ways: as a **stakeholder-facing** picture of what changes, and as a **coverage check**. If a high-ranked problem has no "after", you've found a gap in the PRD, not a gap in this page.
- Keep the sourcing strict — **BEFORE from the journey, AFTER from the PRD**. The moment you write an AFTER step the PRD doesn't scope, you've started designing outside the PRD, which is the PRD generator's job.
- Step counts are a *mechanism* signal (handoffs removed, rebuilds avoided), not a time measurement. Cite the PRD's success metrics for the real reduction, and say so explicitly so no one reads the step delta as a benchmark.
- This is the most downstream artefact in the chain (journey → ranking → PRD → here). If the before/after won't line up, resist fixing it here — correct the upstream artefact and regenerate.
