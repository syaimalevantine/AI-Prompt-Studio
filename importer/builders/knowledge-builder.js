import { buildCoreDomains } from "./cluster-builder.js";
import { buildDomains } from "./domain-builder.js";
import { buildCanonicalOutputs } from "./canonical-builder.js";

function buildKnowledge(workbook, profile) {
    return {
        version: "2.0.0",
        generatedAt: new Date().toISOString(),

        coreDomains: buildCoreDomains(workbook, profile),
        masterDomains: buildDomains(workbook, profile),
        canonicalOutputs: buildCanonicalOutputs(workbook, profile),

        knowledgeInfrastructure: []
    };
}

export {
    buildKnowledge
};