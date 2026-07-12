# PUBLISHER_PIPELINE.md

**Status:** LOCKED  
**Version:** 2.0  
**Last Updated:** July 2026  
**Current Runtime Scope:** UKA v1.0

—

# Purpose

This document defines the controlled knowledge build pipeline used to transform the UKA Official Master Baseline into the Knowledge Runtime Package consumed by AI Prompt Studio.

The complete publishing flow contains two distinct subsystems:

```text
Knowledge Importer
        ↓
Internal Knowledge Contract
        ↓
Knowledge Publisher
        ↓
Knowledge Runtime Package
```

The Knowledge Importer and Knowledge Publisher have separate responsibilities.

The Knowledge Importer reads the UKA workbook.

The Knowledge Publisher does not read the UKA workbook directly.

The Knowledge Publisher consumes the generated Internal Knowledge Contract and produces the Knowledge Runtime Package.

Architectural decisions remain governed by:

- `ADR-0002.md`
- `ADR-0003.md`

—

# Architecture Overview

The complete governed knowledge flow is:

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
AI Prompt Studio Runtime Consumer
```

The application runtime begins only after the Knowledge Runtime Package has been generated.

```text
Knowledge Runtime Package
        ↓
runtime-loader.js
        ↓
runtime-resolver.js
        ↓
generator.js
```

The publishing pipeline and runtime resolution are separate responsibilities.

—

# Pipeline Boundaries

## Knowledge Importer

The Knowledge Importer owns:

- Importer configuration
- Workbook profile loading
- Workbook path resolution
- Workbook validation
- Workbook loading
- Workbook data extraction
- Import context construction
- Metadata generation
- Statistics generation
- Internal knowledge document generation

Output:

```text
knowledge-internal.json
```

—

## Knowledge Publisher

The Knowledge Publisher owns:

- Internal Knowledge Contract consumption
- Publishable knowledge validation
- Runtime transformation
- Runtime registry generation
- Runtime integrity validation
- Runtime optimization
- Runtime metadata generation
- Runtime package generation
- Runtime versioning

Output:

```text
Knowledge Runtime Package
```

—

## AI Prompt Studio Runtime Consumer

The AI Prompt Studio Runtime Consumer owns:

- Runtime loading
- Resolution against published runtime capabilities
- Candidate evaluation
- Scoring
- Ranking
- Confidence gating
- Canonical Resolution
- Parent / Master Domain Resolution
- Deterministic null fallback

The Knowledge Publisher does not perform creator-input runtime resolution.

—

# Complete Build Pipeline

```text
UKA Official Master Baseline
        │
        ▼
┌─────────────────────────────────────┐
│         KNOWLEDGE IMPORTER          │
└─────────────────────────────────────┘
        │
        ▼
P1 — Importer Configuration
        │
        ▼
P2 — Workbook Profile
        │
        ▼
P3 — Workbook Resolver
        │
        ▼
P4 — Workbook Validation
        │
        ▼
P5 — Workbook Loader
        │
        ▼
P6 — Import Context
        │
        ├───────────────────────┐
        ▼                       ▼
P7 — Metadata Builder    P8 — Statistics Builder
        │                       │
        └───────────┬───────────┘
                    ▼
          P9 — Knowledge Builder
                    │
                    ▼
        knowledge-internal.json
                    │
                    ▼
┌─────────────────────────────────────┐
│         KNOWLEDGE PUBLISHER         │
└─────────────────────────────────────┘
                    │
                    ▼
        P10 — Internal Contract Input
                    │
                    ▼
        P11 — Publish Validation
                    │
                    ▼
        P12 — Runtime Transformation
                    │
                    ▼
        P13 — Runtime Validation
                    │
                    ▼
        P14 — Package Generation
                    │
                    ▼
        Knowledge Runtime Package
                    │
                    ▼
┌─────────────────────────────────────┐
│    AI PROMPT STUDIO RUNTIME         │
└─────────────────────────────────────┘
                    │
                    ▼
           runtime-loader.js
                    │
                    ▼
          runtime-resolver.js
                    │
                    ▼
              generator.js
