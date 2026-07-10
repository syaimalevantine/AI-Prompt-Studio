/**
 * ============================================================
 * AI Prompt Studio
 * UKA Knowledge Importer
 * Canonical Builder
 * ============================================================
 */

const XLSX = require("xlsx");

function buildCanonicalOutputs(workbook, profile) {
    const sheetName = profile.sheets.canonicalOutputs.name;

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        throw new Error(`Worksheet "${sheetName}" not found.`);
    }

    const rows = XLSX.utils.sheet_to_json(worksheet);

    return rows.map((row) => ({
        id: row["Canonical ID"],
        parentDomain: row["Parent Domain"],
        canonicalOutput: row["Canonical Output"],
        status: row["Status"],
        parentDomainId: row["Parent Domain ID"],
        notes: row["Notes"]
    }));
}

module.exports = {
    buildCanonicalOutputs
};