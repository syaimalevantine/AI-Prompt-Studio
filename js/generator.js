/*
========================================================

AI Prompt Studio

Author  : Syaima Levantine

File    : generator.js

Purpose :
Runtime Prompt Engine

Created with ChatGPT

========================================================
*/

"use strict";

import { getRuntime } from "./runtime-loader.js";
import {
    resolveRuntimeKnowledge
} from "./runtime-resolver.js";
/* ==========================================
   Runtime
========================================== */

function getActiveRuntime() {

    return getRuntime();

}
const promptTranslations = {
    en: {
        intro: "Your task is to complete the user's request with a high-quality response.",
        role: "ROLE",
        roleText: (tone) => `You are a ${tone} AI assistant.`,
        goal: "GOAL",
        requirements: "REQUIREMENTS",
        requirementItems: [
            "Produce a clear and complete answer.",
            "Use a logical structure.",
            "Make the response easy to understand.",
            "Use accurate and helpful information whenever possible."
        ],
        outputLanguage: "OUTPUT LANGUAGE",
        aiModel: "AI MODEL",
        optimizedFor: (model) => `Optimized for ${model}.`
    },

    id: {
        intro: "Tugas Anda adalah menyelesaikan permintaan pengguna dengan respons berkualitas tinggi.",
        role: "PERAN",
        roleText: (tone) => `Anda adalah asisten AI dengan gaya ${tone}.`,
        goal: "TUJUAN",
        requirements: "PERSYARATAN",
        requirementItems: [
            "Berikan jawaban yang jelas dan lengkap.",
            "Gunakan struktur yang logis.",
            "Buat respons yang mudah dipahami.",
            "Gunakan informasi yang akurat dan bermanfaat bila memungkinkan."
        ],
        outputLanguage: "BAHASA OUTPUT",
        aiModel: "MODEL AI",
        optimizedFor: (model) => `Dioptimalkan untuk ${model}.`
    },

    tr: {
        intro: "Göreviniz, kullanıcının isteğini yüksek kaliteli bir yanıtla tamamlamaktır.",
        role: "ROL",
        roleText: (tone) => `${tone} üslubunda bir yapay zekâ asistanısınız.`,
        goal: "AMAÇ",
        requirements: "GEREKSİNİMLER",
        requirementItems: [
            "Açık ve eksiksiz bir yanıt verin.",
            "Mantıklı bir yapı kullanın.",
            "Yanıtı kolay anlaşılır hale getirin.",
            "Mümkün olduğunda doğru ve yararlı bilgiler kullanın."
        ],
        outputLanguage: "ÇIKTI DİLİ",
        aiModel: "YAPAY ZEKÂ MODELİ",
        optimizedFor: (model) => `${model} için optimize edilmiştir.`
    },

    ar: {
        intro: "مهمتك هي تلبية طلب المستخدم بإجابة عالية الجودة.",
        role: "الدور",
        roleText: (tone) => `أنت مساعد ذكاء اصطناعي بأسلوب ${tone}.`,
        goal: "الهدف",
        requirements: "المتطلبات",
        requirementItems: [
            "قدّم إجابة واضحة وكاملة.",
            "استخدم بنية منطقية.",
            "اجعل الإجابة سهلة الفهم.",
            "استخدم معلومات دقيقة ومفيدة كلما أمكن."
        ],
        outputLanguage: "لغة المخرجات",
        aiModel: "نموذج الذكاء الاصطناعي",
        optimizedFor: (model) => `محسّن للاستخدام مع ${model}.`
    }
};

function getPromptTranslation(language) {
    return promptTranslations[language] || promptTranslations.en;
}
/* ==========================================
   Prompt Sections
========================================== */

function buildRole(data) {
    const translations = getPromptTranslation(data.language);

    return `${translations.role}

${translations.roleText(data.tone)}`;
}

function buildGoal(data) {
    const translations = getPromptTranslation(data.language);

    return `${translations.goal}

${data.idea}`;
}
function buildRequirements(data) {
    const translations = getPromptTranslation(data.language);

    const items = translations.requirementItems
        .map((item) => `- ${item}`)
        .join("\n");

    return `${translations.requirements}

${items}`;
}

function buildOutputLanguage(data) {
    const translations = getPromptTranslation(data.language);

    const languageLabels = {
        ar: "العربية",
        id: "Bahasa Indonesia",
        en: "English",
        tr: "Türkçe"
    };

    const languageLabel =
        languageLabels[data.language] || data.language;

    return `${translations.outputLanguage}

${languageLabel}`;
}

function buildModel(data) {
    const translations =
        getPromptTranslation(data.language);

    return `${translations.aiModel}

${translations.optimizedFor(data.model)}`;
}
function buildKnowledgeContext(knowledge) {

    if (!knowledge?.canonical) {
        return null;
    }

    const lines = [
        "KNOWLEDGE CONTEXT",
        "",
        `Canonical: ${knowledge.canonical.name}`
    ];

    if (knowledge.domain) {
        lines.push(
            `Domain: ${knowledge.domain.name}`
        );
    }

    return lines.join("\n");

}
/* ==========================================
   Prompt Engine
========================================== */

export function buildPrompt(data) {

    const runtime = getActiveRuntime();
    const knowledge =
    resolveRuntimeKnowledge(data.idea);

    const runtimeProfile =
    runtime?.metadata?.publishProfile ?? "unknown";

const runtimeVersion =
    runtime?.metadata?.version ?? "unknown";

console.log(
    `Runtime Profile: ${runtimeProfile}`
);

console.log(
    `Runtime Version: ${runtimeVersion}`
);

    const translations =
    getPromptTranslation(data.language);

const intro = translations.intro;

    const sections = [

    intro,

    buildRole(data),

    buildGoal(data),

    buildKnowledgeContext(knowledge),

    buildRequirements(data),

    buildOutputLanguage(data),

    buildModel(data)

].filter(Boolean);

    return sections.join("\n\n");

}