```

—

# Knowledge Importer Pipeline

# P1 — Importer Configuration

Loads the importer configuration.

## Responsibilities

- Load importer configuration
- Validate configuration
- Resolve project paths

## Output

```text
Configuration
```

The Configuration contract is immutable after production.

—

# P2 — Workbook Profile

Loads the active workbook profile.

## Responsibilities

- Load workbook profile
- Validate profile schema
- Resolve workbook definition

## Output

```text
Workbook Profile
```

The Workbook Profile defines how the UKA workbook is interpreted by the Importer.

—

# P3 — Workbook Resolver

Locates the active UKA workbook.

## Responsibilities

- Resolve workbook path
- Verify workbook existence
- Provide the resolved path to downstream Importer stages

## Output

```text
Workbook Path
```

—

# P4 — Workbook Validation

Validates the workbook before transformation.

## Responsibilities

- Validate worksheet existence
- Validate required columns
- Validate workbook structure
- Validate required source integrity

## Output

```text
Validated Workbook
```

Validation must complete before knowledge transformation continues.

Invalid required source input must terminate the affected Importer execution.

—

# P5 — Workbook Loader

Loads workbook contents.

## Responsibilities

- Read the workbook
- Convert required worksheets into application-readable objects
- Build normalized workbook data

## Output

```text
WorkbookData
├── coreDomains[]
├── masterDomains[]
├── canonicalOutputs[]
└── knowledgeInfrastructure[]
```

—

# P6 — Import Context

Creates the normalized context consumed by Importer builders.

## Responsibilities

- Combine configuration
- Combine workbook profile
- Combine workbook
- Combine workbook path
- Combine workbook data

## Output

```text
ImportContext
├── configuration
├── profile
├── workbook
├── workbookPath
└── data
```

The Import Context is immutable.

—

# P7 — Metadata Builder

Generates internal knowledge metadata.

## Responsibilities

- Generate profile metadata
- Generate import timestamp
- Generate version metadata
- Preserve required source information

## Output

```text
Metadata
```

The Metadata Builder must not modify upstream data.

—

# P8 — Statistics Builder

Generates build statistics.

## Responsibilities

- Count Core Domains
- Count Master Domains
- Count Canonical Outputs
- Count Knowledge Infrastructure records
- Generate available internal build statistics

## Output

```text
Statistics
```

Statistics describe the generated knowledge artifact.

They do not become an alternative Source of Truth.

—

# P9 — Knowledge Builder

Builds the Internal Knowledge Contract.

## Responsibilities

- Build Core Domains
- Build Master Domains
- Build Canonical Outputs
- Build Knowledge Infrastructure
- Assemble the Knowledge Document

## Output

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

The generated `knowledge-internal.json` is:

- Generated automatically
- Immutable for downstream consumption
- Never edited manually
- The official input contract for the Knowledge Publisher
- Not consumed directly by AI Prompt Studio

—

# Knowledge Publisher Pipeline

The Knowledge Publisher begins at the Internal Knowledge Contract boundary.

```text
knowledge-internal.json
        ↓
Knowledge Publisher
        ↓
Knowledge Runtime Package
```

The Publisher must not read the UKA workbook directly.

—

# P10 — Internal Contract Input

Receives the generated Internal Knowledge Contract.

## Input

```text
knowledge-internal.json
```

## Responsibilities

- Read the generated Internal Knowledge Contract
- Verify required contract availability
- Prepare the contract for publish validation

The Publisher must not manually repair or silently replace invalid upstream knowledge.

—

# P11 — Publish Validation

Validates the Internal Knowledge Contract for runtime publication.

## Responsibilities

- Validate required internal contract structure
- Validate publishable records
- Validate required identifiers
- Detect duplicate IDs
- Validate available references
- Reject malformed required data
- Prevent invalid runtime generation

## Output

```text
Validated Publishable Knowledge
```

Validation must complete before runtime transformation.

—

# P12 — Runtime Transformation

Transforms validated internal knowledge into runtime-ready structures.

## Responsibilities

- Transform publishable knowledge
- Build runtime registries
- Preserve stable IDs
- Preserve valid published references
- Remove authoring-only data when appropriate
- Optimize data for application consumption
- Generate runtime metadata inputs

## Output

```text
Runtime Candidate
```

The transformation process must be deterministic for equivalent valid input and configuration.

—

# Runtime Registry Model

The Knowledge Runtime Package is forward-compatible.

Its registry model may include:

```text
registries
├── intents[]
├── domains[]
├── canonicals[]
└── relationships[]
```

The existence of a registry in the runtime contract does not mean that the registry currently contains an active published dataset for runtime resolution.

—

# UKA v1.0 Active Runtime Scope

For UKA v1.0, the active runtime resolution capability uses:

```text
Canonical Outputs
        +
