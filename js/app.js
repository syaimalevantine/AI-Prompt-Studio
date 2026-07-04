/*
========================================================

AI Prompt Studio

Author  : Syaima Levantine

File    : app.js

Purpose :
Application Entry Point

Created with ChatGPT

========================================================
*/

"use strict";

import { buildPrompt } from "./generator.js";
import { promptTemplates } from "./templates.js";

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
   Template Registry
========================================== */

console.log("Available Templates:");

console.log(promptTemplates);

/* ==========================================
   Preview
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
   Clipboard
========================================== */

async function copyPrompt() {

    if (!generatedPrompt) {

        return;

    }

    try {

        await navigator.clipboard.writeText(

            generatedPrompt

        );

        copyButton.textContent = "✓ Copied!";

        setTimeout(() => {

            copyButton.textContent = "Copy Prompt";

        }, 2000);

    }

    catch (error) {

        alert("Unable to copy the prompt.");

    }

}

/* ==========================================
   Events
========================================== */

generateButton.addEventListener(

    "click",

    renderPrompt

);

copyButton.addEventListener(

    "click",

    copyPrompt

);

/* ==========================================
   Initial State
========================================== */

renderEmptyState();