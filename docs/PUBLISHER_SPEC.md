# AI Prompt Studio

## PUBLISHER_SPEC.md

**Status:** LOCKED  
**Version:** 3.0  
**Last Updated:** July 2026  
**Current Runtime Scope:** UKA v1.0

—

# Purpose

This document defines the Knowledge Publisher subsystem of AI Prompt Studio.

The Knowledge Publisher transforms the generated Internal Knowledge Contract into versioned Knowledge Runtime Packages.

The Publisher separates internal knowledge data from runtime-ready application data.

The Publisher does not read the UKA Official Master Baseline workbook directly.

The official boundary is:

```text
UKA Official Master Baseline
        ↓
Knowledge Importer
        ↓
knowledge-internal.json
        ↓
Knowledge Publisher
        ↓
Knowledge Runtime Package
        ↓
AI Prompt Studio
```

—

# Philosophy

The knowledge architecture separates authoring, importing, publishing, and runtime consumption.

```text
UKA
Authoring System

Knowledge Importer
Source Ingestion and Internal Contract System

Knowledge Publisher
Runtime Build System

AI Prompt Studio
Runtime Consumer
```

Knowledge is authored in the authoritative source, transformed through the governed pipeline, published into runtime packages, and consumed by the application.

Generated artifacts are not manually edited as alternative Sources of Truth.

—

# Source of Truth

The **UKA Official Master Baseline** is the authoritative human-edited knowledge source.

However, the Knowledge Publisher does not consume the UKA workbook directly.

The Publisher reads only the generated Internal Knowledge Contract:

```text
knowledge-internal.json
```

The governed source flow is:

```text
UKA Official Master Baseline
        ↓
Knowledge Importer
        ↓
Internal Knowledge Contract
        ↓
Knowledge Publisher
```

No runtime package is edited manually.

All Knowledge Runtime Packages are generated.

—

# Publisher Input

The official Publisher input is:

```text
knowledge-internal.json
```

Conceptually:

```text
KnowledgeDocument
├── metadata
├── profile
├── statistics
└── knowledge
    ├── coreDomains
    ├── masterDomains
    ├── canonicalOutputs
    ├── knowledgeInfrastructure
    └── libraries
```

The exact Internal Knowledge Contract is governed by `DATA_CONTRACTS.md`.

The Publisher must not bypass this contract by reading the UKA workbook directly.

—

# Input Boundary

The Knowledge Publisher consumes only knowledge available through the generated Internal Knowledge Contract.

The Publisher must not assume that every future knowledge capability is currently available.

For UKA v1.0, the active runtime resolution capability ultimately published for application use is based on:

```text
Canonical Outputs
        +
Master Domains
```

Future capabilities may include:

- Intent
- Alias
- Relationship
- Structured Context

These capabilities must not be fabricated by the Publisher.

They may be published only when they are officially supported by:

- UKA authoritative knowledge
- Knowledge Importer
- Internal Knowledge Contract
- Publisher transformation
- Runtime contract
- Validation

—

# Excluded Source Data

Authoring and governance information that is not required by the runtime contract must not be published merely because it exists in the source system.

Examples may include:

- Governance records
- Audit history
- Authoring notes
- Internal documentation
- Architecture decision documents
- Release documentation not required by the runtime contract

The exact publication rules are determined by the active data contracts and Publisher implementation.

—

# Publishing Pipeline

The Publisher begins only after the Knowledge Importer has generated the Internal Knowledge Contract.

```text
knowledge-internal.json
        ↓
Internal Contract Input
        ↓
Publish Validation
        ↓
Runtime Transformation
        ↓
Runtime Validation
        ↓
Package Generation
        ↓
Knowledge Runtime Package
```

The Publisher does not perform workbook ingestion.

The Publisher does not perform creator-input runtime resolution.

—

# Publisher Stages

## 1. Internal Contract Input

The Publisher receives:

```text
knowledge-internal.json
```

The input must conform to the active Internal Knowledge Contract.

The Publisher must not manually repair invalid upstream knowledge by inventing authoritative data.

—

## 2. Publish Validation

The Publisher validates knowledge before runtime transformation.

Validation may include:

- Required contract structure
- Required identifiers
- Duplicate ID detection
- Publishable record validation
- Available reference validation
- Required field validation
- Contract compatibility

Publishing must not continue when required input validation fails.

—