Master Domains
```

Current capability status:

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

Alias and Structured Context are also future knowledge capabilities.

The Publisher must not fabricate these capabilities to populate a future-facing runtime contract.

A registry may remain empty or inactive when the corresponding authoritative knowledge capability has not been officially published by UKA.

—

# Runtime Relationship Handling

For UKA v1.0, the active published runtime relationship required by the current resolver is:

```text
CanonicalRecord.parentDomainId
        ↓
DomainRecord.id
```

The Publisher may validate and preserve published references required by the runtime contract.

This is different from creator-input runtime resolution.

The Publisher does not:

- Interpret a Creator Idea
- Score creator input
- Rank canonical candidates for creator input
- Apply runtime confidence gating to creator input
- Choose a canonical based on creator input

Those responsibilities belong to `runtime-resolver.js`.

—

# Future Relationship Capability

A forward-compatible Relationship Registry may exist in the runtime contract.

However:

```text
Relationship Registry
FUTURE / NOT ACTIVE FOR UKA v1.0 RESOLUTION
```

The Publisher must not fabricate authoritative Relationship records when UKA has not officially published them.

When future Relationship knowledge becomes available, Publisher support must follow:

- Authoritative UKA source support
- Internal contract support
- Data contract support
- Publish validation
- Runtime transformation
- Runtime validation
- Architecture governance

—

# P13 — Runtime Validation

Validates the generated runtime candidate before package generation.

## Responsibilities

- Validate runtime structure
- Validate registry integrity
- Validate required IDs
- Detect duplicate runtime IDs
- Validate available published references
- Validate runtime metadata requirements
- Reject malformed runtime output

## Output

```text
Validated Runtime
```

Invalid required runtime output must not be published.

—

# P14 — Package Generation

Generates the final Knowledge Runtime Package.

## Responsibilities

- Generate the runtime package
- Generate runtime metadata
- Apply runtime versioning
- Write the runtime artifact
- Preserve deterministic package structure where applicable

## Output

```text
Knowledge Runtime Package
```

The Knowledge Runtime Package is the official runtime contract consumed by AI Prompt Studio.

—

# Runtime Package Contract

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

Runtime metadata may include:

```text
RuntimeMetadata
├── version
├── generatedAt
├── sourceVersion
└── publishProfile
```

The exact runtime contract is governed by `DATA_CONTRACTS.md` and applicable Architecture Decision Records.

—

# Runtime Package Profiles

The publishing architecture may support versioned publish profiles such as:

```text
core
full
mobile
enterprise
```

A publish profile defines a supported runtime package profile.

The existence of a profile name does not authorize the Publisher to fabricate unavailable knowledge capabilities.

Each generated package must contain only knowledge valid for the applicable source, contract, and publish rules.

—

# AI Prompt Studio Runtime Boundary

After package generation, the publishing pipeline is complete.

The application runtime begins here:

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

The Publisher does not own runtime creator-input resolution.

—

# Runtime Loader Responsibility

`runtime-loader.js` is responsible for:

- Loading the published Knowledge Runtime Package
- Providing runtime access to application consumers
- Maintaining runtime cache behavior
- Exposing runtime metadata and runtime data

The Runtime Loader does not edit the published runtime package.

—

# Runtime Resolver Responsibility

`runtime-resolver.js` is responsible for:

- Receiving the Creator Idea
- Evaluating published canonical candidates
- Scoring candidates
- Ranking candidates
- Applying confidence gating
- Resolving a Canonical
- Resolving the associated Parent / Master Domain
- Returning deterministic null behavior when confidence is insufficient

The current UKA v1.0 resolver operates only against published active runtime capabilities.

—

# Generator Responsibility

`generator.js` is responsible for:

- Receiving the Creator Idea
- Receiving application settings
- Consuming the Runtime Resolution Result
- Adding `KNOWLEDGE CONTEXT` only when resolution succeeds
- Continuing prompt generation when resolution returns null

The generator must not fabricate unpublished UKA knowledge.

—

# End-to-End Data Flow

```text
Configuration
        ↓
Workbook Profile
        ↓
Workbook
        ↓
Workbook Data
        ↓
Import Context
        ↓
