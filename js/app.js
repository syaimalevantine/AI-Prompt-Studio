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

/* ==========================================
   Constants
========================================== */

const MAX_CHARACTERS = 500;

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

const clearButton = document.getElementById("clearButton");

const previewContent = document.getElementById("previewContent");

const characterCounter =
    document.getElementById("characterCounter");

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

        <h3>

            Every great prompt begins with an idea.

        </h3>

        <p>

            Your generated prompt will appear here after you press Generate.

        </p>

    `;

    generatedPrompt = "";

    copyButton.disabled = true;

    clearButton.disabled = true;

}

/* ==========================================
   Generate Prompt
========================================== */

function renderPrompt() {

    const idea = ideaInput.value.trim();

    if (!idea) {

        previewContent.className = "empty-state";

        previewContent.innerHTML = `

            <h3>

                Please write your idea first.

            </h3>

            <p>

                Describe your idea before generating a prompt.

            </p>

        `;

        generatedPrompt = "";

        copyButton.disabled = true;

        clearButton.disabled = true;

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

    clearButton.disabled = false;

}

/* ==========================================
   Copy Prompt
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
   Clear Workspace
========================================== */

function clearWorkspace() {

    ideaInput.value = "";

    toneSelect.selectedIndex = 0;

    modelSelect.selectedIndex = 0;

    languageSelect.selectedIndex = 0;

    updateCharacterCounter();
    
    renderEmptyState();

}

/* ==========================================
   Character Counter
========================================== */

function updateCharacterCounter() {

    const count = ideaInput.value.length;

    characterCounter.textContent =
        `${count} / ${MAX_CHARACTERS} characters`;

}

/* ==========================================
   Initialization
========================================== */

function initializeApp() {

    generateButton.addEventListener(
        "click",
        renderPrompt
    );

    copyButton.addEventListener(
        "click",
        copyPrompt
    );

    clearButton.addEventListener(
        "click",
        clearWorkspace
    );
    
    ideaInput.addEventListener(

    "input",

    updateCharacterCounter

);

    renderEmptyState();

}


updateCharacterCounter();
initializeApp();