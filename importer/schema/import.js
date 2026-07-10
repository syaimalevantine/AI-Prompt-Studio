/**
 * ============================================================
 * AI Prompt Studio
 * Knowledge Importer
 *
 * Version : 1.0.0
 * Status  : In Development
 *
 * Pipeline
 * --------
 * UKA Workbook (.xlsx)
 *          ↓
 * Knowledge Importer
 *          ↓
 * knowledge-internal.json
 *          ↓
 * Knowledge Publisher
 *          ↓
 * knowledge-runtime.json
 *
 * ============================================================
 */

import fs from "fs";
import path from "path";
import XLSX from "xlsx";
import { buildKnowledge } from "./builders/knowledge-builder.js";
/*
==============================================================
P0 -- Constants
==============================================================
*/

const IMPORTER_VERSION = "1.0.0";

/*
==============================================================
P1 -- Build Session
==============================================================
*/

function createImportSession(profile) {

    return {
        id: `import-${Date.now()}`,
        version: IMPORTER_VERSION,
        profile,
        startedAt: new Date(),
        finishedAt: null,
        durationMs: 0
    };

}

function finishImportSession(session) {

    session.finishedAt = new Date();

    session.durationMs =
        session.finishedAt.getTime() -
        session.startedAt.getTime();

    return session;

}

/*
==============================================================
P2 -- Configuration
==============================================================
*/

const CONFIG_PATH = path.resolve(
    process.cwd(),
    "importer",
    "import-config.json"
);

const REQUIRED_CONFIGURATION = [
    "importer",
    "source",
    "profile",
    "schema",
    "output",
    "validation",
    "logging"
];

function loadConfiguration() {

    if (!fs.existsSync(CONFIG_PATH)) {

        throw new Error(
            "Importer configuration not found."
        );

    }

    return JSON.parse(
        fs.readFileSync(
            CONFIG_PATH,
            "utf8"
        )
    );

}

function validateConfiguration(configuration) {

    for (const key of REQUIRED_CONFIGURATION) {

        if (!(key in configuration)) {

            throw new Error(
                `Missing configuration: ${key}`
            );

        }

    }

    return true;

}
/*
==============================================================
P3 -- Workbook Profile
==============================================================
*/

function loadWorkbookProfile(configuration) {

    const profilePath = path.resolve(
        process.cwd(),
        configuration.profile.directory,
        configuration.profile.default
    );

    if (!fs.existsSync(profilePath)) {

        throw new Error(
            `Workbook profile not found: ${profilePath}`
        );

    }

    return JSON.parse(
        fs.readFileSync(
            profilePath,
            "utf8"
        )
    );

}

function validateWorkbookProfile(profile) {

    if (!profile.profile) {

        throw new Error(
            "Workbook profile section is missing."
        );

    }

    if (!profile.workbook) {

        throw new Error(
            "Workbook definition is missing."
        );

    }

    if (!profile.sheets) {

        throw new Error(
            "Workbook sheets definition is missing."
        );

    }

    return true;

}

/*
==============================================================
P4 -- Workbook Resolver
==============================================================
*/

function resolveWorkbookPath(configuration) {

    return path.resolve(
        process.cwd(),
        configuration.source.directory,
        configuration.source.workbook
    );

}

function loadWorkbook(workbookPath) {

    if (!fs.existsSync(workbookPath)) {

        throw new Error(
            `Workbook not found: ${workbookPath}`
        );

    }

    return XLSX.readFile(workbookPath);

}
/*
==============================================================
P5 -- Workbook Validation
==============================================================
*/

function validateWorkbookStructure(workbook, profile) {

    const sheetNames = workbook.SheetNames;

    for (const sheetKey of Object.keys(profile.sheets)) {

        const sheetDefinition = profile.sheets[sheetKey];

        if (!sheetNames.includes(sheetDefinition.name)) {

            throw new Error(
                `Worksheet "${sheetDefinition.name}" is missing.`
            );

        }

    }

    return true;

}

function getWorksheet(workbook, sheetName) {

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {

        throw new Error(
            `Worksheet "${sheetName}" not found.`
        );

    }

    return worksheet;

}

function worksheetToObjects(worksheet) {

    return XLSX.utils.sheet_to_json(
        worksheet,
        {
            defval: "",
            raw: false
        }
    );

}

/*
==============================================================
P6 -- Workbook Data Loader
==============================================================
*/

function loadWorkbookData(workbook, profile) {

    const data = {};

    for (const sheetKey of Object.keys(profile.sheets)) {

        const sheetDefinition = profile.sheets[sheetKey];

        const worksheet = getWorksheet(
            workbook,
            sheetDefinition.name
        );

        data[sheetKey] =
            worksheetToObjects(worksheet);

    }

    return data;

}
/*
==============================================================
P7 -- Validation Helpers
==============================================================
*/

function validateRequiredColumns(rows, columns) {

    for (const columnName of Object.values(columns)) {

        if (rows.length === 0) {
            continue;
        }

        if (!(columnName in rows[0])) {

            throw new Error(
                `Required column "${columnName}" is missing.`
            );

        }

    }

    return true;

}

function validateWorkbookData(data, profile) {

    for (const sheetKey of Object.keys(profile.sheets)) {

        const sheetDefinition =
            profile.sheets[sheetKey];

        validateRequiredColumns(
            data[sheetKey],
            sheetDefinition.columns
        );

    }

    return true;

}

/*
==============================================================
P8 -- Import Context
==============================================================
*/