## 3. Runtime Transformation

Validated internal knowledge is transformed into runtime-ready structures.

Transformation responsibilities include:

- Building runtime registries
- Preserving stable IDs
- Preserving valid published references
- Removing authoring-only data when appropriate
- Optimizing runtime data
- Generating runtime metadata inputs
- Applying active publish profile rules

Transformation must not fabricate missing authoritative knowledge.

—

## 4. Runtime Validation

The generated runtime candidate is validated before publication.

Validation may include:

- Runtime schema validation
- Registry integrity
- Required ID integrity
- Duplicate runtime ID detection
- Published reference integrity
- Runtime metadata validation
- Runtime contract compatibility

Invalid required runtime output must not be published.

—

## 5. Package Generation

After successful validation, the Publisher generates the Knowledge Runtime Package.

Responsibilities include:

- Runtime package generation
- Runtime metadata generation
- Runtime versioning
- Runtime artifact writing
- Publish profile application
- Deterministic package structure where applicable

Output:

```text
Knowledge Runtime Package
```

—

# Knowledge Runtime Package

The Publisher generates a runtime package designed for application consumption.

Conceptually:

```text
KnowledgeRuntimePackage
├── runtime
├── registries
│   ├── intents[]
│   ├── domains[]
│   ├── canonicals[]
│   └── relationships[]
├── metadata
└── version
```

The exact contract is governed by `DATA_CONTRACTS.md`.

The runtime contract is forward-compatible.

The existence of a registry in the runtime model does not mean that the registry currently contains an active published dataset.

—

# Domain Registry

The Domain Registry contains published runtime domain records.

For UKA v1.0:

```text
Domain Registry
ACTIVE
```

The current runtime resolver uses published domain records to resolve the Parent / Master Domain associated with a resolved Canonical.

The active ID relationship is:

```text
CanonicalRecord.parentDomainId
        ↓
DomainRecord.id
```

The Publisher preserves and validates this published relationship where required by the active runtime contract.

—

# Canonical Registry

The Canonical Registry contains published runtime canonical records.

For UKA v1.0:

```text
Canonical Registry
ACTIVE
```

The current runtime resolver depends on published canonical identity and parent-domain references.

Conceptually:

```text
CanonicalRecord
├── id
├── name
├── parentDomainId
└── published canonical data
```

The Publisher publishes valid canonical records from governed upstream knowledge.

The Publisher does not choose a canonical based on Creator Idea input.

—

# Intent Registry

The runtime contract may include an Intent Registry.

For UKA v1.0:

```text
Intent Registry
FUTURE / NOT ACTIVE FOR RESOLUTION
```

The Publisher must not fabricate Intent records to populate the registry.

Intent may become an active published capability only when officially supported through the governed knowledge pipeline.

—

# Relationship Registry

The runtime contract may include a Relationship Registry.

For UKA v1.0:

```text
Relationship Registry
FUTURE / NOT ACTIVE FOR RESOLUTION
```

The Publisher must not fabricate authoritative Relationship records.

The current canonical-to-domain reference:

```text
CanonicalRecord.parentDomainId
        ↓
DomainRecord.id
```

is a published runtime reference used by the current resolver.

It does not imply that a separate active Relationship Registry capability exists.

—

# Alias and Structured Context

Alias and Structured Context are future knowledge capabilities for the current UKA v1.0 scope.

They must not be fabricated or hardcoded by the Publisher.

If these capabilities are introduced in the future, they must enter through:

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
```

—

# UKA v1.0 Active Runtime Capability Scope

For UKA v1.0, the active application resolution capability uses:

```text
Canonical Outputs
        +
Master Domains
```

Capability status:

```text
Domain Registry
ACTIVE

Canonical Registry
ACTIVE

Intent Registry
FUTURE / NOT ACTIVE FOR RESOLUTION

Relationship Registry
FUTURE / NOT ACTIVE FOR RESOLUTION

Alias
FUTURE / NOT ACTIVE FOR RESOLUTION

