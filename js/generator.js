/*
========================================================

AI Prompt Studio

Author  : Syaima Levantine

File    : generator.js

Purpose :
Runtime Prompt Engine

Created with ChatGPT

========================================================
*/

"use strict";

import { getRuntime } from "./runtime-loader.js";
import {
    resolveRuntimeKnowledge
} from "./runtime-resolver.js";
/* ==========================================
   Runtime
========================================== */

function getActiveRuntime() {

    return getRuntime();

}

/* ==========================================
   Prompt Sections
========================================== */

function buildRole(data) {

    return `ROLE

You are a ${data.tone} AI assistant.`;

}

function buildGoal(data) {

    return `GOAL

${data.idea}`;

}

function buildRequirements() {

    return `REQUIREMENTS

- Produce a clear and complete answer.
- Use a logical structure.
- Make the response easy to understand.
- Use accurate and helpful information whenever possible.`;

}

function buildOutputLanguage(data) {

    return `OUTPUT LANGUAGE

${data.language}`;

}

function buildModel(data) {

    return `AI MODEL

Optimized for ${data.model}.`;

}
function buildKnowledgeContext(knowledge) {

    if (!knowledge?.canonical) {
        return null;
    }

    const lines = [
        "KNOWLEDGE CONTEXT",
        "",
        `Canonical: ${knowledge.canonical.name}`
    ];

    if (knowledge.domain) {
        lines.push(
            `Domain: ${knowledge.domain.name}`
        );
    }

    return lines.join("\n");

}
/* ==========================================
   Prompt Engine
========================================== */

export function buildPrompt(data) {

    const runtime = getActiveRuntime();
    const knowledge =
    resolveRuntimeKnowledge(data.idea);

    const runtimeProfile =
    runtime?.metadata?.publishProfile ?? "unknown";

const runtimeVersion =
    runtime?.metadata?.version ?? "unknown";

console.log(
    `Runtime Profile: ${runtimeProfile}`
);

console.log(
    `Runtime Version: ${runtimeVersion}`
);

    const intro = `You are an expert AI assistant.

Your task is to complete the user's request with a high-quality response.`;

    const sections = [

    intro,

    buildRole(data),

    buildGoal(data),

    buildKnowledgeContext(knowledge),

    buildRequirements(),

    buildOutputLanguage(data),

    buildModel(data)

].filter(Boolean);

    return sections.join("\n\n");

}