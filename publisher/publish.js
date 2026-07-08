/**
 * ============================================================
 * Knowledge Publisher
 * Capability : P1 Configuration Loader
 * Capability : P2 Profile Loader
 * Version    : 1.1.0
 * Status     : In Development
 * ============================================================
 */

import fs from "fs";
import path from "path";

/* ============================================================
 * P1 - Configuration Loader
 * ============================================================
 */

const CONFIG_PATH = path.resolve(
  process.cwd(),
  "publisher",
  "publish-config.json"
);

const REQUIRED_KEYS = [
  "publisher",
  "source",
  "profile",
  "schema",
  "output",
  "validation"
];

/* ============================================================
 * P2 - Profile Loader
 * ============================================================
 */

const PROFILE_DIRECTORY = path.resolve(
  process.cwd(),
  "publisher",
  "profiles"
);

/**
 * Load publish configuration.
 */
function loadConfig() {

  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("Configuration file not found.");
  }

  const raw = fs.readFileSync(CONFIG_PATH, "utf8");

  return JSON.parse(raw);

}

/**
 * Validate configuration.
 */
function validateConfig(config) {

  for (const key of REQUIRED_KEYS) {

    if (!(key in config)) {
      throw new Error(
        `Missing required configuration: ${key}`
      );
    }

  }

  return true;

}

/**
 * Load publish profile.
 */
function loadProfile(config) {

  const profilePath = path.join(
    PROFILE_DIRECTORY,
    `${config.profile}.json`
  );

  if (!fs.existsSync(profilePath)) {
    throw new Error(
      `Profile not found: ${config.profile}`
    );
  }

  const raw = fs.readFileSync(profilePath, "utf8");

  return JSON.parse(raw);

}

/**
 * Validate publish profile.
 */
function validateProfile(profile) {

  if (!profile.profile) {
    throw new Error(
      "Invalid publish profile."
    );
  }

  return true;

}

/**
 * Print configuration summary.
 */
function printSummary(config) {

  console.log("======================================");
  console.log(" Knowledge Publisher");
  console.log("======================================");

  console.log(`Publisher : ${config.publisher.name}`);
  console.log(`Version   : ${config.publisher.version}`);
  console.log(`Profile   : ${config.profile}`);
  console.log(`Schema    : ${config.schema.file}`);
  console.log(`Runtime   : ${config.output.runtimeFile}`);
console.log(`Report    : ${config.output.reportFile}`);

  console.log("======================================");

}

/**
 * Print profile summary.
 */
function printProfileSummary(profile) {

  console.log("Publish Profile");

  console.log(`Name        : ${profile.profile}`);
  console.log(`Version     : ${profile.version}`);
  console.log(`Description : ${profile.description}`);

  console.log("======================================");

}

/**
 * Entry Point
 */
function main() {

  try {

    // --------------------------------------------------------
    // P1
    // --------------------------------------------------------

    const config = loadConfig();

    validateConfig(config);

    printSummary(config);

    console.log("✓ Configuration loaded successfully.");

    // --------------------------------------------------------
    // P2
    // --------------------------------------------------------

    const profile = loadProfile(config);

    validateProfile(profile);

    printProfileSummary(profile);

    console.log("✓ Profile loaded successfully.");

  } catch (error) {

    console.error(`✗ ${error.message}`);

    process.exit(1);

  }

}

main();