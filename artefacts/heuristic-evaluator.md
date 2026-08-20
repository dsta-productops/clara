---
title: "Heuristic evaluator"
phase: "research"
domain: "shared"
tool: "clara"
task: "conduct a Nielsen heuristic usability evaluation of an existing product from screenshots, a live URL, or a PDF/deck — producing a scored, evidence-anchored report with per-heuristic compliance, severity-rated findings, and a prioritised remediation roadmap"
expectedOutput: "A markdown evaluation report: a scored cover (index /100 + band), executive summary with the top findings to fix first, methodology, a per-heuristic scorecard (current vs achievable), scenario walkthroughs listing every finding in flow order (ID · heuristic · severity · origin · recommendation · screenshot reference), a complete findings register, and a P0/P1/P2 remediation roadmap."
inputsFrom:
  - prior-knowledge-summariser
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "The product material to evaluate (user-supplied)"
      description: "This artefact evaluates an *external* product, so its primary evidence is supplied by the user, not read from the KB: captured screenshots of the flows, a live URL CLARA can browse, and/or a PDF/deck of the screens. CLARA numbers each screen as it is captured so every finding cites a specific one."
    - what: "The task scenarios to walk"
      description: "The one or two end-to-end tasks to inspect (e.g. 'employee applies for leave; supervisor approves'). If the user does not name them, CLARA infers them from the supplied screens and confirms before inspecting."
    - what: "Evaluation mode"
      description: "Which of the four framings applies — competitor product / an existing system being improved / a product being decommissioned (learn before rebuild) / a standalone evaluation independent of any programme. The mode sets how findings are attributed and whether the 'where each fix is made' appendix applies."
    - what: "Prior-knowledge summary on the product or domain (optional)"
      description: "Search both `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*`. Use it for grounding — known constraints, the product's role, prior complaints — so the evaluation builds on what's already known."
  outputPathTemplate: "Knowledge Base/{{track}}/Heuristic-evaluations/{{product-name}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to run an expert (inspection-based) heuristic usability evaluation of an existing product — a competitor's, one you are improving, one being decommissioned, or one you simply want to assess — against Nielsen's ten usability heuristics, and to turn it into a scored, evidence-anchored report. It works from whatever you can supply: screenshots, a live URL, or a PDF/deck of screens.

# context

- **Product name** — the product and the slice under evaluation (e.g. "Oracle HCM — Absence & Onboarding"). Becomes `{{product-name}}`.
- **Evaluation mode** — competitor / existing-system-to-improve / decommissioning / standalone. Sets origin attribution and whether Appendix B applies.
- **Task scenarios** — the one or two end-to-end tasks to walk. If not given, CLARA proposes them from the screens and confirms.

# inputs

- Take in the product material the user supplies: screenshots, a live URL (browse it), or a PDF/deck. **Number every screen as you go** (`S1`, `S2`, …) so each finding cites a specific screen; keep a running screen list.
- Confirm the **evaluation mode** and the **task scenarios** before inspecting — restate the scenarios back to the user in the order they occur.
- Optionally read a prior-knowledge summary at `Knowledge Base/{{track}}/Prior-knowledge/*` (or programme-wide) for grounding.
- If material is thin (too few screens to walk a whole task, no error/validation states, a URL you cannot reach), say so up front and scope the evaluation to what the evidence supports — do not infer findings you cannot see.

# draft

Run the standard four-step protocol — **familiarisation → independent inspection → severity rating → consolidation** — then write the report. Evaluate strictly against **Nielsen's 10 heuristics**.

## The framework — Nielsen's 10 heuristics

Inspect every screen against these. A finding is always tied to concrete on-screen evidence, never to the principle in the abstract.

