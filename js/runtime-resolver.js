/*
========================================================

AI Prompt Studio

Author  : Syaima Levantine

File    : runtime-resolver.js

Purpose :
Runtime Knowledge Resolver

Created with ChatGPT

========================================================
*/

"use strict";

import { getRuntime } from "./runtime-loader.js";

/* ==========================================
   Text Normalization
========================================== */

function normalizeText(value) {

    return String(value ?? "")
        .toLowerCase()
        .trim();

}

/* ==========================================
   Canonical Resolution
========================================== */

function resolveCanonical(idea) {

    const runtime = getRuntime();

    if (!runtime) {
        return null;
    }

    const canonicals =
        runtime.registries?.canonicals ?? [];

    const normalizedIdea =
        normalizeText(idea);

    if (!normalizedIdea) {
        return null;
    }

    return canonicals.find((canonical) => {

        const canonicalName =
            normalizeText(canonical.name);

        return (
            canonicalName &&
            normalizedIdea.includes(canonicalName)
        );

    }) ?? null;

}

/* ==========================================
   Domain Resolution
========================================== */

function resolveDomain(canonical) {

    if (!canonical?.parentDomainId) {
        return null;
    }

    const runtime = getRuntime();

    if (!runtime) {
        return null;
    }

    const domains =
        runtime.registries?.domains ?? [];

    return domains.find(
        (domain) =>
            domain.id === canonical.parentDomainId
    ) ?? null;

}

/* ==========================================
   Knowledge Resolution
========================================== */

function resolveRuntimeKnowledge(idea) {

    const canonical =
        resolveCanonical(idea);

    const domain =
        resolveDomain(canonical);

    return {
        canonical,
        domain
    };

}

/* ==========================================
   Public API
========================================== */

export {
    resolveCanonical,
    resolveDomain,
    resolveRuntimeKnowledge
};