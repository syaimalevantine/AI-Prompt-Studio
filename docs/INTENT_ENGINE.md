# AI Prompt Studio

## INTENT_ENGINE.md

**Status:** LOCKED  
**Version:** 3.0  
**Last Updated:** July 2026  
**Current Runtime Scope:** UKA v1.0

—

# Purpose

This document defines the role and lifecycle of Intent capability within the AI Prompt Studio knowledge architecture.

Intent remains an important long-term knowledge capability.

However, Intent is not an active runtime resolution capability for UKA v1.0.

For the current UKA v1.0 runtime scope, AI Prompt Studio performs Knowledge Resolution using published:

```text
Canonical Outputs
        +
Master Domains
```

Intent Resolution may be introduced only when Intent knowledge is officially published by UKA through the governed knowledge pipeline and Knowledge Runtime Package.

—

# Philosophy

Creators do not think in internal implementation categories.

Creators think about what they want to accomplish.

AI Prompt Studio should provide a creator-first experience while keeping internal knowledge structures hidden from the creator interface.

The long-term architecture may use governed Intent knowledge to help bridge creator ideas and structured runtime knowledge.

However, creator-first product philosophy does not authorize the application to fabricate an Intent knowledge layer.

Intent becomes an active knowledge capability only when it is officially authored, governed, published, and available through UKA.

—

# Current Status

For UKA v1.0:

```text
Intent Capability
FUTURE / NOT ACTIVE FOR RUNTIME RESOLUTION
```

The current active runtime resolution capability is:

```text
Creator Idea
        ↓
Canonical Resolution
        ↓
Parent / Master Domain Resolution
        ↓
Knowledge Context
        ↓
Prompt Generator
        ↓
Generated Prompt
```

The application must not simulate Intent Resolution through:

- Hardcoded intent lists
- Hidden application categories presented as intents
- Invented intent mappings
- Unpublished aliases
- Unpublished relationships
- Unpublished structured context
- External semantic assumptions presented as UKA knowledge

—

# Knowledge Source

AI Prompt Studio consumes a published **Knowledge Runtime Package**.

The governed knowledge flow is:

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
AI Prompt Studio
```

AI Prompt Studio never reads the UKA workbook directly.

AI Prompt Studio consumes only knowledge capabilities officially published through the Knowledge Runtime Package.

—

# Current UKA v1.0 Runtime Scope

For UKA v1.0, active Knowledge Resolution uses:

- Canonical Outputs
- Master Domains

The current resolution flow is:

```text
Creator Idea
        ↓
runtime-resolver.js
        ↓
Canonical Candidate Evaluation
        ↓
Scoring
        ↓
Ranking
        ↓
Confidence Gating
        ↓
Canonical Resolution
        ↓
Parent / Master Domain Resolution
        ↓
Runtime Resolution Result
        ↓
generator.js
        ↓
Generated Prompt
```

When no candidate satisfies the active confidence rules:

```text
canonical: null
domain: null
```

This is valid runtime behavior.

The application must not create an Intent classification to force a resolution.

—

# Current Runtime Registries

The Knowledge Runtime Package is designed as a forward-compatible runtime contract.

Its registry structure may include:

```text
registries
├── intents
├── domains
├── canonicals
└── relationships
```

The existence of a registry in the runtime contract does not mean that the registry currently contains an active published dataset.

For UKA v1.0:

```text
Domain Registry
ACTIVE

Canonical Registry
ACTIVE

Intent Registry
FUTURE / NOT ACTIVE FOR RESOLUTION

Relationship Registry
FUTURE / NOT ACTIVE FOR RESOLUTION
```

Alias and Structured Context are also future knowledge capabilities and are not active runtime resolution capabilities for UKA v1.0.

—

# Intent Definition

An Intent represents what a creator wants to accomplish.

Conceptual examples may include:

- Research
- Presentation
- Business Plan
- Lesson Plan
- Marketing Campaign
- Product Strategy

These examples describe the concept of Intent.

They do not constitute an active authoritative Intent Registry.

They must not be treated as UKA runtime knowledge unless officially authored and published by UKA.

Intent is not equivalent to an internal UI category.

—

# Current Resolution Behavior

The current resolver does not perform Intent Detection.

It performs deterministic resolution against published canonical knowledge.

The active resolution signals include:

```text
Creator Idea
        ↓
