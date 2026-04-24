// Replays lib/blog-posts.ts updates from an existing covers.json
// manifest — no OpenAI calls. Useful when the registry write-back got
// garbled and we want to reapply cleanly.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  updateRegistryFeaturedImages,
  type GeneratedCover,
} from "./cover-gen.js";
import { PATHS } from "./config.js";

const repoRoot = process.cwd();
const manifestPath = join(repoRoot, PATHS.enhanceReports, "covers.json");
const covers = JSON.parse(readFileSync(manifestPath, "utf8")) as GeneratedCover[];
const res = updateRegistryFeaturedImages({ repoRoot, covers });
console.log(JSON.stringify(res, null, 2));
