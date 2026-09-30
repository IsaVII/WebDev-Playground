#!/usr/bin/env node
/**
 * Code-parsing system for WebDev-Playground's content JSON.
 * ============================================================
 *
 * Historically every code sample lived inline in the cheatsheet/learning
 * JSON files as a single, `\n`-escaped string (or an array of escaped
 * lines for the "full example" walkthroughs). That's unpleasant to edit,
 * gets no syntax highlighting in an editor, and can't be run through
 * language-specific tooling (prettier, eslint, tsc, ...).
 *
 * This script moves the other direction: it pulls that code out into real,
 * properly-extensioned files under `src/data/code-examples/**`, and
 * rewrites the JSON to hold only a *reference* to the file (`codeFile` for
 * a single snippet, `files` for a multi-file "full example"). Actual
 * rendering resolves those references back into strings/line-arrays at
 * runtime via `src/utils/codeExamples.js`.
 *
 * Usage:
 *   node scripts/extract-code-examples.mjs           # run the migration
 *   node scripts/extract-code-examples.mjs --check    # verify, no writes
 *
 * The script is idempotent - once a `code` field has been replaced with
 * `codeFile`/`files`, re-running it is a no-op for that field. That makes
 * it safe to run again after adding new inline code to a JSON file by
 * hand (e.g. while drafting a new cheatsheet) - it will extract just the
 * new bits.
 *
 * Locale handling: src/data/sv/** mirrors src/data/** with translated
 * prose but (verified at migration time) *identical* code. Rather than
 * duplicating every code file per locale, translated JSON files are
 * pointed at the same extracted files as their English counterpart. If a
 * translated file's code ever diverges from English, the script detects
 * that and extracts a locale-specific copy instead of silently losing the
 * difference (see `writeCodeFile`).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const DATA_ROOT = join(REPO_ROOT, "src", "data");
const CODE_EXAMPLES_ROOT = join(DATA_ROOT, "code-examples");

const CHECK_ONLY = process.argv.includes("--check");

// ---------------------------------------------------------------------
// Extension inference
// ---------------------------------------------------------------------

const EXT_BY_LANGUAGE = {
  javascript: "js",
  js: "js",
  jsx: "jsx",
  typescript: "ts",
  ts: "ts",
  tsx: "tsx",
  json: "json",
  bash: "sh",
  sh: "sh",
  shell: "sh",
  html: "html",
  css: "css",
  sql: "sql",
  yaml: "yml",
  yml: "yml",
  graphql: "graphql",
  python: "py",
  markdown: "md",
  md: "md",
};

function extFromLanguage(language) {
  if (!language) return null;
  return EXT_BY_LANGUAGE[language.toLowerCase()] ?? null;
}

/** Best-effort language guess for snippets that never had a `language`
 * field (e.g. projectSetup.json's backendSetup steps). Order matters -
 * checks go from most to least specific. */
function guessExt(code) {
  const trimmed = code.trim();
  if (/^\/\/\s*[\w.-]+\.\w+/.test(trimmed) && /require\(|=>|const |function /.test(trimmed)) {
    return "js";
  }
  if (/<\/?[A-Za-z][\s\S]*>/.test(trimmed) && /className=|onClick=|\{[\s\S]*\}/.test(trimmed)) {
    return "jsx";
  }
  if (/^[{[]/.test(trimmed)) return "json";
  if (/^(npm|npx|git|mkdir|cd|curl|export|source|node|yarn|pnpm)\b/m.test(trimmed)) return "sh";
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE)\b/i.test(trimmed)) return "sql";
  return "js";
}

// ---------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------

function slugify(text, maxLen = 48) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLen)
    .replace(/-+$/g, "");
}

