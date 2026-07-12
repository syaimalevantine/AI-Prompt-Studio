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
   Resolution Configuration
========================================== */

const EXACT_IDEA_SCORE = 100;
const EXACT_PHRASE_SCORE = 90;
const FULL_TOKEN_BASE_SCORE = 70;
const MIN_PARTIAL_COVERAGE = 0.6;
const MIN_PARTIAL_MATCHED_TOKENS = 2;
const CONFIDENCE_THRESHOLD = 60;

/* ==========================================
   Text Normalization
========================================== */

function normalizeText(value) {

    return String(value ?? "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim()
        .replace(/\s+/g, " ");

}

function tokenize(value) {

    const normalizedValue =
        normalizeText(value);

    if (!normalizedValue) {
        return [];
    }

    return normalizedValue.split(" ");

}

/* ==========================================
   Canonical Candidate Scoring
========================================== */

function scoreCanonical(
    normalizedIdea,
    ideaTokens,
    canonical
) {

    const canonicalName =
        normalizeText(canonical?.name);

    if (!canonicalName) {
        return null;
    }

    const canonicalTokens =
        tokenize(canonicalName);

    if (!canonicalTokens.length) {
        return null;
    }

    if (normalizedIdea === canonicalName) {

        return {
            canonical,
            score: EXACT_IDEA_SCORE,
            matchType: "exact-idea",
            coverage: 1,
            matchedTokens: canonicalTokens.length,
            specificity: canonicalTokens.length
        };

    }

    const ideaTokenSet =
        new Set(ideaTokens);

    const matchedTokens =
        canonicalTokens.filter(
            (token) => ideaTokenSet.has(token)
        ).length;

    if (canonicalTokens.length === 1) {

        if (matchedTokens !== 1) {
            return null;
        }

        return {
            canonical,
            score: EXACT_PHRASE_SCORE,
            matchType: "exact-single-token",
            coverage: 1,
            matchedTokens: 1,
            specificity: 1
        };

    }

    if (
        normalizedIdea.includes(
            canonicalName
        )
    ) {

        return {
            canonical,
            score: EXACT_PHRASE_SCORE,
            matchType: "exact-phrase",
            coverage: 1,
            matchedTokens: canonicalTokens.length,
            specificity: canonicalTokens.length
        };

    }

    const coverage =
        matchedTokens /
        canonicalTokens.length;

    if (
        matchedTokens <
            MIN_PARTIAL_MATCHED_TOKENS ||
        coverage <
            MIN_PARTIAL_COVERAGE
    ) {
        return null;
    }

    const specificityBonus =
        matchedTokens;

    const score =
        FULL_TOKEN_BASE_SCORE *
        coverage +
        specificityBonus;

    return {
        canonical,
        score,
        matchType:
            coverage === 1
                ? "full-token"
                : "partial-token",
        coverage,
        matchedTokens,
        specificity: canonicalTokens.length
    };

}

/* ==========================================
   Candidate Ranking
========================================== */

function getMatchPriority(matchType) {

    const priorities = {
        "exact-idea": 5,
        "exact-phrase": 4,
        "exact-single-token": 4,
        "full-token": 3,
        "partial-token": 2
    };

    return priorities[matchType] ?? 0;

}

function compareCandidates(a, b) {

    const matchPriorityDifference =
        getMatchPriority(b.matchType) -
        getMatchPriority(a.matchType);

    if (matchPriorityDifference !== 0) {
        return matchPriorityDifference;
    }

    if (b.coverage !== a.coverage) {
        return b.coverage - a.coverage;
    }

    if (
        b.matchedTokens !==
        a.matchedTokens
    ) {
        return (
            b.matchedTokens -
            a.matchedTokens
        );
    }

    if (
        b.specificity !==
        a.specificity
    ) {
        return (
            b.specificity -
            a.specificity
        );
    }

    return String(a.canonical.id)
        .localeCompare(
            String(b.canonical.id)
        );

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

    const ideaTokens =
        tokenize(normalizedIdea);

    const candidates =
        canonicals
            .map((canonical) =>
                scoreCanonical(
                    normalizedIdea,
                    ideaTokens,
                    canonical
                )
            )
            .filter(Boolean)
            .sort(compareCandidates);

    const bestCandidate =
        candidates[0];

    if (
        !bestCandidate ||
        bestCandidate.score <
            CONFIDENCE_THRESHOLD
    ) {
        return null;
    }

    return bestCandidate.canonical;

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
            domain.id ===
            canonical.parentDomainId
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