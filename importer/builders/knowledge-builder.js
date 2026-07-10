/**
 * ============================================================
 * AI Prompt Studio
 * UKA Knowledge Importer
 * Knowledge Builder
 * ============================================================
 */

import { buildDomains } from "./domain-builder.js";
import { buildCanonicalOutputs } from "./canonical-builder.js";


function buildKnowledge(workbook, profile) {
    return {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),

    domains: buildDomains(workbook, profile),
    canonicalOutputs: buildCanonicalOutputs(workbook, profile)
};
}

export {
    buildKnowledge
};