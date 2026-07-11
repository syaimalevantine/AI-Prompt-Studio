/**
 * ============================================================
 * AI Prompt Studio
 * UKA Knowledge Importer
 * Cluster Builder
 * ============================================================
 */

import XLSX from "xlsx";

function buildCoreDomains(workbook, profile) {
    const sheetName = profile.sheets.coreDomains.name;

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        throw new Error(`Worksheet "${sheetName}" not found.`);
    }

    const rows = XLSX.utils.sheet_to_json(worksheet);

    return rows.map((row) => ({
        id: row["Cluster ID"],
        name: row["Cluster Name"],
        hubId: row["Hub ID"],
        coreDomainId: row["Core Domain ID"],
        status: row["Status"],
        notes: row["Notes"]
    }));
}

export {
    buildCoreDomains
};