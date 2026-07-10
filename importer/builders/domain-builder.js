/**
 * ============================================================
 * AI Prompt Studio
 * UKA Knowledge Importer
 * Domain Builder
 * ============================================================
 */

const XLSX = require("xlsx");

function buildDomains(workbook, profile) {
    const sheetName = profile.sheets.masterDomains.name;

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        throw new Error(`Worksheet "${sheetName}" not found.`);
    }

    const rows = XLSX.utils.sheet_to_json(worksheet);

    return rows.map((row) => ({
        id: row["Domain ID"],
        name: row["Domain Name"],
        status: row["Status"]
    }));
}

module.exports = {
    buildDomains
};