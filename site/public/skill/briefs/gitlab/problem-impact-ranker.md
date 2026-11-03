# Problem impact ranker

You are helping me rank the problems found in research by their impact, with the scoring made visible.

# context

Ask for these slots in one message, using these exact bold labels.

- **Programme name** — the named DSTA initiative you are working on (for example SKYWATCH). It is not the deployment environment (on-prem, internet, ANZ C); those are hosting contexts, not programmes. CLARA uses it only to check it is working in the right project wiki. It does not appear in output paths.
- **Track** — the track within the programme this artefact belongs to (workstream, capability area, feature line, sub-system, or any other meaningful slice). Tracks vary by programme. If the artefact spans tracks, the answer is the literal `Programme-wide`. CLARA lists the track folders it finds so you can pick one; it does not invent track names.
- **Ranking lens** — optional. Impact is always rated on severity, reach and frequency (High, Medium or Low each). Use this slot only to say what "severity" means for this programme (for example time lost, safety, adoption).
- **Inputs** — the research synthesis and any other material, or "search the wiki".

# Step 1 — Confirm the run context

At the start of every artefact run, confirm the programme and track before doing anything else.

- Check **Programme name** against the project name from the clone or the MCP project lookup. If they do not match, stop and ask, so the user can confirm you are in the right wiki before anything is filed.
- List the track folders found at the wiki root (a track is a root-level folder with a sibling overview page and a `Field-notes` folder) and confirm **Track**. The literal `Programme-wide` means umbrella scope.
- **Programme type** is not asked at run time. Read the `Programme type:` line in the body of `home.md`. If it is missing or unreadable, ask the user to confirm it before proceeding.

Elicit the remaining slots in `# context` only after Programme name and Track are confirmed. Batch every missing slot into one message.

# Step 2 — Gather inputs

Every artefact in the Knowledge Base lives at one of two scopes:

- **Programme-wide** — umbrella artefacts that apply across all tracks. Filed under `Programme-wide/`.
- **Track-level** — artefacts specific to a single track. Filed under `{{track}}/`.

When a downstream artefact needs upstream input, search **both** scopes:

```
{{track}}/<Artefact-type>/*
Programme-wide/<Artefact-type>/*
```

When the same artefact type exists in both locations, the **track-level version takes precedence**. The programme-wide version is the fallback. The fallback is **visible**, not silent: tell the user which version you used and why, so they can see when track-level material is missing and whether the fallback is appropriate.

- **Field notes.** Before reading any notes, stamp Session IDs (main skill, section 7.7). Then read the notes in `{{track}}/Field-notes/` and `Programme-wide/Field-notes/`, track first. Cite every note by its Session ID in square brackets, for example [FS03]. Never cite an unstamped note.
- Read the research synthesis for the scope. Its friction table is the required input. If there is none, say so and offer research-synthesiser first.
- Read the personas to rate reach and frequency, and the field notes to check counts.

# Step 3 — Draft

Rank the problems. Use this structure:

```
# Problem impact analysis — <scope>
## How impact was scored
## Ranking at a glance
## Ranked problems
## Reading the ranking
## Sources
```

**How impact was scored.** Each problem is rated High, Medium or Low on three factors:

- **Severity** — how painful is the problem? H: safety, accuracy, pay or morale consequence, or work that must be redone. M: significant extra effort or delay. L: an annoyance with a workaround.
- **Reach** — how many people are affected? Name the roles. H: several roles, or the whole user population. M: one role at scale. L: a narrow group.
- **Frequency** — how often does it occur? H: every cycle or every person. M: some cycles or a subset. L: occasional or edge cases.

State the rule on the page: H = 3, M = 2, L = 1, and the score is Severity + Reach + Frequency, from 3 to 9. H-H-H scores 9 and ranks first. Equal scores are ordered by Severity, then Reach, then Frequency. Problems still tied share a rank, marked `=`. Where the notes record nothing for a factor, mark it `?`, sort it as M, and flag the problem `[provisional]`; never score it L silently.

Evidence and Cluster are **not scored**. They sit beside the score so a reader can weigh it. Evidence is the number and type of notes (interviews, observations, walk-throughs): strong, moderate or weak. Cluster names the root cause the problem shares with others, or `—` if it is self-contained.