| # | Heuristic | Principle |
|---|---|---|
| H1 | Visibility of system status | Keep users informed with timely, appropriate feedback. |
| H2 | Match between system & real world | Speak the users' language; follow real-world conventions. |
| H3 | User control & freedom | Provide clearly marked exits, undo and redo. |
| H4 | Consistency & standards | Follow platform and internal conventions; avoid ambiguity. |
| H5 | Error prevention | Design out error-prone conditions before they occur. |
| H6 | Recognition rather than recall | Make options visible; minimise memory load. |
| H7 | Flexibility & efficiency of use | Offer accelerators and personalisation for varied users. |
| H8 | Aesthetic & minimalist design | Remove irrelevant or rarely-needed content. |
| H9 | Help users recognise, diagnose & recover from errors | Plain-language messages that diagnose and offer a fix. |
| H10 | Help & documentation | Task-focused, searchable, in-context help. |

## Severity rating (Nielsen 0–4)

Rate each finding on the 0–4 scale. Severity is a **composite of frequency (how often it is met), impact (how hard it is to overcome), and persistence (whether users can learn to avoid it)** — a high-frequency, high-impact, persistent problem on a task everyone must do rates far above a cosmetic blemish on a rare screen.

| Rating | Meaning | Action implied |
|---|---|---|
| 4 | Usability catastrophe | Imperative to fix before release |
| 3 | Major usability problem | Important — high priority |
| 2 | Minor usability problem | Low priority |
| 1 | Cosmetic problem | Fix if time permits |
| 0 | Not a usability problem | — |

## Origin attribution

Tag every finding by where the fix lives. The two classes depend on the mode:

- **Existing-system / decommissioning modes** (a product you own or can change): `CFG` = tenant **configuration/content** (fixable in-house) vs `PRD` = **delivered product/platform** (needs the vendor or a code extension). This split is what tells the team how much they can fix without waiting on a release.
- **Competitor / standalone modes**: attribution is usually not actionable for you, so tag origin as `—` (or note "observed" vs "inferred") and **skip Appendix B**.

## Scoring model

1. **Deductions.** For each heuristic, sum a deduction `D` from its findings, weighting by severity (a sev-4 deducts far more than a sev-1). State the per-heuristic `D` you used.
2. **Per-heuristic score.** Convert with the saturating function `score = 60 / (6 + D)` — a clean heuristic scores 10; scores fall steeply with the first serious problems then flatten, mirroring how the first catastrophe defines the experience.
3. **Criticality weighting.** Combine the ten scores with weights that **sum to 1.0**, reflecting how consequential each principle is *for this product's context* (for transactional, novice-heavy, compliance-bearing flows, weight Visibility, Match, Consistency, Error prevention and Error recovery highest). State the weights and the one-line reason. Multiply the weighted average by 10 for the final index.
4. **Banding.** `0–40 Critical · 40–55 Poor · 55–70 Adequate · 70–85 Good · 85–100 Excellent`.
5. **Achievable-via-fix index.** Re-run the score with the in-house-fixable (`CFG`) deductions removed, to show how far configuration/content work alone lifts the experience. Report both the current index and the achievable one.

## Report structure

Produce the report with one `##` heading per section:

1. **Cover / rating** — product and slice, overall index `/100` + band, headline counts (total findings, severity-4 catastrophes, achievable-via-fix index), framework ("Nielsen's 10 heuristics"), scope (N screens, M task scenarios).
2. **Executive summary** — one paragraph on what was assessed and what was found, a small stat row (overall / findings / catastrophes / config-fixable %), then **"The findings to fix first"** — the catastrophes, each with its ID, one-line description, and why it matters most.
3. **Methodology** — what a heuristic evaluation is and the four-step protocol; the 10-heuristic table; the 0–4 severity scale; how the overall score was derived (the model above); and a **Scope & limitations** block — the static-capture caveat (error states, responsive breakpoints, and assistive-tech behaviour could not be exercised), that contrast is estimated not measured, and the **single-evaluator caveat** (one evaluator detects ~a third of problems; 3–5 are needed for broad coverage, so findings are a lower bound and the score an upper bound on quality).
4. **Scorecard** — per-heuristic compliance (current vs achievable-via-fix); the distribution of findings by severity and scenario; and a "findings at a glance" table (per scenario: catastrophe / major / minor / cosmetic / total / config-fixable).
5. **Scenario walkthroughs** — one section per task scenario. Open with a one-line narrative of the flow and a short **"What works well"** note (name the genuine strengths, cited to screens). Then list **every** finding *in the order it occurs in the flow*, each as a labelled block:

   > **[ID] — [short title]**  ·  [Heuristic Hn]  ·  **SEV [0–4]**  ·  [origin: CFG / PRD / —]
   >
   > [Description tied to the specific screen and element: what is on screen, why it violates the heuristic, and the consequence.]
   >
   > **Recommendation.** [Concrete, specific fix.]
   >
   > *Evidence: screen S[n] — [the exact element/marker on that screen].*

   Give findings stable IDs prefixed by scenario (e.g. `A-08` for Absence, `J-07` for the Journey) so they cross-reference. Every finding appears in full here — none exists only in the appendix.
