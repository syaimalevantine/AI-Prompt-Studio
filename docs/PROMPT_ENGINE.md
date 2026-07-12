# AI Prompt Studio

## Prompt Engine Specification

**Status:** LOCKED  
**Version:** 2.0  
**Last Updated:** July 2026  
**Current Runtime Scope:** UKA v1.0

—

# Purpose

This document defines the Prompt Engine architecture of AI Prompt Studio.

The Prompt Engine transforms a Creator Idea, application settings, and optional published runtime knowledge into a structured generated prompt.

The Prompt Engine is not the authoritative source of UKA knowledge.

It consumes runtime resolution results produced from the published Knowledge Runtime Package.

—

# Vision

Every generated prompt should help an AI model understand what the creator wants to accomplish as clearly as possible.

The generated prompt should be:

- Clear
- Specific
- Contextual
- Actionable
- Readable by humans
- Understandable by AI models

The Prompt Engine should improve creator input without requiring creators to understand the internal UKA knowledge architecture.

—

# Core Principle

A good prompt is not merely an instruction.

It is structured communication.

The Prompt Engine combines:

```text
Creator Intent Expressed Through the Idea
        +
Application Settings
        +
Optional Published Knowledge Context
        ↓
Structured Generated Prompt
```

The Prompt Engine must distinguish between creator-provided information and runtime-derived knowledge.

It must not fabricate authoritative UKA knowledge.

—

# Active Prompt Generation Flow

For UKA v1.0, the active application flow is:

```text
Creator Idea
        ↓
runtime-resolver.js
        ↓
Runtime Resolution Result
        ↓
generator.js
        ↓
Prompt Construction
        ↓
Generated Prompt
```

The complete knowledge-aware flow is:

```text
UKA Official Master Baseline
        ↓
Knowledge Importer
        ↓
Internal Knowledge Contract
        ↓
Knowledge Publisher
        ↓
Knowledge Runtime Package
        ↓
runtime-loader.js
        ↓
runtime-resolver.js
        ↓
Runtime Resolution Result
        ↓
generator.js
        ↓
Generated Prompt
```

—

# Prompt Engine Inputs

The Prompt Engine may receive the following application inputs:

```text
PromptEngineInput
├── Creator Idea
├── Tone
├── AI Model
├── Output Language
└── Runtime Resolution Result
```

The exact application UI may evolve.

The Prompt Engine must not assume that every optional input is always available.

—

# Creator Idea

The Creator Idea is the primary creator-authored input.

It represents what the creator wants the AI to help accomplish.

Examples may include:

```text
Create a business plan
```

```text
Write a poem about the moon
```

```text
Help me make a plan
```

The Creator Idea is creator input.

It is not automatically authoritative UKA knowledge.

The Prompt Engine must preserve the creator’s intended task while structuring it into a clearer prompt.

—

# Application Settings

Application settings may influence prompt construction.

Current settings may include:

- Tone
- AI Model
- Output Language

These settings are application-level controls.

They are not authoritative UKA knowledge.

The Prompt Engine may use them to adapt the generated prompt structure or instructions.

—

# Runtime Resolution Result

The Prompt Engine may receive a Runtime Resolution Result from `runtime-resolver.js`.

The contract is:

```text
RuntimeResolutionResult
├── canonical
└── domain
```

A resolved result may contain:

```text
canonical → CanonicalRecord
domain    → DomainRecord
```

A valid null result may contain:

```text
canonical → null
domain    → null
```

A null resolution is valid runtime behavior.

Prompt generation must continue when no knowledge resolution is available.

—

# Current UKA v1.0 Knowledge Scope

For UKA v1.0, the active runtime knowledge capability is:

```text
Canonical Outputs
        +
Master Domains
```

The Prompt Engine does not currently consume active authoritative:

- Intent
- Alias
- Relationship
- Structured Context

These are future capabilities.

They must not be fabricated or hardcoded in the Prompt Engine.

—

# Knowledge Context

When runtime resolution succeeds, the Prompt Engine may include runtime-derived knowledge in a dedicated section:

```text
KNOWLEDGE CONTEXT

Canonical: [Resolved Canonical]
Domain: [Resolved Master Domain]
```

Knowledge Context is derived from published runtime knowledge.

It is not created from unsupported assumptions.

—

# Knowledge Context Inclusion Rule

The inclusion rule is conditional.

```text
Runtime Resolution Result
        ↓
Valid Canonical Resolution?
        │
        ├── YES
        │     ↓
        │   Include KNOWLEDGE CONTEXT
        │
        └── NO
              ↓
            Omit KNOWLEDGE CONTEXT
```

When resolution returns:

```text
canonical: null
domain: null
```

the `KNOWLEDGE CONTEXT` section is omitted entirely.

The Prompt Engine must not generate substitute UKA knowledge to fill the missing section.

—

# Creator Context vs Knowledge Context

Creator Context and Knowledge Context are different concepts.

