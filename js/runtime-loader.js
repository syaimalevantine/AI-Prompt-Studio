/*
========================================================

AI Prompt Studio

Author  : Syaima Levantine

File    : runtime-loader.js

Purpose :
Runtime Loader

Created with ChatGPT

========================================================
*/

"use strict";

/* ==========================================
   Runtime State
========================================== */

let runtimeCache = null;
let runtimeMetadata = null;

/* ==========================================
   Runtime Loader
========================================== */

async function loadRuntime() {

    if (runtimeCache) {
        return runtimeCache;
    }

    const response = await fetch(
        "runtime/core/runtime.json"
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load runtime package."
        );
    }

    const runtime = await response.json();

    runtimeCache = runtime;
    runtimeMetadata = runtime.metadata;

    return runtime;

}

/* ==========================================
   Runtime Access
========================================== */

function getRuntime() {
    return runtimeCache;
}

function getRuntimeMetadata() {
    return runtimeMetadata;
}

function clearRuntimeCache() {

    runtimeCache = null;
    runtimeMetadata = null;

}

/* ==========================================
   Public API
========================================== */

export {
    loadRuntime,
    getRuntime,
    getRuntimeMetadata,
    clearRuntimeCache
};