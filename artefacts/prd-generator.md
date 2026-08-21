---
title: "PRD generator"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a v0 PRD from the problem-impact ranking, research synthesis, and prior framing"
expectedOutput: "Markdown PRD with 8 standard sections — including a Scope table that rolls ranked problems up into product modules (module / rolls-up-ranks / core job) and prioritised user stories in two layers: a summary table (id·rank·priority / as-a / i-want / so-that / evidence) plus an expanded block for every story (Why this priority / Independent Test / robust Gherkin acceptance scenarios covering happy path, invalid input, duplicate/conflict, boundary limits and their transitions, state/permission, and accessibility/non-functional), with thin-evidence stories flagged rather than dropped. Clarifying questions where input is incomplete."
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
5. **Prioritised user stories** — present in two layers: a summary table for at-a-glance priority, then an expanded block for **every** story in the table.

   **5a. Summary table** — ordered by priority (the top-ranked problems first), one row per story:

   | ID · rank · priority | As a… | I want… | So that… | Evidence it grounds to |
   |---|---|---|---|---|
   | #1 · R[rank] · P1 | [persona / role] | [capability, phrased as an outcome not a feature] | [the benefit] | [verbatim quote or observation + source ref + impact score; flag `[contested]` / `[research gap]` / `[assumption]` here rather than inventing] |

   - The `ID · rank · priority` cell ties each story back to the rank(s) it serves in the Problem-impact analysis (e.g. `#1 · R1/R3 · P1`), so priority is traceable to impact, not asserted. Priority (`P1`, `P2`, …) is the build order — usually tracking the impact rank, but a story may be re-prioritised if it is a prerequisite for, or superseded by, another (say why in the expanded block).
   - Every row's Evidence cell must cite real grounding — a session verbatim, an observation, or a document — with its source ref. If a story has no recorded evidence, say so and flag it; do not invent a quote.

   **5b. Expanded stories** — follow the table with a detailed block for **every** story in it, in priority order. No story is table-only: each row above gets a matching block below, so the PRD is a complete build spec rather than a v0 with follow-ups deferred.

   > **User Story [n] — [short name] (Priority: P[n])**
   >
   > As a [persona / role], I want [capability, phrased as an outcome] so that [the benefit].
   >
   > **Why this priority:** [what makes this P[n] — what it depends on, what it unlocks, or what it supersedes. Ties back to the impact rank and to the other stories' priorities.]
   >
   > **Independent Test:** [how this story can be verified on its own — the observable behaviour a tester would set up and check, without depending on other unbuilt stories.]
   >
   > **Acceptance Scenarios:**
   >
   > 1. **Given** [the happy-path starting state], **When** [the primary action], **Then** [the specific observable success — a named screen, message, value, or state], **And** [any follow-on effect]. — *happy path*
   > 2. **Given** [an attempt with missing or invalid input], **When** [I submit], **Then** [a clear, specific validation error naming the field], **And** [the user can correct and retry]. — *invalid input*
   > 3. **Given** [a conflicting or duplicate state — e.g. an entity already exists / already in the target status], **When** [I repeat the action], **Then** [the system prevents it and explains why]. — *duplicate / conflict*
   > 4. **Given** [the system at exactly the soft limit / lower boundary], **When** [the boundary action occurs], **Then** [the last-allowed behaviour, e.g. permit-but-warn]. — *boundary (soft)*
   > 5. **Given** [the system at exactly the hard cap / upper boundary], **When** [the action occurs], **Then** [the first-disallowed behaviour, e.g. block with a named message]. — *boundary (hard)*
   > 6. **Given** [the boundary condition has cleared — e.g. count drops back below the cap], **When** [the action is retried], **Then** [normal behaviour resumes]. — *recovery / transition*
   > 7. **Given** [a UI that surfaces status or thresholds], **When** [it is displayed], **Then** [the state is conveyed by text or icon in addition to colour (never colour alone) to satisfy WCAG 2.1 AA], **And** [indicator colours meet a minimum 4.5:1 contrast ratio against their background]. — *accessibility / non-functional*

   - **Why this priority** must reference the ranking and the neighbouring stories — a P2 that depends on a P1, or supersedes an earlier behaviour, says so. Don't assert a priority without the dependency reasoning.
   - **Independent Test** describes a self-contained check: the story should be verifiable without waiting on other unbuilt stories. If it genuinely can't be tested independently, say what it depends on rather than pretending it can.
   - **Acceptance Scenarios use Gherkin.** Every scenario is one behaviour written as `Given … When … Then …`, with `And` / `But` for extra context, actions, or outcomes. Steps are declarative (describe the state and the observable outcome, not the UI mechanics). Number the scenarios; a short trailing `— *label*` naming which ground it covers is encouraged.
   - **Be robust — cover all the grounds, not just the happy path.** For each story with real interactive behaviour, work through this checklist and write a scenario for every class the story actually has:
     - **Happy path** — valid inputs produce the specific, named success outcome (a confirmation screen, a queue position, a status change) — never a vague "it works".
     - **Invalid / missing input** — each mandatory field or malformed input yields a clear, specific validation error the user can act on, and a path to correct it.
     - **Duplicate / conflict / idempotency** — repeating the action, or acting on an entity already in the target state, is prevented and explained (e.g. re-registering an already-Active record).
     - **Boundary values and limits** — write scenarios at the *exact* edges: the last value that is allowed and the first that is not. Distinguish **soft** thresholds (permit-but-warn/track) from **hard** caps (block), and include the **transition back** across a threshold (the limit clears → normal behaviour resumes). Use concrete example counts (the 50th, 51st, 60th, 61st), not "many".
     - **State / permission / sequence** — who may act, in which state; blocked actions say why and what to do next; out-of-order actions are handled.
     - **Non-functional & accessibility** — whenever a story renders status, thresholds, or colour-coded indicators, add an accessibility scenario: status conveyed by **text or icon in addition to colour (never colour alone)** and indicator colours meeting **≥ 4.5:1 contrast** to satisfy **WCAG 2.1 AA**. Fold in other measurable non-functionals the story implies (latency, concurrency, audit).
   - **Ground every threshold and value in evidence.** Pull limits, statuses and messages from the Success criteria, the ranking, or the research — do not invent a `50`/`60`/contrast figure the inputs don't support. Where a specific threshold is genuinely unspecified, write the scenario with a `[TBD — needs the actual limit]` placeholder and raise it under Open questions rather than fabricating a number.
   - **Every `Then` is observable and specific** — a named message, screen, field, value, count, or state a tester can assert against. No `Then the system works correctly`.
   - Where a story's evidence is too thin to write scenarios honestly, still give it a block, but replace the scenario list with a single `Acceptance Scenarios: TBD — needs [the specific input/decision still missing]` line and flag it in Open questions. A thin story keeps its block (with the gap named); it never silently drops back to table-only.
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
- **User-story summary table** is ordered by priority, every row's `ID · rank · priority` ties back to the ranking, and every Evidence cell cites a real verbatim/observation with its source ref. Stories describe outcomes, not features.
- **Expanded stories** exist for *every* story in the summary table (none is table-only), each with a **Why this priority** that references the ranking and neighbouring stories (dependencies/supersessions named) and an **Independent Test** that is genuinely self-contained (or names what it depends on).
- **Acceptance Scenarios are robust Gherkin.** Each is one behaviour in `Given … When … Then …` (with `And`/`But`), and — for every story with real interactive behaviour — the set covers the grounds the story actually has: happy path, invalid/missing input, duplicate/conflict, boundary limits at the *exact* edges (soft vs hard, plus the transition back across the threshold, using concrete example values), state/permission, and an accessibility/non-functional scenario wherever status or colour-coding is shown (status by text/icon not colour alone; contrast ≥ 4.5:1; WCAG 2.1 AA). Every `Then` is observable and specific — a named message, value, count, or state, never "it works". No invented thresholds — unspecified limits are `[TBD]` placeholders raised in Open questions, and a thin story keeps its block but marks scenarios `TBD — needs [X]`.
- **Constraints and dependencies** name every external thing the work depends on. Re-read with "what would block this?" in mind.
- **Open questions** are honest. The first draft is supposed to be wrong in interesting ways; the open questions are where you flag what you don't know.
- **Persona references** link to specific persona pages — no implicit "the user".
