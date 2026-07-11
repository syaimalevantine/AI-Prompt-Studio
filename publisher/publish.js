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

/*
==================================================
* P0 - Build Session
==================================================
*/

const PUBLISHER_VERSION = "1.1.0";

function createBuildSession(profile) {
    return {
        id: `build-${Date.now()}`,
        version: PUBLISHER_VERSION,
        profile,
        startedAt: new Date(),
        finishedAt: null,
        durationMs: 0
    };
}

function finishBuildSession(session) {
    session.finishedAt = new Date();
    session.durationMs =
        session.finishedAt.getTime() -
        session.startedAt.getTime();

    return session;
}
/*
========================================================
* P18.2 – Build Statistics
========================================================
*/

function buildStatistics(runtime, source, session) {
    return {
        sourceFiles: 1,
        intents: runtime.registries.intents.length,
        domains: runtime.registries.domains.length,
        canonicals: runtime.registries.canonicals.length,
        relationships: runtime.registries.relationships.length,
        durationMs: session.durationMs
    };
}

function printStatistics(statistics) {
    console.log("");
    console.log("========== BUILD STATISTICS ==========");

    console.log(`Source Files : ${statistics.sourceFiles}`);
    console.log(`Intents      : ${statistics.intents}`);
    console.log(`Domains      : ${statistics.domains}`);
    console.log(`Canonicals   : ${statistics.canonicals}`);
    console.log(`Relationships: ${statistics.relationships}`);
    console.log(`Duration     : ${statistics.durationMs} ms`);

    console.log("======================================");
    console.log("");
}
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

  if (!schema.properties?.metadata) {
    throw new Error(
      "Schema metadata section is missing."
    );
  }

  if (!schema.properties?.registries) {
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

    const knowledgePath = path.join(
        SOURCE_DIRECTORY,
        "knowledge.json"
    );

    if (!fs.existsSync(knowledgePath)) {
        throw new Error(
            "Knowledge document not found."
        );
    }

    const source = JSON.parse(
        fs.readFileSync(
            knowledgePath,
            "utf8"
        )
    );

    return source;
}

/**
 * Build empty runtime package.
 */
function buildRuntime(config, profile, source) {

  return {

    metadata: {
    version: config.publisher.version,
    generatedAt: new Date().toISOString(),
    sourceVersion: source.metadata?.version,
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
    return source.knowledge?.intents ?? [];
}

/**
 * Build domain registry.
 */
function buildDomainRegistry(source) {
    const domains =
        source.knowledge?.masterDomains ?? [];

    return domains.map((domain) => ({
        id: domain["Domain ID"],
        name: domain["Domain Name"]
    }));
}

/**
 * Build canonical registry.
 */
function buildCanonicalRegistry(source) {
    const canonicals =
        source.knowledge?.canonicalOutputs ?? [];

      return canonicals.map((canonical) => ({
    id:
      canonical.id ||
      canonical["Canonical ID"],
    name:
      canonical.canonicalOutput ||
      canonical["Canonical Output"] ||
      canonical["Canonical Name"],
    parentDomainId:
      canonical.parentDomainId ||
      canonical["Parent Domain ID"]
  }));
}

/**
 * Build relationship registry.
 */
function buildRelationshipRegistry(source) {
    return source.knowledge?.relationships ?? [];
}

/**
 * Validate runtime package.
 */
function validateRuntime(runtime) {

  if (!runtime.metadata) {
    throw new Error(
      "Runtime metadata is missing."
    );
  }

  if (!runtime.registries) {
    throw new Error(
      "Runtime registries are missing."
    );
  }

  const registryNames = [
    "intents",
    "domains",
    "canonicals",
    "relationships"
  ];

  for (const name of registryNames) {

    if (!Array.isArray(runtime.registries[name])) {
      throw new Error(
        `Invalid registry: ${name}`
      );
    }

  }
const domainIds = new Set();

for (const domain of runtime.registries.domains) {
  if (!domain.id || !domain.name) {
    throw new Error(
      "Invalid domain registry entry: id and name are required."
    );
  }

  if (domainIds.has(domain.id)) {
    throw new Error(
      `Duplicate domain registry ID: ${domain.id}`
    );
  }

  domainIds.add(domain.id);
}
  const canonicalIds = new Set();

  for (const canonical of runtime.registries.canonicals) {
    if (!canonical.id || !canonical.name) {
      throw new Error(
        "Invalid canonical registry entry: id and name are required."
      );
    }

    if (canonicalIds.has(canonical.id)) {
      throw new Error(
        `Duplicate canonical registry ID: ${canonical.id}`
      );
    }

    canonicalIds.add(canonical.id);
  }
    for (const canonical of runtime.registries.canonicals) {
    if (
        canonical.parentDomainId &&
        !domainIds.has(canonical.parentDomainId)
    ) {
        throw new Error(
            `Canonical ${canonical.id} references unknown domain: ${canonical.parentDomainId}`
        );
    }
}
    const runtimeEntityIds = new Set([
  ...runtime.registries.intents.map((intent) => intent.id),
  ...runtime.registries.domains.map((domain) => domain.id),
  ...runtime.registries.canonicals.map((canonical) => canonical.id)
]);
    for (const relationship of runtime.registries.relationships) {
  if (
    !relationship.type ||
    !relationship.source ||
    !relationship.target
  ) {
    throw new Error(
      "Invalid relationship registry entry: type, source, and target are required."
    );
  }
    if (!runtimeEntityIds.has(relationship.source)) {
    throw new Error(
      `Relationship references unknown source: ${relationship.source}`
    );
  }

  if (!runtimeEntityIds.has(relationship.target)) {
    throw new Error(
      `Relationship references unknown target: ${relationship.target}`
    );
  }
}

  return true;

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
function buildReport(
    config,
    profile,
    source,
    runtimePath,
    runtime,
    session
) {
    return {
        publisher: config.publisher.name,
        version: config.publisher.version,
        profile: profile.profile,
        schema: config.schema.file,
        knowledgeFiles: 1,
        registries: {
            intents: runtime.registries.intents.length,
            domains: runtime.registries.domains.length,
            canonicals: runtime.registries.canonicals.length,
            relationships: runtime.registries.relationships.length
        },
        
        registryCount:
    runtime.registries.intents.length +
    runtime.registries.domains.length +
    runtime.registries.canonicals.length +
    runtime.registries.relationships.length,
        runtime: runtimePath,
        generatedAt: new Date().toISOString(),
        statistics: buildStatistics(
    runtime,
    source,
    session
),
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
const session = createBuildSession(profile);

console.log("✓ Build session started.");
console.log(`Session ID : ${session.id}`);
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
  "✓ Locked knowledge document loaded."
);
// --------------------------------------------------------
// P5
// --------------------------------------------------------

const runtime = buildRuntime(
  config,
  profile,
  source
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
validateRuntime(runtime);

console.log(
  "✓ Runtime validated successfully."
);
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
    runtime,
    session
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

finishBuildSession(session);
const statistics = buildStatistics(
    runtime,
    source,
    session
);

printStatistics(statistics);
console.log("✓ Build session finished.");
console.log(`Duration : ${session.durationMs} ms`);
  } catch (error) {

    console.error(`✗ ${error.message}`);

    process.exit(1);

  }

}

main();