Text Normalization
        ↓
Exact Canonical Phrase Match
        ↓
Canonical Token Matching
        ↓
Match Quality Evaluation
        ↓
Candidate Ranking
        ↓
Confidence Gate
        ↓
Best Canonical Match
        ↓
Parent / Master Domain Resolution
```

The resolver may return `null`.

No Knowledge Context is preferable to incorrect or fabricated Knowledge Context.

—

# Current Resolver Principles

The UKA v1.0 runtime resolver follows these principles:

- Resolution uses only published runtime knowledge.
- Canonical candidates are evaluated deterministically.
- Candidates are scored.
- Candidates are ranked.
- Confidence gating protects against weak matches.
- Generic input must not force a canonical match.
- Unsupported concepts may return `null`.
- Knowledge coverage gaps are not filled with fabricated knowledge.
- Stable IDs are used for deterministic resolution relationships.
- Internal runtime structures are not exposed as creator-facing categories.

—

# Current Generator Integration

For UKA v1.0, the Prompt Generator does not require an active Intent ID.

The active application flow is:

```text
knowledge-runtime.json
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

The Runtime Resolution Result contains:

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

The generator adds `KNOWLEDGE CONTEXT` only when a valid resolution exists.

The generator must not invent an Intent, Canonical, Domain, Alias, Relationship, or Structured Context when runtime resolution does not provide one.

—

# Future Intent Capability

Intent remains part of the forward-compatible knowledge architecture.

When UKA officially publishes governed Intent knowledge, the application may introduce Intent Resolution.

A future architecture may include:

```text
Creator Idea
        ↓
Intent Resolution
        ↓
Canonical Resolution
        ↓
Relationship Resolution
        ↓
Structured Context Resolution
        ↓
Prompt Generator
        ↓
Generated Prompt
```

This is a future capability model.

It is not the active UKA v1.0 resolution flow.

The exact future resolution order must be determined by the runtime contract and architecture decisions active at that time.

—

# Requirements for Activating Intent Resolution

Intent Resolution may become active only when the required knowledge capability is officially available through the governed pipeline.

At minimum, activation requires:

- Authoritative Intent knowledge in UKA
- Defined Intent identity
- Defined Intent data contract
- Importer support
- Publisher support
- Runtime package publication
- Runtime validation
- Runtime consumer integration
- Resolution design
- Testing
- Documentation update
- Architecture review
- ADR review when required

The application layer must not bypass these requirements by creating a private hardcoded Intent system.

—

# Future Intent Registry

If officially introduced, an Intent Registry must be generated from governed UKA knowledge.

Conceptually:

```text
UKA Intent Knowledge
        ↓
Knowledge Importer
        ↓
Internal Knowledge Contract
        ↓
Knowledge Publisher
        ↓
Intent Registry
        ↓
AI Prompt Studio Runtime Consumer
```

The exact future Intent Registry schema is not defined by this document.

It must be defined by the authoritative data contract active when the capability is introduced.

—

# Future Intent Resolution

Future Intent Resolution may use governed signals such as:

- Published Intent records
- Published aliases
- Published canonical relationships
- Published context
- Published relationship data

Only officially published knowledge may be treated as authoritative UKA knowledge.

The application may use implementation algorithms for matching and ranking, but those algorithms must not fabricate missing authoritative knowledge.

—

# Intent and Categories

Intent is not a category.

Internal knowledge structures and creator-facing product experience remain separate concerns.

The creator experience should not require creators to navigate internal UKA taxonomy.

Categories may remain internal implementation metadata where applicable.

The future introduction of Intent capability must not require exposing internal knowledge architecture directly to creators.

—

# Product Principle

The Intent capability must preserve the product principle:

