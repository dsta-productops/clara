---
title: "PRD generator"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a v0 PRD from the problem-impact ranking, research synthesis, and prior framing"
expectedOutput: "Markdown PRD with 8 standard sections — including a Scope table that rolls ranked problems up into product modules (module / rolls-up-ranks / core job) and a prioritised user-story table (id·rank / as-a / i-want / so-that / evidence). Clarifying questions where input is incomplete."
inputsFrom:
  - problem-impact-ranker
  - research-synthesiser
  - persona-generator
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "The problem to build for"
      description: "The top-ranked (or user-chosen) problem from `Knowledge Base/{{track}}/Problem-impact-analysis`. Falls back to programme-wide. If a ranking exists, the PRD is drafted for one problem lifted from it; if the user names a different rank, use that. When no ranking exists, fall back to the Research-synthesis problem statement directly."
    - what: "Problem statement and Success criteria"
      description: "Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis`. Falls back to `Knowledge Base/Programme-wide/Research-synthesis` when no track-level version exists."
    - what: "Persona for the PRD"
@@if confluence@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Ask the user which persona if multiple."
@@endif@@
@@if plane@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Ask the user which persona if multiple."
@@endif@@
    - what: "Themes from the Research synthesis (optional)"
      description: "Themes section of `Knowledge Base/{{track}}/Research-synthesis` or `Knowledge Base/Programme-wide/Research-synthesis`."
    - what: "Original stakeholder ask"
@@if confluence@@
      description: "Programme brief / charter / requesting note. Pages with 'brief', 'ask', 'charter' in titles."
@@endif@@
@@if plane@@
      description: "Programme brief / charter / requesting note. Pages with 'brief', 'ask', 'charter' in titles."
@@endif@@
  outputPathTemplate: "Knowledge Base/{{track}}/PRDs/{{prd-title}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to draft a first-pass PRD from research synthesis and stakeholder context.

# context

- **PRD title** — short (e.g. "Incident-report capture v1"). Becomes `{{prd-title}}`.

# inputs

- Read `Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide). If a ranking exists, draft the PRD for the **top-ranked problem** unless the user names a different rank — confirm which problem before drafting. If no ranking exists, work from the Research-synthesis problem statement directly.
- Read the Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide when no track-level version exists).
- Look up the persona at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide). Ask the user which persona if multiple.
- Optionally read the Themes section of `Knowledge Base/{{track}}/Research-synthesis` (or programme-wide).
@@if confluence@@
- Find the original stakeholder ask — programme brief / charter / requesting note. Pages with `brief`, `ask`, `charter` in titles.
@@endif@@
@@if plane@@
- Find the original stakeholder ask — programme brief / charter / requesting note. Pages with `brief`, `ask`, `charter` in titles.
@@endif@@
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask the user for each of these inputs in turn.

# draft

Produce a PRD using this structure, one `##` heading per section:

1. **Problem statement** (1 paragraph) — framed as a problem, not a solution in disguise; names who has the problem.
2. **Target users / operators** — link to the specific persona page(s); no implicit "the user".
3. **Goals and non-goals** — what this release is trying to achieve, and what it is explicitly *not* doing (contested or out-of-evidence items go under non-goals, with the reason).
4. **Scope — modules** — roll the ranked problems up into product modules. Present as a table, one row per module, highest-impact modules first:

   | Module | Rolls up ranks | Core job |
   |---|---|---|
   | [module name] | [rank #s from the Problem-impact analysis, e.g. 1, 2, 3] | [one line — what this module does] |

   - Cluster the ranks using the Problem-impact analysis's own "Reading the ranking" clusters where present (problems that are one root cause seen from several seats belong in one module). A single high-impact root cause can be its own module; low-leverage or discovery-stage ranks either fold into a related module or drop to Out of scope.
   - Follow the table with a short **Out of scope** list — each excluded item names the rank and the reason (policy-not-product, back-stage-gated, discovery-stage, explicitly out per stakeholder). "Out of scope" usually shortens later debates.
5. **Prioritised user stories** — present as a table, ordered by priority (the top-ranked problems first). One row per story:

   | ID · rank | As a… | I want… | So that… | Evidence it grounds to |
   |---|---|---|---|---|
   | #1 · R[rank] | [persona / role] | [capability, phrased as an outcome not a feature] | [the benefit] | [verbatim quote or observation + source ref + impact score; flag `[contested]` / `[research gap]` / `[assumption]` here rather than inventing] |

   - The `ID · rank` cell ties each story back to the rank(s) it serves in the Problem-impact analysis (e.g. `#1 · R1/R3`), so priority is traceable to impact, not asserted.
   - Every row's Evidence cell must cite real grounding — a session verbatim, an observation, or a document — with its source ref. If a story has no recorded evidence, say so and flag it; do not invent a quote.
   - For build-ready PRDs, the top stories can each be expanded with Given/When/Then acceptance scenarios and an independent test below the table; keep these to the stories that are actually going into a build cycle.
6. **Success criteria** (measurable, capability-focused) — what the capability has to be able to do, and to what threshold. No "users will feel more confident" non-criteria.
7. **Constraints and dependencies** — every external thing the work depends on; re-read with "what would block this?" in mind.
8. **Open questions** — honest unknowns; the first draft is meant to be wrong in interesting ways.

Rules:
- Where input is incomplete, ask the user up to 3 clarifying questions BEFORE drafting. Don't invent details.
- Keep prose sections to 1-2 paragraphs; user stories are as many as the evidence supports, ordered by priority.
- If you'd be guessing, put a placeholder and flag it under "Open questions."

Output as markdown.

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Link to the problem statement, success criteria, and persona pages.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new page at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Link the page to the problem statement, success criteria, and persona pages.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- CLARA asks clarifying questions when inputs are thin. Answer honestly even if it's "I don't know yet" — the Open questions section preserves the unknown.
- Treat CLARA's v0 PRD as a starting position, not a final document. Manual editing after generation is the norm, not the exception.

## Before you circulate — self-review checklist

Before sharing the PRD with stakeholders, walk through these checks. Most teams will edit the draft directly to fix gaps; a few questions surface things the draft can't fix on its own.

- **Problem statement** is one paragraph, framed as a problem (not a solution in disguise). Has a clear "who has the problem."
- **Success criteria** are measurable and capability-focused — what the capability or product has to be able to do, and to what threshold. No "users will feel more confident" non-criteria.
- **Scope table** rolls every relevant rank up into a module (or explicitly drops it to Out of scope). No ranked problem is silently unaccounted for; "Out of scope" names the rank and the reason.
- **User-story table** is ordered by priority, every row's `ID · rank` ties back to the ranking, and every Evidence cell cites a real verbatim/observation with its source ref. Stories describe outcomes, not features.
- **Constraints and dependencies** name every external thing the work depends on. Re-read with "what would block this?" in mind.
- **Open questions** are honest. The first draft is supposed to be wrong in interesting ways; the open questions are where you flag what you don't know.
- **Persona references** link to specific persona pages — no implicit "the user".
