/*
========================================================
AI Prompt Studio

Version : 0.6.0

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
const previewPanel = document.getElementById("previewPanel");

/* ==========================================
   Generate Preview
========================================== */

function generatePrompt() {

    const idea = ideaInput.value.trim();

    if (idea === "") {

        previewPanel.innerHTML = `
            <h2>Generated Prompt</h2>

            <div class="empty-state">

                <h3>Please write your idea first.</h3>

                <p>
                    Your generated prompt will appear here after you describe your idea.
                </p>

            </div>
        `;

        return;
    }

    previewPanel.innerHTML = `
        <h2>Generated Prompt</h2>

        <div class="generated-content">

            <p><strong>Idea</strong></p>
            <p>${idea}</p>

            <hr>

            <p><strong>Tone</strong></p>
            <p>${toneSelect.value}</p>

            <p><strong>AI Model</strong></p>
            <p>${modelSelect.value}</p>

            <p><strong>Language</strong></p>
            <p>${languageSelect.value}</p>

        </div>
    `;

}

/* ==========================================
   Events
========================================== */

generateButton.addEventListener("click", generatePrompt);