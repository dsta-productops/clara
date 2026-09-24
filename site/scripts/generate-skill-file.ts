#!/usr/bin/env tsx
/**
 * Refresh the hosted CLARA skill files for the Quick start section.
 * ------------------------------------------------------------
 * The Quick start's starter prompt tells an LLM to fetch CLARA's skill file
 * from a URL. We host those files ourselves as static assets, one per platform:
 *
 *     site/public/skill/clara-confluence.md
 *       → https://dsta-productops.github.io/clara/skill/clara-confluence.md
 *     site/public/skill/clara-plane.md
 *       → https://dsta-productops.github.io/clara/skill/clara-plane.md
 *
 * These are COMMITTED release artefacts, deliberately refreshed — not built in
 * CI. The Pages workflow installs only the site's own deps (`--ignore-workspace`)
 * and never runs CLARA's core build, so the files must already be in the tree.
 *
 * Run `pnpm generate` (from site/) after a CLARA release to refresh them, then
 * commit the diff. The SHA is printed so you can record which build you shipped.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

// One hosted skill file per knowledge-base backend. The Quick start's platform
// toggle points the starter prompt at the matching file.
const PLATFORMS = ["confluence", "plane"] as const;

const SITE_ROOT = resolve(import.meta.dirname, "..");
const REPO_ROOT = resolve(SITE_ROOT, "..");
const OUT_DIR = join(SITE_ROOT, "public", "skill");

// Call the tsx binary directly (not via `pnpm exec`, which re-runs a workspace
// install check that can fail on ignored build scripts). The repo-root binary
// resolves gray-matter etc. from the root node_modules.
const tsxBin = join(REPO_ROOT, "node_modules", ".bin", "tsx");

function sha(): string {
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }).trim();
  } catch {
    return "unreleased";
  }
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const rev = sha();

  for (const platform of PLATFORMS) {
    const buildDir = mkdtempSync(join(tmpdir(), `clara-skill-${platform}-`));
    execFileSync(tsxBin, ["build/build.ts"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      env: { ...process.env, CLARA_PLATFORM: platform, CLARA_OUT: buildDir },
      stdio: "ignore",
    });

    const content = readFileSync(join(buildDir, "SKILL.md"), "utf8");
    const outFile = join(OUT_DIR, `clara-${platform}.md`);
    writeFileSync(outFile, content, "utf8");

    console.log(
      `Wrote public/skill/clara-${platform}.md (SHA ${rev}, ${content.length.toLocaleString()} chars).`,
    );
  }

  console.log("Commit the diff.");
}

main();
