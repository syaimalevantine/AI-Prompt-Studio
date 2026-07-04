/*
========================================================
AI Prompt Studio
Version : 1.0.0

Author : Syaima Levantine

File : app.js
Purpose : Main Application

Created with ChatGPT
========================================================
*/

"use strict";

/* ==========================================
   Import Modules
========================================== */

import { initializeEditor } from "../components/editor.js";
import { initializePreview } from "../components/preview.js";

/* ==========================================
   Application
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeEditor();

    initializePreview();

    console.log("AI Prompt Studio initialized.");

});