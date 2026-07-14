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
import {
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getCurrentCreator,
  onAuthStateChange
} from "./auth.js";
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
const creatorNameInput = document.getElementById("creator-name");
const creatorEmailInput = document.getElementById("creator-email");
const creatorPasswordInput = document.getElementById("creator-password");

const signUpButton = document.getElementById("sign-up-button");
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");
const authStatus = document.getElementById("auth-status");
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
document.body.classList.toggle("arabic-ui", language === "ar");
    document.querySelector(".tagline").textContent =
        translations.tagline;

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

signUpButton.addEventListener("click", async () => {
  try {
    authStatus.textContent = "Creating account...";

    await signUpWithEmail(
      creatorEmailInput.value.trim(),
      creatorPasswordInput.value,
      creatorNameInput.value.trim()
    );

    authStatus.textContent = "Account created. Check your email if confirmation is required.";
  } catch (error) {
    authStatus.textContent = error.message;
    console.error(error);
  }
});

signInButton.addEventListener("click", async () => {
  try {
    authStatus.textContent = "Signing in...";

    await signInWithEmail(
      creatorEmailInput.value.trim(),
      creatorPasswordInput.value
    );

    authStatus.textContent = "Signed in.";
  } catch (error) {
    authStatus.textContent = error.message;
    console.error(error);
  }
});

signOutButton.addEventListener("click", async () => {
  try {
    await signOut();
    authStatus.textContent = "Signed out.";
  } catch (error) {
    authStatus.textContent = error.message;
    console.error(error);
  }
});

onAuthStateChange((_event, session) => {
  const isSignedIn = Boolean(session?.user);

  signUpButton.hidden = isSignedIn;
  signInButton.hidden = isSignedIn;
  signOutButton.hidden = !isSignedIn;
});
initializeApp().catch(console.error);
