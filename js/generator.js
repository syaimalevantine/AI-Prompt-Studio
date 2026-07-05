/*
========================================================

AI Prompt Studio

Author  : Syaima Levantine

File    : generator.js

Purpose :
Prompt Engine

Created with ChatGPT

========================================================
*/

"use strict";

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

/* ==========================================
   Prompt Engine
========================================== */

export function buildPrompt(data) {

    const intro = `You are an expert AI assistant.

Your task is to complete the user's request with a high-quality response.`;

    const sections = [

        intro,

        buildRole(data),

        buildGoal(data),

        buildRequirements(),

        buildOutputLanguage(data),

        buildModel(data)

    ];

    return sections.join("\n\n");

}