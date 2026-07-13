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
const uiLanguageSelect =
    document.getElementById("uiLanguage");
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
const supportedUiLanguages = ["ar", "id", "tr", "en"];

const browserLanguage =
    (navigator.language || "en")
        .toLowerCase()
        .split("-")[0];

const initialUiLanguage =
    supportedUiLanguages.includes(browserLanguage)
        ? browserLanguage
        : "en";

uiLanguageSelect.value = initialUiLanguage;

document.documentElement.lang = initialUiLanguage;

const uiTranslations = {
    en: {
        tagline: "Type Ideas into Perfect Prompts",
        interfaceLanguage: "Interface Language",
        promptCanvas: "Prompt Canvas",
        sectionDescription:
            "Transform your ideas into clear and effective AI prompts.",
        yourIdea: "Your Idea",
        ideaPlaceholder: "Describe your idea here...",
        characters: "characters",
        tone: "Tone",
        targetAI: "Target AI",
        outputLanguage: "Output Language",
        generatePrompt: "Generate Prompt",
        generatedPrompt: "Generated Prompt",
        emptyTitle: "Every great prompt begins with an idea.",
        emptyDescription:
            "Your generated prompt will appear here after you press Generate.",
        copyPrompt: "Copy Prompt",
        clear: "Clear"
    },

    id: {
        tagline: "Ubah Ide menjadi Prompt yang Sempurna",
        interfaceLanguage: "Bahasa Antarmuka",
        promptCanvas: "Kanvas Prompt",
        sectionDescription:
            "Ubah ide Anda menjadi prompt AI yang jelas dan efektif.",
        yourIdea: "Ide Anda",
        ideaPlaceholder: "Jelaskan ide Anda di sini...",
        characters: "karakter",
        tone: "Nada",
        targetAI: "Target AI",
        outputLanguage: "Bahasa Output",
        generatePrompt: "Buat Prompt",
        generatedPrompt: "Prompt yang Dihasilkan",
        emptyTitle: "Setiap prompt hebat dimulai dengan sebuah ide.",
        emptyDescription:
            "Prompt yang dihasilkan akan muncul di sini setelah Anda menekan Buat Prompt.",
        copyPrompt: "Salin Prompt",
        clear: "Hapus"
    },

    tr: {
        tagline: "Fikirleri Mükemmel Promptlara Dönüştürün",
        interfaceLanguage: "Arayüz Dili",
        promptCanvas: "Prompt Tuvali",
        sectionDescription:
            "Fikirlerinizi açık ve etkili AI promptlarına dönüştürün.",
        yourIdea: "Fikriniz",
        ideaPlaceholder: "Fikrinizi buraya açıklayın...",
        characters: "karakter",
        tone: "Ton",
        targetAI: "Hedef AI",
        outputLanguage: "Çıktı Dili",
        generatePrompt: "Prompt Oluştur",
        generatedPrompt: "Oluşturulan Prompt",
        emptyTitle: "Her harika prompt bir fikirle başlar.",
        emptyDescription:
            "Oluşturulan prompt, Prompt Oluştur düğmesine bastıktan sonra burada görünecektir.",
        copyPrompt: "Promptu Kopyala",
        clear: "Temizle"
    },

    ar: {
        tagline: "حوّل الأفكار إلى مطالبات مثالية",
        interfaceLanguage: "لغة الواجهة",
        promptCanvas: "لوحة المطالبة",
        sectionDescription:
            "حوّل أفكارك إلى مطالبات ذكاء اصطناعي واضحة وفعالة.",
        yourIdea: "فكرتك",
        ideaPlaceholder: "اشرح فكرتك هنا...",
        characters: "حرف",
        tone: "النبرة",
        targetAI: "الذكاء الاصطناعي المستهدف",
        outputLanguage: "لغة المخرجات",
        generatePrompt: "إنشاء المطالبة",
        generatedPrompt: "المطالبة المُنشأة",
        emptyTitle: "كل مطالبة رائعة تبدأ بفكرة.",
        emptyDescription:
            "ستظهر المطالبة التي تم إنشاؤها هنا بعد الضغط على إنشاء المطالبة.",
        copyPrompt: "نسخ المطالبة",
        clear: "مسح"
    }
};
function applyUiLanguage(language) {
    const translations =
        uiTranslations[language] || uiTranslations.en;

    document.documentElement.lang = language;

    document.querySelector(".tagline").textContent =
        translations.tagline;

    document.querySelector(
        'label[for="uiLanguage"]'
    ).textContent = translations.interfaceLanguage;

    document.querySelector(
        ".prompt-canvas h2"
    ).textContent = translations.promptCanvas;

    document.querySelector(
        ".section-description"
    ).textContent = translations.sectionDescription;

    document.querySelector(
        'label[for="idea"]'
    ).textContent = translations.yourIdea;

    ideaInput.placeholder =
        translations.ideaPlaceholder;

    document.querySelector(
        'label[for="tone"]'
    ).textContent = translations.tone;

    document.querySelector(
        'label[for="model"]'
    ).textContent = translations.targetAI;

    document.querySelector(
        'label[for="language"]'
    ).textContent = translations.outputLanguage;

    generateButton.textContent =
        translations.generatePrompt;

    document.querySelector(
        ".generated-prompt h2"
    ).textContent = translations.generatedPrompt;

    copyButton.textContent =
        translations.copyPrompt;

    clearButton.textContent =
        translations.clear;

    renderEmptyState();
}

uiLanguageSelect.addEventListener("change", () => {
    applyUiLanguage(uiLanguageSelect.value);
});
/* ==========================================
   Preview
========================================== */

function renderEmptyState() {
    const language =
        uiLanguageSelect.value || initialUiLanguage;

    const translations =
        uiTranslations[language] || uiTranslations.en;

    previewContent.className = "empty-state";

    previewContent.innerHTML = `
        <h3>
            ${translations.emptyTitle}
        </h3>

        <p>
            ${translations.emptyDescription}
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

    const outputDirection =
    languageSelect.value === "ar" ? "rtl" : "ltr";

previewContent.className = "generated-content";
previewContent.dir = outputDirection;

previewContent.innerHTML = `
    <pre dir="${outputDirection}">${generatedPrompt}</pre>
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

applyUiLanguage(initialUiLanguage);

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

}


initializeApp().catch(console.error);
