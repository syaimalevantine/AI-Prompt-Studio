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

import { buildPrompt } from "./generator.js";
import { loadRuntime } from "./runtime-loader.js";

const MAX_CHARACTERS = 500;

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

previewContent.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

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

    updateCharacterCounter();
    
    renderEmptyState();

}

/* ==========================================
   Character Counter
========================================== */

function updateCharacterCounter() {

    if (ideaInput.value.length > MAX_CHARACTERS) {
        ideaInput.value =
            ideaInput.value.slice(0, MAX_CHARACTERS);
    }

    const count = Math.min(
        ideaInput.value.length,
        MAX_CHARACTERS
    );

    characterCounter.textContent =
        `${count} / ${MAX_CHARACTERS} characters`;

}

/* ==========================================
   Initialization
========================================== */

async function initializeApp() {
    try {
        await loadRuntime();
        console.log("Runtime loaded.");
    }
    catch (error) {
        console.error(error);
    }
    updateCharacterCounter();

renderEmptyState();

console.log("AI Prompt Studio initialized.");

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


initializeApp().catch(console.error);
