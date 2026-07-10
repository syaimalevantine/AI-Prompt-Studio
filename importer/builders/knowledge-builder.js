/**
 * ============================================================
 * AI Prompt Studio
 * UKA Knowledge Importer
 * Knowledge Builder
 * ============================================================
 */

const { buildDomains } = require("./domain-builder");
const { buildCanonicalOutputs } = require("./canonical-builder");
const { buildClusters } = require("./cluster-builder");

function buildKnowledge(workbook, profile) {
    return {
        version: "1.0.0",
        generatedAt: new Date().toISOString(),

        domains: buildDomains(workbook, profile),
        canonicalOutputs: buildCanonicalOutputs(workbook, profile),
        clusters: buildClusters(workbook, profile)
    };
}

module.exports = {
    buildKnowledge
};