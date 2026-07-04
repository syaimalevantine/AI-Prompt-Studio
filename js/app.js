/*
========================================================
AI Prompt Studio

Version : 0.6.1

Author  : Syaima Levantine

File    : app.js

Purpose :
Application Interaction

Created with ChatGPT
========================================================
*/

"use strict";

/* ==========================================
   DOM Elements
========================================== */

const ideaInput = document.getElementById("idea");
const toneSelect = document.getElementById("tone");
const modelSelect = document.getElementById("model");
const languageSelect = document.getElementById("language");

const generateButton = document.getElementById("generateButton");
const previewContent = document.getElementById("previewContent");

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

}

function renderPrompt() {

    const idea = ideaInput.value.trim();

    if (idea === "") {

        previewContent.className = "empty-state";

        previewContent.innerHTML = `
            <h3>Please write your idea first.</h3>

            <p>
                Describe your idea before generating a prompt.
            </p>
        `;

        return;

    }

    previewContent.className = "generated-content";

    previewContent.innerHTML = `
        <p><strong>Idea</strong></p>
        <p>${idea}</p>

        <hr>

        <p><strong>Tone</strong></p>
        <p>${toneSelect.value}</p>

        <p><strong>AI Model</strong></p>
        <p>${modelSelect.value}</p>

        <p><strong>Language</strong></p>
        <p>${languageSelect.value}</p>
    `;

}

/* ==========================================
   Events
========================================== */

generateButton.addEventListener("click", renderPrompt);

/* ==========================================
   Initial State
========================================== */

renderEmptyState();