## Creator Context

Creator Context is information explicitly provided by the creator.

Examples:

- Background information
- Audience
- Situation
- Project details
- Goals
- Preferences
- Constraints

Creator Context belongs to the creator’s request.

—

## Knowledge Context

Knowledge Context is derived from officially published UKA runtime knowledge.

For UKA v1.0, it may contain:

- Resolved Canonical
- Resolved Master Domain

Knowledge Context must come from the Runtime Resolution Result.

It must not be invented by the Prompt Engine.

—

## Boundary

```text
Creator-provided information
        ↓
Creator Context

Published runtime resolution
        ↓
Knowledge Context
```

The Prompt Engine may combine both in the final generated prompt, but it must preserve their architectural distinction.

—

# Prompt Construction

The Prompt Engine constructs a structured prompt from available inputs.

The exact final structure may adapt to the task.

A general prompt structure may include:

1. Role
2. Goal
3. Creator Context
4. Knowledge Context, when available
5. Requirements
6. Constraints
7. Output Format
8. Output Language

Not every generated prompt must contain every section.

Sections should be included when they improve clarity and usefulness.

—

# Role

Role defines who or what perspective the AI should adopt when useful.

Example:

```text
You are an experienced UX Designer.
```

Role should support the creator’s task.

The Prompt Engine should not add an unnecessarily specific role when it does not improve the request.

—

# Goal

Goal defines what the AI should accomplish.

Example:

```text
Create a landing page.
```

The goal should remain aligned with the Creator Idea.

The Prompt Engine must not replace the creator’s intended task with an unrelated runtime classification.

—

# Creator Context

Creator Context provides relevant background supplied by the creator.

The more relevant context available, the more precisely the AI model may respond.

The Prompt Engine should preserve useful creator-provided context without treating it as authoritative UKA knowledge.

—

# Knowledge Context

Knowledge Context provides optional governed runtime knowledge.

For UKA v1.0:

```text
Canonical: [Resolved Canonical]
Domain: [Resolved Master Domain]
```

This section exists only when runtime resolution succeeds.

—

# Requirements

Requirements define specific elements that should be included in the output.

Examples:

- Modern style
- Responsive behavior
- Accessibility considerations
- Required sections
- Required information

Requirements should be relevant to the creator’s task.

—

# Constraints

Constraints define boundaries or things that should not happen.

Examples:

- Do not use unnecessary jargon.
- Do not exceed a specified length.
- Do not include unsupported claims.

Constraints should be explicit when they improve output quality.

—

# Output Format

Output Format defines the desired response structure when applicable.

Examples:

- Markdown
- HTML
- JSON
- Plain Text
- Table
- Step-by-step instructions

The Prompt Engine may adapt the requested format to the creator’s needs and application settings.

—

# Output Language

Output Language defines the requested language of the AI response.

Examples:

- English
- Bahasa Indonesia
- Arabic
- Turkish

Output Language is an application setting.

It is separate from UKA knowledge resolution.

—

# AI Model

AI Model selection is an application setting.

The selected model may influence how the Prompt Engine structures instructions when model-specific adaptation is supported.

AI Model selection is not authoritative UKA knowledge.

The Prompt Engine must keep model adaptation separate from Knowledge Resolution.

—

# Tone

Tone is an application setting that may influence the style of the requested output.

Examples may include:

- Professional
- Friendly
- Formal
- Casual

Tone should not be duplicated unnecessarily in the generated prompt.

The Prompt Engine should avoid repeating equivalent tone instructions when the same requirement is already represented elsewhere.

—

# Null Resolution Behavior

A null resolution must not stop prompt generation.

The required behavior is:

```text
Creator Idea
        ↓
Runtime Resolution
        ↓
No sufficiently confident match
        ↓
canonical: null
domain: null
        ↓
No KNOWLEDGE CONTEXT
        ↓
Prompt generation continues
```

This behavior protects against:

- False-positive knowledge matches
- Unsupported knowledge assumptions
- Knowledge coverage gaps
- Fabricated canonical knowledge
- Fabricated domain knowledge

No Knowledge Context is preferable to incorrect Knowledge Context.

—

# Knowledge Resolution Boundary

The Prompt Engine does not perform authoritative knowledge resolution itself.

The boundary is:

```text
runtime-resolver.js
        ↓
Runtime Resolution Result
        ↓
generator.js
```

`runtime-resolver.js` owns:

- Canonical candidate evaluation
- Scoring
- Ranking
- Confidence gating
- Canonical Resolution
- Parent / Master Domain Resolution
- Deterministic null fallback

`generator.js` owns:

- Creator Idea consumption
- Application settings consumption
- Runtime Resolution Result consumption
- Conditional Knowledge Context inclusion
- Prompt construction
- Generated prompt output

The Prompt Engine must preserve this separation of responsibilities.

—

# No Fabricated Knowledge

The Prompt Engine must not fabricate:

