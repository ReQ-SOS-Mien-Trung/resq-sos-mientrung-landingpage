#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const { processGlb } = require("gltf-pipeline");

const ROOT_DIR = process.cwd();
const MODELS_DIR = path.join(ROOT_DIR, "public", "models");
const DRY_RUN = process.argv.includes("--dry-run");

const pipelineOptions = {
  dracoOptions: {
    compressionLevel: 10,
    quantizePositionBits: 14,
    quantizeNormalBits: 10,
    quantizeTexcoordBits: 12,
    quantizeColorBits: 10,
    quantizeGenericBits: 12,
  },
};

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return fullPath;
    }),
  );
  return files.flat();
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function formatPercent(saved, original) {
  if (original === 0) return "0.00%";
  return `${((saved / original) * 100).toFixed(2)}%`;
}

function toWorkspaceRelativePath(filePath) {
  return path.relative(ROOT_DIR, filePath).split(path.sep).join("/");
}

async function main() {
  let files;
  try {
    files = await walkFiles(MODELS_DIR);
  } catch (error) {
    console.error(`Cannot read models directory: ${MODELS_DIR}`);
    console.error(error.message);
    process.exit(1);
  }

  const glbFiles = files.filter((file) => file.toLowerCase().endsWith(".glb"));

  if (glbFiles.length === 0) {
    console.log("No .glb files found in public/models.");
    return;
  }

  const totals = {
    processed: 0,
    optimized: 0,
    skipped: 0,
    failed: 0,
    beforeBytes: 0,
    afterBytes: 0,
  };

  console.log(
    `${DRY_RUN ? "[DRY RUN] " : ""}Compressing ${glbFiles.length} GLB files with Draco...`,
  );

  for (const file of glbFiles) {
    const relativePath = toWorkspaceRelativePath(file);
    try {
      const source = await fs.readFile(file);
      const beforeBytes = source.length;
      const result = await processGlb(source, pipelineOptions);
      const output = result.glb;

      if (!output || output.length === 0) {
        throw new Error("Compression did not produce output.");
      }

      totals.processed += 1;
      totals.beforeBytes += beforeBytes;

      if (output.length < beforeBytes) {
        const saved = beforeBytes - output.length;
        totals.optimized += 1;
        totals.afterBytes += output.length;

        if (!DRY_RUN) {
          await fs.writeFile(file, output);
        }

        console.log(
          `[optimized] ${relativePath} | ${formatBytes(beforeBytes)} -> ${formatBytes(output.length)} | -${formatBytes(saved)} (${formatPercent(saved, beforeBytes)})`,
        );
      } else {
        totals.skipped += 1;
        totals.afterBytes += beforeBytes;
        console.log(`[skipped] ${relativePath} | no size gain`);
      }
    } catch (error) {
      totals.failed += 1;
      console.error(`[failed] ${relativePath} | ${error.message}`);
    }
  }

  const totalSaved = totals.beforeBytes - totals.afterBytes;

  console.log("\nSummary");
  console.log(`Processed: ${totals.processed}`);
  console.log(`Optimized: ${totals.optimized}`);
  console.log(`Skipped: ${totals.skipped}`);
  console.log(`Failed: ${totals.failed}`);
  console.log(`Total: ${formatBytes(totals.beforeBytes)} -> ${formatBytes(totals.afterBytes)}`);
  console.log(`Saved: ${formatBytes(totalSaved)} (${formatPercent(totalSaved, totals.beforeBytes)})`);

  if (totals.failed > 0) {
    process.exitCode = 1;
  }
}

main();