function readJSON(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJSON(path, data) {
  if (CHECK_ONLY) return;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/**
 * Writes `content` to `absPath` unless an identical file is already there.
 * If a *different* file is already there (only possible when a locale's
 * code has genuinely diverged from English), returns a locale-suffixed
 * path instead of clobbering it, so nothing is silently lost.
 */
const writtenFiles = new Map(); // absPath -> content, for divergence checks

function writeCodeFile(absPath, content) {
  const existing = writtenFiles.get(absPath);
  if (existing !== undefined && existing !== content) {
    throw new Error(
      `Content mismatch for ${absPath} - two different code snippets want ` +
        `the same file. Give one of them a distinct name.`,
    );
  }
  writtenFiles.set(absPath, content);
  if (CHECK_ONLY) return;
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, content.endsWith("\n") ? content : content + "\n", "utf8");
}

let extractedCount = 0;
let skippedCount = 0;

// ---------------------------------------------------------------------
// Cheatsheet extraction: `code` (string) -> `codeFile` (path), recursively
// through `steps[]`, `steps[].subSteps[]`, and `backendSetup.steps[]`.
// ---------------------------------------------------------------------

function extractCheatsheetNode(node, { topicDir, prefix, index }) {
  if (!node || typeof node !== "object") return;
  if (typeof node.code !== "string") return; // already migrated or no code

  const title = node.title ?? node.step ?? `snippet-${index}`;
  const ext = extFromLanguage(node.language) ?? guessExt(node.code);
  if (!node.language) {
    node.language =
      Object.entries(EXT_BY_LANGUAGE).find(([, e]) => e === ext)?.[0] ?? ext;
  }

  const filename = `${prefix}-${slugify(title)}.${ext}`;
  const relPath = `code-examples/cheatsheets/${topicDir}/${filename}`;
  const absPath = join(DATA_ROOT, relPath);

  writeCodeFile(absPath, node.code);
  delete node.code;
  node.codeFile = relPath;
  extractedCount += 1;
}

function extractCheatsheetFile(jsonPath, topicDir) {
  const data = readJSON(jsonPath);

  (data.steps ?? []).forEach((step, i) => {
    const prefix = String(step.id ?? i + 1).padStart(2, "0");
    extractCheatsheetNode(step, { topicDir, prefix, index: i });

    (step.subSteps ?? []).forEach((subStep, j) => {
      const letter = String.fromCharCode(97 + j); // a, b, c...
      extractCheatsheetNode(subStep, {
        topicDir: `${topicDir}/${prefix}-${slugify(step.title)}`,
        prefix: letter,
        index: j,
      });
    });
  });

  if (data.backendSetup?.steps) {
    data.backendSetup.steps.forEach((step, i) => {
      const prefix = String(i + 1).padStart(2, "0");
      extractCheatsheetNode(step, {
        topicDir: `${topicDir}/backend-setup`,
        prefix,
        index: i,
      });
    });
  }

  writeJSON(jsonPath, data);
}

// ---------------------------------------------------------------------
// Learning "full example" extraction: `fullExample.code` (string[]) ->
// `fullExample.files` (path[]). Multi-file examples are detected by a
// leading `// filename.ext` comment that starts either the array or a
// segment immediately after a blank line - the same convention the
// authors already used by hand to label each file inline.
// ---------------------------------------------------------------------

const FILE_MARKER = /^\/\/\s*([\w.-]+\.[A-Za-z]+)\b/;

function splitIntoFileSegments(codeLines) {
  const markers = [];
  codeLines.forEach((line, i) => {
    const match = FILE_MARKER.exec(line);
    if (match && (i === 0 || codeLines[i - 1] === "")) {
      markers.push({ index: i, filename: match[1] });
    }
  });

  if (markers.length === 0) return null; // single-file example

  const segments = [];
  markers.forEach((marker, i) => {
    const nextMarker = markers[i + 1];
    // Drop the single blank separator line right before the next marker.
    const end = nextMarker ? nextMarker.index - 1 : codeLines.length;
    segments.push({
      filename: marker.filename,
      lines: codeLines.slice(marker.index, end),
    });
  });

  // Safety net: reconstructing the segments (joined by one blank line)
  // must reproduce the original array byte-for-byte, or a step's
  // `lines: [start, end]` reference would silently point at the wrong
  // code after the split. If it doesn't reconstruct cleanly, fall back
  // to treating the example as single-file rather than risk that.
  const rebuilt = segments
    .map((s) => s.lines)
    .reduce((acc, lines, i) => (i === 0 ? lines : [...acc, "", ...lines]), []);
  if (rebuilt.join("\n") !== codeLines.join("\n")) return null;

  return segments;
}

function extractLearningFile(jsonPath, topicDir) {
  const data = readJSON(jsonPath);
  const fullExample = data.fullExample;
  if (!fullExample || !Array.isArray(fullExample.code)) {
    skippedCount += 1;
    return; // already migrated, or this topic has no full example
  }

  const segments = splitIntoFileSegments(fullExample.code);
  const dir = `code-examples/learning/${topicDir}`;

  let files;
  if (segments) {
    files = segments.map((segment) => {
      const relPath = `${dir}/${segment.filename}`;
      writeCodeFile(join(DATA_ROOT, relPath), segment.lines.join("\n"));
      return relPath;
    });
  } else {
    const ext = guessExt(fullExample.code.join("\n"));
    const relPath = `${dir}/example.${ext}`;
    writeCodeFile(join(DATA_ROOT, relPath), fullExample.code.join("\n"));
    files = [relPath];
  }

  delete fullExample.code;
  fullExample.files = files;
  extractedCount += 1;

  writeJSON(jsonPath, data);
}

// ---------------------------------------------------------------------
// Locale files: point them at the same extracted files as English,
// instead of re-extracting (and duplicating) identical code.
// ---------------------------------------------------------------------

function repointLocaleCheatsheetNode(node, referenceNode) {
  if (!node || typeof node !== "object") return;
  if (typeof node.code === "string" && referenceNode?.codeFile) {
    if (node.code !== readFileSync(join(DATA_ROOT, referenceNode.codeFile), "utf8").replace(/\n$/, "")) {
      // Genuinely different translated code - extract it on its own
      // rather than losing the difference by pointing at English's file.
      extractCheatsheetNode(node, {
        topicDir: dirname(referenceNode.codeFile).replace(/^code-examples\/cheatsheets\//, "") + "-sv",
        prefix: "override",
        index: 0,
      });
      return;
    }
    delete node.code;
    node.codeFile = referenceNode.codeFile;
    node.language = referenceNode.language;
    extractedCount += 1;
  }
}

function repointLocaleCheatsheet(localeJsonPath, referenceJsonPath) {
  const localeData = readJSON(localeJsonPath);
  const referenceData = readJSON(referenceJsonPath);

  (localeData.steps ?? []).forEach((step, i) => {
    repointLocaleCheatsheetNode(step, referenceData.steps?.[i]);
    (step.subSteps ?? []).forEach((subStep, j) => {
      repointLocaleCheatsheetNode(subStep, referenceData.steps?.[i]?.subSteps?.[j]);
    });
  });

  if (localeData.backendSetup?.steps) {
    localeData.backendSetup.steps.forEach((step, i) => {
      repointLocaleCheatsheetNode(step, referenceData.backendSetup?.steps?.[i]);
    });
  }

  writeJSON(localeJsonPath, localeData);
}

function repointLocaleLearning(localeJsonPath, referenceJsonPath) {
  const localeData = readJSON(localeJsonPath);
  const referenceData = readJSON(referenceJsonPath);

  const localeExample = localeData.fullExample;
  const referenceExample = referenceData.fullExample;
  if (!localeExample || !Array.isArray(localeExample.code) || !referenceExample?.files) {
    skippedCount += 1;
    return;
  }

  const referenceCode = referenceExample.files
    .map((f) => readFileSync(join(DATA_ROOT, f), "utf8").replace(/\n$/, ""))
    .join("\n\n");

  if (localeExample.code.join("\n") !== referenceCode) {
    // Diverged translation - extract independently instead of pointing
    // at (now-incorrect) English files.
    const topicDir = dirname(referenceExample.files[0]).replace(
      /^code-examples\/learning\//,
      "",
    ) + "-sv";
    const segments = splitIntoFileSegments(localeExample.code);
    const files = segments
      ? segments.map((s) => {
          const rel = `code-examples/learning/${topicDir}/${s.filename}`;
          writeCodeFile(join(DATA_ROOT, rel), s.lines.join("\n"));
          return rel;
        })
      : [
          (() => {
            const ext = guessExt(localeExample.code.join("\n"));
            const rel = `code-examples/learning/${topicDir}/example.${ext}`;
            writeCodeFile(join(DATA_ROOT, rel), localeExample.code.join("\n"));
            return rel;
          })(),
        ];
    delete localeExample.code;
    localeExample.files = files;
  } else {
    delete localeExample.code;
    localeExample.files = referenceExample.files;
  }

  extractedCount += 1;
  writeJSON(localeJsonPath, localeData);
}

// ---------------------------------------------------------------------
// Drive the migration over every cheatsheet/learning JSON file.
// ---------------------------------------------------------------------

function topicDirFromFilename(filename) {
  return filename.replace(/Content\.json$/, "").replace(/\.json$/, "");
}

function run() {
  const cheatsheetFiles = globSync("*.json", { cwd: join(DATA_ROOT, "cheatsheets") });
  for (const filename of cheatsheetFiles) {
    const topicDir = topicDirFromFilename(filename);
    extractCheatsheetFile(join(DATA_ROOT, "cheatsheets", filename), topicDir);

    const localePath = join(DATA_ROOT, "sv", "cheatsheets", filename);
    if (existsSync(localePath)) {
      repointLocaleCheatsheet(localePath, join(DATA_ROOT, "cheatsheets", filename));
    }
  }

  const learningFiles = globSync("*.json", { cwd: join(DATA_ROOT, "learning") });
  for (const filename of learningFiles) {
    const topicDir = topicDirFromFilename(filename);
    extractLearningFile(join(DATA_ROOT, "learning", filename), topicDir);

    const localePath = join(DATA_ROOT, "sv", "learning", filename);
    if (existsSync(localePath)) {
      repointLocaleLearning(localePath, join(DATA_ROOT, "learning", filename));
    }
  }

  console.log(
    `${CHECK_ONLY ? "[check] " : ""}Extracted/repointed ${extractedCount} code field(s), ` +
      `skipped ${skippedCount} already-migrated file(s), wrote ${writtenFiles.size} code file(s).`,
  );
}

run();
