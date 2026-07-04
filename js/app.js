/*
========================================================
AI Prompt Studio

Version : 0.7.1

Author  : Syaima Levantine

File    : app.js

Purpose :
Application Entry Point

Created with ChatGPT
========================================================
*/

"use strict";

import { buildPrompt } from "./generator.js";

/* ==========================================
   DOM Elements
========================================== */

const ideaInput = document.getElementById("idea");
const toneSelect = document.getElementById("tone");
const modelSelect = document.getElementById("model");
const languageSelect = document.getElementById("language");

const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const previewContent = document.getElementById("previewContent");

/* ==========================================
   Application State
========================================== */

let generatedPrompt = "";

/* ==========================================
   Preview Renderer
========================================== */

function renderEmptyState() {

    previewContent.className = "empty-state";

    previewContent.innerHTML = `
        <h3>Every great prompt begins with an idea.</h3>

        <p>
            Your generated prompt will appear here after you press Generate.
        </p>
    `;

    generatedPrompt = "";

    copyButton.disabled = true;

}

function renderPrompt() {

    const idea = ideaInput.value.trim();

    if (!idea) {

        previewContent.className = "empty-state";

        previewContent.innerHTML = `
            <h3>Please write your idea first.</h3>

            <p>
                Describe your idea before generating a prompt.
            </p>
        `;

        generatedPrompt = "";

        copyButton.disabled = true;

        return;

    }

    generatedPrompt = buildPrompt({

        idea,

        tone: toneSelect.value,

        model: modelSelect.value,

        language: languageSelect.value

    });

    previewContent.className = "generated-content";

    previewContent.innerHTML = `
        <pre>${generatedPrompt}</pre>
    `;

    copyButton.disabled = false;

}

/* ==========================================
   Events
========================================== */

generateButton.addEventListener(

    "click",

    renderPrompt

);

/* ==========================================
   Initial State
========================================== */

renderEmptyState();