> **AI Prompt Studio learns from behavior, not from creators’ work.**

Creator input may be used as runtime input for generating a prompt.

Creator work must not silently become authoritative UKA knowledge.

Future learning, analytics, or adaptation systems must respect privacy, governance, and explicit architecture boundaries.

—

# Responsibilities

## UKA

Responsible for:

- Authoritative knowledge
- Master Domains
- Canonical Outputs
- Future Intent knowledge
- Future Alias knowledge
- Future Relationship knowledge
- Future Structured Context
- Knowledge governance

—

## Knowledge Importer

Responsible for:

- Reading the UKA source
- Validating source structure
- Normalizing published knowledge
- Generating the Internal Knowledge Contract

—

## Knowledge Publisher

Responsible for:

- Runtime transformation
- Runtime validation
- Runtime package generation
- Runtime metadata
- Publishing future capabilities when supported by the source and contract

—

## AI Prompt Studio Runtime Consumer

Currently responsible for:

- Runtime loading
- Canonical Resolution
- Parent / Master Domain Resolution
- Candidate scoring
- Candidate ranking
- Confidence gating
- Deterministic null fallback

Future Intent Resolution becomes an application responsibility only when Intent is officially available through the published runtime contract.

—

## Prompt Generator

Responsible for:

- Creator Idea consumption
- Application settings consumption
- Runtime Resolution Result consumption
- Conditional Knowledge Context inclusion
- Prompt generation

The Prompt Generator does not own authoritative Intent knowledge.

—

# Design Principles

The knowledge resolution architecture follows these principles:

- Creator First
- Knowledge Driven
- Mobile First
- Privacy by Design
- Runtime Contract Driven
- Forward-Compatible
- Deterministic Where Required
- No Fabricated Knowledge

The long-term product may remain Intent-oriented at the creator-experience level without pretending that an active authoritative Intent Registry exists before UKA publishes one.

—

# Current Validation Status

The active UKA v1.0 Canonical Resolution implementation has been validated through live application testing.

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

This validation applies to the current Canonical + Master Domain resolution capability.

It does not represent validation of an active Intent Resolution system.

—

# Capability Roadmap

## Current — UKA v1.0

```text
Canonical Outputs
ACTIVE

Master Domains
ACTIVE

Intent
FUTURE

Alias
FUTURE

Relationship
FUTURE

Structured Context
FUTURE
```

## Future

Future capability activation is governed by:

```text
UKA
        ↓
Knowledge Importer
        ↓
Internal Knowledge Contract
        ↓
Knowledge Publisher
        ↓
Knowledge Runtime Package
        ↓
AI Prompt Studio
```

No fixed version number is assigned in this document to future Intent activation.

Intent becomes active when the authoritative knowledge, contracts, publishing pipeline, runtime support, architecture decisions, and validation are ready.

—

# Related Architecture Decisions

## ADR-0001

ADR-0001 established UKA as the Knowledge Engine of AI Prompt Studio.

This decision remains valid.

—

## ADR-0002

ADR-0002 established the Knowledge Runtime Package as the official runtime contract.

This decision remains valid.

—

## ADR-0003

ADR-0003 established the active UKA v1.0 runtime resolution capability scope:

```text
Canonical Outputs
        +
Master Domains
```

It also established that Intent, Alias, Relationship, and Structured Context must not be fabricated or hardcoded in the application layer.

This document conforms to ADR-0003.

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

For UKA v1.0, Intent is a future knowledge capability and is not active for runtime resolution.

The current active Knowledge Resolution capability uses published **Canonical Outputs and Master Domains**.

AI Prompt Studio must not fabricate or hardcode Intent, Alias, Relationship, or Structured Context as authoritative UKA knowledge.

Intent Resolution may be activated only when the required capability is officially authored, governed, published, and available through the Knowledge Runtime Package.

The current UKA v1.0 Canonical + Master Domain resolution implementation is complete and has passed 5/5 live application tests.

Future changes to the active runtime capability scope must follow the architecture governance process and applicable Architecture Decision Records.