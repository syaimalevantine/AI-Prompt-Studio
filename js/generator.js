/*
========================================================
AI Prompt Studio

Version : 0.7.0

Author  : Syaima Levantine

File    : generator.js

Purpose :
Generate Prompt Content

Created with ChatGPT
========================================================
*/

"use strict";

/* ==========================================
   Prompt Generator
========================================== */

export function buildPrompt(data) {

    return `
Idea

${data.idea}

--------------------------------

Tone
${data.tone}

AI Model
${data.model}

Language
${data.language}
`;

}