Structured Context
FUTURE / NOT ACTIVE FOR RESOLUTION
```

The Publisher must preserve this capability boundary.

A future-facing contract structure must not be mistaken for active published knowledge.

—

# Runtime Metadata

Runtime metadata may include:

```text
RuntimeMetadata
├── version
├── generatedAt
├── sourceVersion
└── publishProfile
```

Runtime metadata is generated by the publishing system.

It is not manually authored by AI Prompt Studio.

Runtime metadata supports:

- Traceability
- Compatibility checks
- Build identification
- Runtime version identification
- Publish profile identification

—

# Publish Profiles

The publishing architecture may support runtime publish profiles such as:

```text
core
full
mobile
enterprise
```

A publish profile defines a supported runtime package configuration.

The existence of a publish profile does not authorize the Publisher to fabricate unavailable knowledge.

Each generated package must contain only knowledge valid for:

- The authoritative source
- The Internal Knowledge Contract
- The active runtime contract
- The applicable publish profile
- The active validation rules

A profile may contain different subsets or optimizations of published knowledge where supported by the Publisher architecture.

—

# Runtime Principles

Knowledge Runtime Packages follow these principles:

- Registry-based
- ID-first
- Immutable from the application perspective
- Versioned
- Platform-independent
- Generated
- Validated before publication
- Forward-compatible
- Governed by explicit contracts
- Free from fabricated authoritative knowledge

—

# Runtime Contract

AI Prompt Studio never consumes the UKA workbook directly.

AI Prompt Studio consumes only published Knowledge Runtime Packages.

The Knowledge Runtime Package is the official runtime contract between the UKA publishing system and AI Prompt Studio.

The complete boundary is:

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
AI Prompt Studio Runtime Consumer
```

—

# Publisher vs Runtime Resolution

The Knowledge Publisher and Runtime Resolver have different responsibilities.

## Knowledge Publisher

Operates at build time.

Responsible for:

- Input contract consumption
- Publish validation
- Runtime transformation
- Runtime registry generation
- Runtime validation
- Runtime optimization
- Runtime metadata
- Runtime package generation
- Runtime versioning

—

## Runtime Resolver

Operates at application runtime.

Responsible for:

- Receiving the Creator Idea
- Evaluating published canonical candidates
- Scoring candidates
- Ranking candidates
- Applying confidence gating
- Resolving a Canonical
- Resolving the associated Parent / Master Domain
- Returning deterministic null behavior when confidence is insufficient

The Publisher does not perform creator-input matching.

The Runtime Resolver does not publish knowledge packages.

—

# Runtime Consumer Flow

After publication:

```text
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

For UKA v1.0, the Runtime Resolution Result contains:

```text
RuntimeResolutionResult
├── canonical
└── domain
```

A valid null result may contain:

```text
canonical: null
domain: null
```

Null runtime resolution is not a Publisher validation failure.

—

# Responsibilities

## UKA

Responsible for:

- Authoritative knowledge
- Knowledge authoring
- Knowledge governance
- Master Domains
- Canonical Outputs
- Future knowledge capabilities

—

## Knowledge Importer

Responsible for:

- Reading the UKA workbook
- Workbook validation
- Source normalization
- Internal Knowledge Contract generation

Output:

```text
knowledge-internal.json
```

—

## Knowledge Publisher

Responsible for:

- Reading the Internal Knowledge Contract
- Publish validation
- Runtime transformation
- Runtime validation
- Runtime optimization
- Runtime metadata
- Package generation
- Runtime versioning

Output:

```text
Knowledge Runtime Package
```

—

## AI Prompt Studio Runtime Consumer

Responsible for:

- Runtime loading
- Resolution against published capabilities
- Canonical Resolution
- Parent / Master Domain Resolution
- Candidate scoring
- Candidate ranking
- Confidence gating
- Deterministic null fallback

—

## Prompt Generator

Responsible for:

- Creator Idea consumption
- Application settings consumption
- Runtime Resolution Result consumption
- Conditional Knowledge Context inclusion
- Prompt generation

—

# Validation

Every published Knowledge Runtime Package must satisfy the validation requirements defined by the active runtime contract.

Validation may include:

- Schema validation
- Required structure validation
- Registry integrity
- Required ID integrity
- Duplicate ID detection
- Published reference integrity
- Runtime metadata validation
- Runtime compatibility validation

Publishing fails when required validation fails.

The Publisher must not generate or publish fabricated knowledge to make validation pass.

—

# Reference Integrity

The Publisher validates published references required by the active runtime contract.

For UKA v1.0, an important active reference is:

```text
CanonicalRecord.parentDomainId
        ↓