6. **Appendix A — complete findings register** — every finding as one row of a single index table: `ID · H · Sev · Src · Issue · Recommendation`. A consolidated, sortable repeat of the walkthroughs; add nothing new here.
7. **Recommendations — prioritised remediation roadmap** — group findings into three waves and present each as a `Findings · Action · Owner` table:
   - **P0 — fix before wider rollout** — the catastrophes and their trust/compliance-critical siblings.
   - **P1 — fix next cycle** — major consistency, language and guidance issues.
   - **P2 — address opportunistically** — minor and cosmetic polish.
8. **Appendix B — where each fix is made** *(existing-system / decommissioning modes only)* — a `Tool/layer · Typical findings · What it controls` table mapping findings to the part of the product that owns the change, separating in-house-configurable work from work needing the vendor or an extension. Skip this section in competitor / standalone modes.
9. **Closing note** — a short, fair summary: what the product gets right, what holds usability back, and whether the gap is a product ceiling or (usually) fixable configuration/content.

Rules:
- **Evidence over principle.** Every finding names a specific screen and element. If you cannot point to it on a screen, it is not a finding — it is a hypothesis; flag it as inferred or leave it out.
- **Don't invent.** No fabricated screens, counts, quotes, or scores. If the material can't support a section (e.g. only one scenario supplied), say so rather than padding.
- **Be fair.** Record genuine strengths in "What works well" — a report that is all deductions is neither accurate nor persuasive.
- Where input is incomplete, ask up to 3 clarifying questions BEFORE scoring.

Output as markdown.

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/Heuristic-evaluations/{{product-name}}`. Embed the numbered screenshots inline next to the findings that cite them where the user supplied image files; otherwise reference them by screen number.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new page at `Knowledge Base/{{track}}/Heuristic-evaluations/{{product-name}}`. Reference the numbered screens by number in the body; attach or link the supplied screenshots where possible.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- CLARA works from whatever fidelity you supply. A live URL lets it exercise more states than static screenshots; a PDF/deck is fine but freezes the product in one rendered state — the Scope & limitations section records that honestly.
- Treat the score as a comparative instrument, not an absolute grade: it is most useful for tracking the same product across iterations, or ranking a set of competitors evaluated the same way.
- The findings are a lower bound. For a decision that carries weight, run a second evaluator and merge — Nielsen's own research is why the single-evaluator caveat is in the report.
- In existing-system mode, the CFG-vs-PRD split and the achievable-via-fix index are the most persuasive parts of the report: they tell the team how much they can fix themselves, now.

## Before you circulate — self-review checklist

- **Every finding cites a specific screen and element.** No principle-in-the-abstract findings; no finding that can't be located on a screen.
- **Severity is justified.** Each rating reflects frequency × impact × persistence, not just how annoying the issue felt. The catastrophes really are catastrophes.
- **The score is reproducible.** Per-heuristic deductions, the weights (summing to 1.0) and their rationale are stated, so a reader can follow the index from findings to headline number. The band matches the number.
- **Achievable-via-fix index is present** (existing-system/decommissioning modes) and the CFG/PRD attribution behind it is consistent with Appendix B.
- **Strengths are recorded.** "What works well" names genuine, screen-cited strengths in each scenario.
- **Scope & limitations is honest** — the static-capture and single-evaluator caveats are stated; the score is framed as an upper bound and the findings as a lower bound.
- **Walkthrough is complete.** Every finding in the register appears in full in a walkthrough, in flow order, with a stable ID; the appendix adds nothing new.
