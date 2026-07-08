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

/* ============================================================
 * P3 - Schema Manager
 * ============================================================
 */

const SCHEMA_DIRECTORY = path.resolve(
  process.cwd(),
  "publisher",
  "schema"
);

/* ============================================================
 * P4 - Source Loader
 * ============================================================
 */

const SOURCE_DIRECTORY = path.resolve(
  process.cwd(),
  "knowledge"
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
 * Load runtime schema.
 */
function loadSchema(config) {

  const schemaPath = path.join(
    SCHEMA_DIRECTORY,
    config.schema.file
  );

  if (!fs.existsSync(schemaPath)) {
    throw new Error(
      `Schema not found: ${config.schema.file}`
    );
  }

  const raw = fs.readFileSync(
    schemaPath,
    "utf8"
  );

  return JSON.parse(raw);

}

/**
 * Validate runtime schema.
 */
function validateSchema(schema) {

  if (!schema) {
    throw new Error("Schema is empty.");
  }

  if (!schema.metadata) {
    throw new Error(
      "Schema metadata section is missing."
    );
  }

  if (!schema.registries) {
    throw new Error(
      "Schema registries section is missing."
    );
  }

  return true;

}
/**
 * Load knowledge source.
 */
function loadSource() {

  if (!fs.existsSync(SOURCE_DIRECTORY)) {
    throw new Error(
      "Knowledge directory not found."
    );
  }

  const entries = fs.readdirSync(
    SOURCE_DIRECTORY,
    {
      withFileTypes: true
    }
  );

  return entries;

}

/**
 * Build empty runtime package.
 */
function buildRuntime(config, profile) {

  return {

    metadata: {
    version: config.publisher.version,
    generatedAt: new Date().toISOString(),
    sourceVersion: config.source.version,
    publishProfile: profile.profile,
    registryVersion: "1.0.0"
},

    registries: {
      intents: [],
      domains: [],
      canonicals: [],
      relationships: []
    }

  };

}

/**
 * Build intent registry.
 */
function buildIntentRegistry(source) {
  const intents = [];

  for (const entry of source) {
    if (!entry.isFile()) {
      continue;
    }

    intents.push({
      file: entry.name
    });
  }

  return intents;
}

/**
 * Build domain registry.
 */
function buildDomainRegistry(source) {
    const domains = [];

    for (const entry of source) {
        if (!entry.isFile()) {
            continue;
        }

        domains.push({
            file: entry.name
        });
    }

    return domains;
}

/**
 * Build canonical registry.
 */
function buildCanonicalRegistry(source) {
    const canonicals = [];

    for (const entry of source) {
        if (!entry.isFile()) {
            continue;
        }

        canonicals.push({
            file: entry.name
        });
    }

    return canonicals;
}

/**
 * Build relationship registry.
 */
function buildRelationshipRegistry(source) {
    const relationships = [];

    for (const entry of source) {
        if (!entry.isFile()) {
            continue;
        }

        relationships.push({
            file: entry.name
        });
    }

    return relationships;
}

/**
 * Write runtime package.
 */
function writeRuntime(config, runtime) {

  const outputDirectory = path.resolve(
    process.cwd(),
    config.output.directory
  );

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, {
      recursive: true
    });
  } 

  const outputPath = path.join(
    outputDirectory,
    config.output.runtimeFile
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(runtime, null, 2),
    "utf8"
  );

  return outputPath;

}

/**
 * Build publish report.
 */
function buildReport(config, profile, source, runtimePath, runtime) {
    return {
        publisher: config.publisher.name,
        version: config.publisher.version,
        profile: profile.profile,
        schema: config.schema.file,
        knowledgeFiles: source.length,
        registries: {
            intents: runtime.registries.intents.length,
            domains: runtime.registries.domains.length,
            canonicals: runtime.registries.canonicals.length,
            relationships: runtime.registries.relationships.length
        },
        runtime: runtimePath,
        status: "SUCCESS"
    };
}

/**
 * Write publish report.
 */
function writeReport(config, report) {
  const outputDirectory = path.resolve(
    process.cwd(),
    config.output.directory
  );

  const outputPath = path.join(
    outputDirectory,
    config.output.reportFile
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(report, null, 2),
    "utf8"
  );

  return outputPath;
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

// --------------------------------------------------------
// P3
// --------------------------------------------------------

const schema = loadSchema(config);

validateSchema(schema);

console.log("✓ Schema loaded successfully.");

// --------------------------------------------------------
// P4
// --------------------------------------------------------

const source = loadSource();

console.log(
  `✓ Knowledge source loaded (${source.length} entries).`
);
// --------------------------------------------------------
// P5
// --------------------------------------------------------

const runtime = buildRuntime(
  config,
  profile
);

console.log(
  "✓ Runtime object created."
);
console.log(
  `✓ Runtime registries initialized (${Object.keys(runtime.registries).length} registries).`
);

runtime.registries.intents =
  buildIntentRegistry(source);

console.log(
  `✓ ${runtime.registries.intents.length} intents indexed.`
);

runtime.registries.domains = buildDomainRegistry(source);

console.log(
    `✓ ${runtime.registries.domains.length} domains indexed.`
);

runtime.registries.canonicals =
    buildCanonicalRegistry(source);

console.log(
    `✓ ${runtime.registries.canonicals.length} canonicals indexed.`
);

runtime.registries.relationships =
    buildRelationshipRegistry(source);

console.log(
    `✓ ${runtime.registries.relationships.length} relationships indexed.`
);
// --------------------------------------------------------
// P6
// --------------------------------------------------------

const runtimePath = writeRuntime(
  config,
  runtime
);

console.log(
  `✓ Runtime written to ${runtimePath}`
);

const report = buildReport(
    config,
    profile,
    source,
    runtimePath,
    runtime
);

console.log("✓ Publish report created.");
console.log(report);
const reportPath = writeReport(
  config,
  report
);

console.log(
  `✓ Report written to ${reportPath}.`
);
  } catch (error) {

    console.error(`✗ ${error.message}`);

    process.exit(1);

  }

}

main();