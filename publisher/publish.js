/**
 * AI Prompt Studio
 * Knowledge Publisher
 *
 * Version : 1.0.0
 * Status  : MVP
 *
 * Purpose:
 * Read Publisher configuration and display
 * the current publishing setup.
 */

import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(
  process.cwd(),
  "publisher",
  "publish-config.json"
);

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("publish-config.json not found.");
  }

  const raw = fs.readFileSync(CONFIG_PATH, "utf8");

  return JSON.parse(raw);
}

function printSummary(config) {
  console.log("=================================");
  console.log(" AI Prompt Studio Publisher");
  console.log("=================================");

  console.log(`Publisher : ${config.publisher.name}`);
  console.log(`Version   : ${config.publisher.version}`);
  console.log(`Profile   : ${config.profile}`);
  console.log(`Schema    : ${config.schema.file}`);
  console.log(`Output    : ${config.output.filename}`);

  console.log("=================================");
}

function main() {
  try {
    const config = loadConfig();

    printSummary(config);

    console.log("Publisher initialized successfully.");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();