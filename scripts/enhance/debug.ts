import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { join } from "node:path";
for (const f of [".env.local", ".env"]) {
  const p = join(process.cwd(), f);
  if (existsSync(p)) dotenv.config({ path: p, override: false });
}
import { findPostFile, parsePost } from "./parse-post.js";

for (const slug of [
  "neet-coaching-in-jaipur",
  "best-neet-coaching-in-jaipur",
  "jee-coaching-in-jaipur",
  "mansarovar",
]) {
  const fp = findPostFile(process.cwd(), slug);
  if (!fp) {
    console.log(`${slug}: no file`);
    continue;
  }
  const p = parsePost(fp, slug);
  console.log(`\n${slug}:`);
  console.log(
    `  title (${p.title?.length}): ${p.title?.slice(0, 80)}`,
  );
  console.log(
    `  meta  (${p.metaDescription?.length}): ${p.metaDescription?.slice(0, 100)}`,
  );
  console.log(`  cat:   ${p.category}`);
  console.log(`  kw:    ${p.primaryKeyword}`);
  console.log(`  words: ${p.wordCount}`);
  console.log(`  h2s:   ${p.h2s.length}`);
  console.log(
    `  kw-in-title: ${p.title && p.primaryKeyword ? p.title.toLowerCase().includes(p.primaryKeyword.toLowerCase()) : "n/a"}`,
  );
}