Knowledge Document
        ↓
knowledge-internal.json
        ↓
Publish Validation
        ↓
Runtime Transformation
        ↓
Runtime Validation
        ↓
Knowledge Runtime Package
        ↓
Runtime Resolution Result
        ↓
Prompt Generator
```

The data contracts for these boundaries are defined in `DATA_CONTRACTS.md`.

—

# Pipeline Principles

The complete knowledge build pipeline follows these principles:

- Single Source of Truth
- Single Responsibility
- Immutable stage outputs
- Validation before transformation
- Deterministic output where applicable
- Versioned artifacts
- Platform-independent contracts
- No fabricated authoritative knowledge
- Clear subsystem boundaries

—

# Single Source of Truth

The UKA Official Master Baseline is the only human-edited authoritative knowledge source.

Generated artifacts are not alternative Sources of Truth.

The controlled flow is:

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
```

—

# Immutability

Each stage produces output for the next stage.

Downstream stages must not mutate upstream artifacts.

Generated artifacts must not be manually patched to bypass the governed pipeline.

Knowledge changes begin at the authoritative source and flow through the controlled build process.

—

# Validation Before Transformation

Required input validation must complete before dependent transformation proceeds.

Conceptually:

```text
Input
        ↓
Validation
        │
        ├── VALID
        │      ↓
        │   Transformation
        │
        └── INVALID
               ↓
            Stop affected build
```

Runtime creator-input null resolution is not a publishing validation failure.

These are separate behaviors.

—

# Deterministic Output

Equivalent valid source data and equivalent build configuration should produce structurally deterministic knowledge output, except for explicitly variable metadata such as generation timestamps where applicable.

Runtime resolution determinism is governed separately by the runtime resolver architecture.

—

# Versioned Artifacts

Generated runtime packages must support version identification.

Version metadata allows:

- Runtime traceability
- Compatibility validation
- Controlled updates
- Build auditing

Versioning does not replace source governance.

—

# No Fabricated Knowledge

Neither the Importer nor the Publisher may fabricate authoritative UKA knowledge to fill missing future capabilities.

This includes:

- Intent
- Alias
- Relationship
- Structured Context

Application code must follow the same boundary.

Future knowledge capability expansion begins in UKA and proceeds through the governed pipeline.

—

# Source of Truth Responsibilities

## UKA Official Master Baseline

Owns:

- Authoritative knowledge
- Master Domains
- Canonical Outputs
- Future knowledge capabilities
- Knowledge governance

—

## Knowledge Importer

Owns:

- Workbook ingestion
- Workbook validation
- Source normalization
- Internal Knowledge Contract generation

—

## Knowledge Publisher

Owns:

- Internal Knowledge Contract consumption
- Publish validation
- Runtime transformation
- Runtime validation
- Runtime optimization
- Runtime metadata
- Runtime package generation
- Runtime versioning

—

## AI Prompt Studio

Owns:

- Runtime loading
- Runtime resolution against published capabilities
- Prompt construction
- Creator experience

AI Prompt Studio does not own authoritative UKA knowledge.

—

# Update Workflow

Knowledge updates follow this controlled process:

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
        ↓
AI Prompt Studio loads published runtime
```

Generated artifacts must not be edited manually as a substitute for updating the authoritative source.

—

# Related Documents

- `ARCHITECTURE.md`
- `ADR-0002.md`
- `ADR-0003.md`
- `DATA_CONTRACTS.md`
- `PRODUCT_DECISIONS.md`
- `IMPORTER_SPEC.md`
- `PUBLISHER_SPEC.md`
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

# Document Status

**Status: LOCKED**

This document defines the controlled knowledge build pipeline from the UKA Official Master Baseline to the Knowledge Runtime Package.

The Knowledge Importer reads and transforms the UKA workbook into the Internal Knowledge Contract.

The Knowledge Publisher consumes the Internal Knowledge Contract and generates the Knowledge Runtime Package.

For UKA v1.0, the active runtime resolution capability uses published **Canonical Outputs and Master Domains**.

The Publisher does not perform creator-input runtime resolution and must not fabricate unavailable future knowledge capabilities.

AI Prompt Studio consumes published runtime packages only.

Future implementation improvements must preserve the architectural contracts defined by ADR-0002, ADR-0003, DATA_CONTRACTS.md, and the governed knowledge pipeline.