function createImportContext() {

    const configuration =
        loadConfiguration();

    validateConfiguration(configuration);

    const profile =
        loadWorkbookProfile(configuration);

    validateWorkbookProfile(profile);

    const workbookPath =
        resolveWorkbookPath(configuration);

    const workbook =
        loadWorkbook(workbookPath);

    validateWorkbookStructure(
        workbook,
        profile
    );

    const data =
        loadWorkbookData(
            workbook,
            profile
        );

    validateWorkbookData(
        data,
        profile
    );

    return {
        configuration,
        profile,
        workbook,
        workbookPath,
        data
    };

}
/*
==============================================================
P10 -- Knowledge Document
==============================================================
*/

function buildEmptyKnowledgeDocument() {

    return {

        metadata: {},

        profile: {},

        statistics: {},

        knowledge: {
            coreDomains: [],
            masterDomains: [],
            canonicalOutputs: [],
            knowledgeInfrastructure: [],
            libraries: {}
        }

    };

}
/*
==============================================================
P10.2 -- Metadata Builder
==============================================================
*/

function buildMetadata(context) {

    return {

        profile: context.profile.profile.name,

        version: context.profile.profile.version,

        workbook: context.workbookPath,

        importedAt: new Date().toISOString()

    };

}
/*
==============================================================
P10.3 -- Statistics Builder
==============================================================
*/

function buildStatistics(context) {

    return {

        coreDomains:
            context.data.coreDomains.length,

        masterDomains:
            context.data.masterDomains.length,

        canonicalOutputs:
            context.data.canonicalOutputs.length,

        knowledgeInfrastructure:
            context.data.knowledgeInfrastructure.length

    };

}
/*
==============================================================
P10.4 -- Core Domains Builder
==============================================================
*/

function buildCoreDomains(context) {
    return context.data.coreDomains.map(row => ({
        ...row
    }));
}

/*
==============================================================
P10.5 -- Master Domains Builder
==============================================================
*/

function buildMasterDomains(context) {
    return context.data.masterDomains.map(row => ({
        ...row
    }));
}

/*
==============================================================
P10.6 -- Canonical Outputs Builder
==============================================================
*/

function buildCanonicalOutputs(context) {
    return context.data.canonicalOutputs.map(row => ({
        ...row
    }));
}

/*
==============================================================
P10.7 -- Knowledge Infrastructure Builder
==============================================================
*/

function buildKnowledgeInfrastructure(context) {
    return context.data.knowledgeInfrastructure.map(row => ({
        ...row
    }));
}

/*
==============================================================
P10.8 -- Libraries Builder
==============================================================
*/

function buildLibraries(context) {
    return {
        workbook: context.workbookPath,
        profile: context.profile.profile.name
    };
}

/*
==============================================================
P10.8 -- Knowledge Document Builder
==============================================================
*/

function buildKnowledgeDocument(context) {

    const document =
        buildEmptyKnowledgeDocument();

    document.metadata =
        buildMetadata(context);

    document.statistics =
        buildStatistics(context);

    document.profile =
        context.profile;

    document.knowledge.coreDomains =
        buildCoreDomains(context);

    document.knowledge.masterDomains =
        buildMasterDomains(context);

    document.knowledge.canonicalOutputs =
        buildCanonicalOutputs(context);

    document.knowledge.knowledgeInfrastructure =
        buildKnowledgeInfrastructure(context);

    document.knowledge.libraries =
        buildLibraries(context);

    return document;
}
/*
==================================================
P11.1 -- Write Knowledge Document
==================================================
*/

function writeKnowledgeDocument(config, knowledgeDocument) {
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
        config.output.file
    );

    fs.writeFileSync(
        outputPath,
        JSON.stringify(knowledgeDocument, null, 2),
        "utf8"
    );
const fileSize = fs.statSync(outputPath).size;

console.log("");
console.log("Knowledge document written successfully.");
console.log(`Output : ${outputPath}`);
console.log(`Size   : ${fileSize} bytes`);
console.log("");
    return outputPath;
}
function runImport() {

    const context =
        createImportContext();

    const session =
        createImportSession(
            context.profile.profile.name
        );
const knowledgeDocument =
buildKnowledge(
    context.workbook,
    context.profile
);
    const knowledgePath =
    writeKnowledgeDocument(
        context.configuration,
        knowledgeDocument
    );
    console.log("");

    console.log("========================================");
    console.log("AI Prompt Studio Knowledge Importer");
    console.log("========================================");

    console.log(
        `Profile : ${context.profile.profile.name}`
    );

    console.log(
        `Version : ${context.profile.profile.version}`
    );

    console.log(
        `Workbook : ${context.workbookPath}`
    );

    console.log("");

    console.log(
        "Workbook validated successfully."
    );
console.log("");
console.log(
    `Knowledge written to: ${knowledgePath}`
);
    finishImportSession(session);
console.log("");

console.log(
    `Knowledge Document built successfully.`
);

console.log(
    `Core Domains : ${knowledgeDocument.knowledge.coreDomains.length}`
);

console.log(
    `Master Domains : ${knowledgeDocument.knowledge.masterDomains.length}`
);

console.log(
    `Canonical Outputs : ${knowledgeDocument.knowledge.canonicalOutputs.length}`
);

console.log(
    `Knowledge Infrastructure : ${knowledgeDocument.knowledge.knowledgeInfrastructure.length}`
);
    console.log("");

    console.log(
        `Import completed in ${session.durationMs} ms`
    );

    return context;

}

/*
==============================================================
Entry Point
==============================================================
*/

try {

    runImport();

}
catch (error) {

    console.error("");

    console.error(
        "Knowledge Importer failed."
    );

    console.error(error.message);

    process.exit(1);

}