- Intent
- Canonical
- Domain
- Alias
- Relationship
- Structured Context

as authoritative UKA knowledge.

If a capability is not published through the Knowledge Runtime Package, it must not be presented as resolved UKA knowledge.

Application logic may structure creator input, but it must not misrepresent application-generated assumptions as UKA knowledge.

—

# Legacy Template Independence

The Prompt Engine architecture does not depend on a legacy static template system.

Prompt generation should be driven by:

```text
Creator Idea
        +
Application Settings
        +
Optional Runtime Knowledge
```

Legacy UI templates may be removed or refactored during Full App Integration & UX.

Removing legacy templates must not remove the Prompt Engine itself.

The Prompt Engine is the prompt construction system.

It is not a collection of static creator-facing templates.

—

# Creator Experience Boundary

Creators should not need to understand:

- UKA registries
- Canonical IDs
- Domain IDs
- Internal taxonomy
- Runtime package structure
- Resolution scoring

These remain internal implementation details.

The creator experience should focus on:

```text
Idea
        +
Useful Controls
        ↓
Generated Prompt
```

The Prompt Engine may use internal runtime intelligence without exposing internal knowledge architecture directly to the creator.

—

# Prompt Quality Principles

Every generated prompt should aim to be:

- Clear
- Specific
- Complete where appropriate
- Contextual
- Actionable
- Easy to understand
- Faithful to the Creator Idea
- Compatible with available application settings
- Enhanced by published knowledge when available
- Functional without Knowledge Context when resolution returns null

—

# Product Principle

The Prompt Engine must preserve the product principle:

> **AI Prompt Studio learns from behavior, not from creators’ work.**

Creator input is used to generate the creator’s prompt.

Creator work must not silently become authoritative UKA knowledge.

Knowledge enrichment must come from governed published knowledge or explicitly designed product systems.

—

# Current Validation Status

The current UKA v1.0 runtime-aware prompt generation flow has been validated through live application testing.

```text
Test 1 — Exact phrase matching
PASS

Test 2 — Reordered full-token matching
PASS

Test 3 — Generic input rejection
PASS

Test 4 — False-positive protection
PASS

Test 5 — Knowledge coverage gap / null fallback
PASS
```

**Result: 5/5 PASS**

These tests confirm that:

- Valid runtime knowledge may reach the Prompt Engine.
- Weak or unsupported matches may return null.
- Prompt generation continues without Knowledge Context.
- Knowledge Context is not forced when runtime confidence is insufficient.

—

# Future Capability Integration

When UKA officially publishes additional knowledge capabilities, the Prompt Engine may consume an expanded Runtime Resolution Result.

Future capabilities may include:

- Intent
- Alias
- Relationship
- Structured Context

The exact future Prompt Engine contract must be defined by the data contract and architecture decisions active at that time.

The Prompt Engine must not pre-implement authoritative knowledge fields before they are officially published.

—

# Architecture Boundaries

## UKA Owns

- Authoritative knowledge
- Master Domains
- Canonical Outputs
- Future knowledge capabilities
- Knowledge governance

## Knowledge Publishing Pipeline Owns

- Knowledge ingestion
- Knowledge normalization
- Runtime transformation
- Runtime validation
- Runtime package generation

## Runtime Consumer Owns

- Runtime loading
- Resolution against published capabilities
- Candidate scoring
- Candidate ranking
- Confidence gating
- Runtime Resolution Result

## Prompt Engine Owns

- Creator Idea consumption
- Application settings consumption
- Runtime Resolution Result consumption
- Conditional Knowledge Context inclusion
- Prompt construction
- Generated prompt structure

—

# Related Documents

- `ARCHITECTURE.md`
- `DATA_CONTRACTS.md`
- `INTENT_ENGINE.md`
- `ADR-0001.md`
- `ADR-0002.md`
- `ADR-0003.md`
- `PRODUCT_DECISIONS.md`

—

# Phase Status

```text
FASE 7 — Runtime Consumer Integration
COMPLETE / LOCKED

FASE 8 — Knowledge Resolution / Intelligence
COMPLETE / LOCKED for UKA v1.0 scope

FASE 9 — Full App Integration & UX
NEXT
```

—

# Final Status

**Status: LOCKED**

For UKA v1.0, the Prompt Engine consumes the Creator Idea, application settings, and an optional Runtime Resolution Result.

The active runtime knowledge scope uses published **Canonical Outputs and Master Domains**.

`KNOWLEDGE CONTEXT` is included only when runtime resolution succeeds.

A deterministic null resolution does not stop prompt generation.

The Prompt Engine must not fabricate or hardcode unpublished UKA knowledge.

The Prompt Engine architecture does not depend on the legacy static template system.

Future knowledge capabilities may be integrated only when officially published through the governed UKA knowledge pipeline and Knowledge Runtime Package.

The current runtime-aware prompt generation flow has passed 5/5 live application tests.