**Ranking at a glance.** A table with the columns Rank, Problem, Source ref, Sev, Reach, Freq, Score, Evidence, Cluster. Sort by Score descending, then by the tie-break.

**Ranked problems.** Group by score band: Tier 1 is 8–9, Tier 2 is 6–7, Tier 3 is 4–5, and Tier 4 is a score of 3 or two or more factors marked `?` (discovery-stage). If the ranking shows a cluster, open with one consolidated statement for the whole cluster, listing the ranks it merges, then write the members individually. Each entry is a heading `RANK N · SCORE total/9 (S-R-F) — short title`, one paragraph framed as a problem, a table with the rows What, Where and when, Who, Why (root cause) and Why (impact), and an Evidence and status paragraph that cites Session IDs, says plainly where no evidence is recorded, and states the research status.

**Reading the ranking.** Clusters worth scoping as one effort, where evidence is thin, items whose preferred fix is policy rather than product, and constraints carried over. Include any problem whose rank differs from the synthesis order, and why.

Output rules for every draft:

- Open with the front matter `title`, the breadcrumb, and one H1, exactly as in section 7.8 of the main skill.
- Cite every finding by Session ID in square brackets, for example [FS03], and add each source to the Sources table at the end (Source, What it is, Link). Define the labels in the link-reference block.
- Label every theme, hypothesis, requirement, trait or step with a provenance label — **[Inherited]**, **[Adapted]**, **[Validated]** or **[New]** — as defined in section 4 of the main skill. Only this programme's field notes make something **[Validated]**.
- Mark thin or uncertain statements inline: `[thin]`, `[open]`, `[provisional]`, `[contested]`.
- State gaps plainly. If the inputs do not support a section, say so and keep it short. Never invent evidence, names, numbers or prior work.
- No advisory content (next steps, recommendations) unless this artefact's structure asks for it. No authorship byline.
- Clean Unicode punctuation. No raw angle brackets in prose.
- If a diagram helps, use Mermaid.
- Take severity and frequency from the synthesis and cite it. Reach is the share of roles or users affected, and must be countable.
- Show the arithmetic. State how ties were broken.
- Rank problems only. Do not propose solutions.

# Step 4 — File the output

Follow CLARA's filing discipline (section 7.5 of the main skill). In short, apply these checks **in order, before filing**:

1. **Project and wiki check.** The clone must succeed and be the project the user named. If not, ask. Never create a project or enable a wiki.
2. **Path check.** In the freshly pulled working tree (`git pull --rebase` first), resolve the target `{{track}}/Problem-impact-analysis.md` and confirm every parent exists: `{{track}}/` and its overview page `{{track}}.md`. The path shown to the user at confirmation is the literal path you checked.
3. **Missing structure.** List every missing folder and index page in the confirmation prompt, so the user authorises them in the same go as the leaf page. Do not prompt per placeholder. After approval, create them top-down, then the leaf page. Placeholder body: *"Placeholder — created to support filing structure."*
4. **Update vs create.** If a page already exists at the target path, ask whether to update in place (git history preserves the prior version) or to draft at an alternative path. Do not silently overwrite.
5. **No silent fallbacks.** If the path cannot be created (permissions, no push access, anything else), stop and say exactly what is blocked. Do not file anywhere else without explicit confirmation, and do not improvise an alternative path.
6. **Confirm.** Show the draft and every file that will change: the page, its entry in the track overview's `## Contents` list (add it if missing), its entry in `_sidebar.md`, and any missing structure. File only on explicit go-ahead.
7. **Write** the page with front matter title, breadcrumb, body, Sources table and link-reference block (section 7.8), then the index and sidebar edits.
8. **Link check.** Run the link-check script from the appendix of the main skill. It must print OK.
9. **Commit and push.** Commit as `clara: problem-impact-ranker to {{track}}/Problem-impact-analysis.md`. Push. If rejected, run `git pull --rebase`, re-run the path check, and retry once. Never force-push.
10. **Verify.** After the push, `git fetch` and confirm the file exists on the remote default branch at the intended path, in the intended folder, with its index entry. If it does not, stop and report; do not continue.

You do **not** apply wiki labels or metadata. The path is the retrieval contract: every artefact lives at a predictable path.

- Report the filed page's full URL: `<project-web-url>/-/wikis/{{track}}/Problem-impact-analysis`.
- In copy-paste mode, return the page (front matter included) and the path above. The user files it by hand.