DomainRecord.id
```

The Publisher validates the integrity of published references.

The Publisher does not perform creator-input Knowledge Resolution.

—

# Immutability

Generated runtime packages are immutable from the AI Prompt Studio application perspective.

AI Prompt Studio must not manually edit runtime knowledge.

Knowledge changes must follow:

```text
Edit UKA Official Master Baseline
        ↓
Run Knowledge Importer
        ↓
Generate knowledge-internal.json
        ↓
Run Knowledge Publisher
        ↓
Generate Knowledge Runtime Package
```

Generated artifacts must not be manually patched as a substitute for updating the authoritative source.

—

# Determinism

For equivalent valid input and equivalent publishing configuration, the Publisher should produce structurally deterministic runtime output, except for explicitly variable metadata such as generation timestamps where applicable.

Stable IDs and deterministic transformation behavior support:

- Reproducibility
- Debugging
- Runtime consistency
- Build comparison
- Validation

—

# Versioning

Knowledge Runtime Packages must support version identification.

Versioning supports:

- Runtime traceability
- Compatibility validation
- Controlled deployment
- Build auditing

The exact versioning policy is governed by the active runtime contract and publishing architecture.

—

# Failure Behavior

Publishing must stop when required validation fails.

The Publisher must not:

- Silently ignore malformed required data
- Invent missing authoritative records
- Fabricate missing knowledge capabilities
- Publish invalid required references
- Modify the authoritative source to repair a build

Failures must be corrected through the appropriate governed source or pipeline stage.

—

# Future Capability Integration

Future capabilities may include:

- Intent
- Alias
- Relationship
- Structured Context

Future capabilities may be published only when the complete governed path exists:

```text
Authoritative UKA Knowledge
        ↓
Importer Support
        ↓
Internal Contract Support
        ↓
Publisher Support
        ↓
Runtime Contract Support
        ↓
Validation
        ↓
Knowledge Runtime Package
```

The Publisher must not pre-populate future capabilities with invented data.

—

# Future Publisher Evolution

The Publisher architecture may evolve over time.

Possible future improvements may include:

- More efficient build execution
- Additional validated publish profiles
- Incremental build optimization
- Improved runtime optimization
- Automated compatibility checks
- Controlled distribution workflows

These are possible implementation directions, not committed version milestones.

Any architectural change must follow the applicable architecture governance process.

—

# Architecture Boundaries

The Publisher architecture must preserve the following boundaries:

```text
UKA
Owns authoritative knowledge

Knowledge Importer
Owns workbook ingestion and Internal Knowledge Contract generation

Knowledge Publisher
Owns runtime transformation and package generation

AI Prompt Studio Runtime Consumer
Owns runtime resolution against published knowledge

Prompt Generator
Owns prompt construction
```

No subsystem may silently assume ownership of another subsystem’s authoritative responsibility.

—

# Product Principle

The publishing architecture must preserve the product principle:

> **AI Prompt Studio learns from behavior, not from creators’ work.**

Creator work must not silently become authoritative UKA knowledge.

The Publisher publishes governed knowledge.

It does not mine creator prompt content as an undocumented knowledge source.

—

# Related Documents

- `ARCHITECTURE.md`
- `ADR-0001.md`
- `ADR-0002.md`
- `ADR-0003.md`
- `DATA_CONTRACTS.md`
- `PUBLISHER_PIPELINE.md`
- `IMPORTER_SPEC.md`
- `PRODUCT_DECISIONS.md`
- `PROMPT_ENGINE.md`

—

# Phase Status

```text
FASE 4 — Knowledge Importer
COMPLETE

FASE 5 — Knowledge Publisher
COMPLETE

FASE 6 — End-to-End Knowledge Pipeline
COMPLETE

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

The Knowledge Publisher consumes the generated Internal Knowledge Contract and produces versioned Knowledge Runtime Packages.

The Publisher does not read the UKA workbook directly.

The Knowledge Runtime Package remains the official runtime contract consumed by AI Prompt Studio.

For UKA v1.0, the active runtime resolution capability uses published **Canonical Outputs and Master Domains**.

Intent, Alias, Relationship, and Structured Context remain future capabilities and must not be fabricated by the Publisher.

The Publisher validates and preserves published runtime structures and references but does not perform creator-input runtime resolution.

Future Publisher evolution must preserve the architecture boundaries defined by ADR-0002, ADR-0003, DATA_CONTRACTS.md, and the governed knowledge pipeline.