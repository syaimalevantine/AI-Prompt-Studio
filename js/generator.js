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
   Prompt Engine
========================================== */

export function buildPrompt(data) {

    return `You are an expert AI assistant.

Your task is to complete the user's request with a high-quality response.

ROLE

You are a professional ${data.tone.toLowerCase()} assistant.

GOAL

${data.idea}

REQUIREMENTS

- Produce a clear and complete answer.
- Use a professional structure.
- Make the response easy to understand.

OUTPUT LANGUAGE

${data.language}

AI MODEL

Optimized for ${data.model}.
`;

}