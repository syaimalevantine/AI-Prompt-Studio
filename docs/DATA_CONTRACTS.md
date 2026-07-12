# DATA_CONTRACTS.md

**Status:** LOCKED  
**Version:** 1.0  
**Last Updated:** July 2026

—

# Purpose

This document defines the data contracts exchanged between the Knowledge Importer, Knowledge Publisher, AI Prompt Studio Runtime Consumer, and Prompt Generator.

A data contract specifies the structure that a stage produces and the next stage consumes.

Stages must never assume undocumented fields.

Every change to a contract requires updating this document.

—

# Data Flow

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
Knowledge Runtime Package
        ↓
Runtime Resolution Result
        ↓
Prompt Generator
```

—

# Contract 1

## Configuration

**Produced by:**  
Importer Configuration

**Consumed by:**  
Workbook Profile

### Structure

```text
Configuration
├── importer
├── source
├── profile
├── schema
├── output
├── validation
└── logging
```

**Immutable:** YES

—

# Contract 2

## Workbook Profile

**Produced by:**  
Workbook Profile Loader

**Consumed by:**

- Workbook Validator
- Workbook Loader

### Structure

```text
WorkbookProfile
├── profile
├── workbook
├── sheets
└── validation
```

**Immutable:** YES

—

# Contract 3

## Workbook

**Produced by:**  
Workbook Loader

**Consumed by:**

- Workbook Validator
- Workbook Data Loader

### Structure

```text
Workbook
├── SheetNames
└── Sheets
```

**Immutable:** YES

—

# Contract 4

## Workbook Data

**Produced by:**  
Workbook Data Loader

**Consumed by:**  
Import Context

### Structure

```text
WorkbookData
├── coreDomains[]
├── masterDomains[]
├── canonicalOutputs[]
└── knowledgeInfrastructure[]
```

**Immutable:** YES

—

# Contract 5

## Import Context

**Produced by:**  
Import Context Builder

**Consumed by:**

- Metadata Builder
- Statistics Builder
- Knowledge Builder

### Structure

```text
ImportContext
├── configuration
├── profile
├── workbook
├── workbookPath
└── data
```

**Immutable:** YES

—

# Contract 6

## Knowledge Document

**Produced by:**  
Knowledge Builder

**Consumed by:**  
Knowledge Publisher

### Structure

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

**Immutable:** YES

### Contract Role

The Knowledge Document is the internal knowledge contract between the Knowledge Importer and the Knowledge Publisher.

It is:

- Generated automatically
- Never edited manually
- Publisher input
- Not consumed directly by AI Prompt Studio

—

# Contract 7

## Knowledge Runtime Package

**Produced by:**  
Knowledge Publisher

**Consumed by:**

- `runtime-loader.js`
- AI Prompt Studio Runtime Consumer

### Structure

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

**Immutable:** YES

### Contract Role

The Knowledge Runtime Package is the official runtime contract between the UKA publishing system and AI Prompt Studio.

The runtime contract is forward-compatible.

The existence of a registry in the contract does not mean that the registry currently contains an active published dataset for resolution.

—

## UKA v1.0 Active Runtime Scope

For UKA v1.0, the active resolution capability is:

```text
Canonical Outputs
        +
Master Domains
```

The active registries used by the current resolver are:

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

Intent, Alias, Relationship, and Structured Context must not be fabricated or hardcoded in the AI Prompt Studio application layer.

They may be consumed only when officially published by UKA through the governed knowledge pipeline and Knowledge Runtime Package.

—

## Domain Record Contract

The Domain Registry contains published runtime domain records.

The current resolver depends on the following domain identity relationship:

```text
DomainRecord
├── id
└── published domain data
```

The `id` field is used to resolve canonical parent-domain references.

Stages must not invent a domain when the referenced domain cannot be resolved.

—

## Canonical Record Contract

The Canonical Registry contains published runtime canonical records.

The current resolver depends on the following fields:

```text
CanonicalRecord
├── id
├── name
├── parentDomainId
└── published canonical data
```

### Required Resolution Fields

`id`

Used for stable canonical identity and deterministic tie-breaking.

`name`

Used as the published canonical name for normalization, token matching, candidate scoring, and ranking.

`parentDomainId`

Used to resolve the associated Parent / Master Domain.

### Active Relationship

```text
CanonicalRecord.parentDomainId
        ↓
DomainRecord.id
```

The resolver must use published IDs for this relationship.

The application must not fabricate a missing canonical-to-domain relationship.

—

## Runtime Metadata Contract

Runtime metadata provides information about the generated runtime package.

The runtime metadata contract may include:

```text
RuntimeMetadata
├── version
├── generatedAt
├── sourceVersion
└── publishProfile
```

Runtime metadata is generated by the publishing system.

It is not manually authored by AI Prompt Studio.

—

# Contract 8

## Runtime Resolution Result

**Produced by:**  
`runtime-resolver.js`

**Consumed by:**  
`generator.js`

### Structure

```text
RuntimeResolutionResult
├── canonical
└── domain
```

The result has two valid states.

### Resolved State

```text
RuntimeResolutionResult
├── canonical → CanonicalRecord
└── domain    → DomainRecord
```

### Null Resolution State

```text
RuntimeResolutionResult
├── canonical → null
└── domain    → null
```

A null resolution is valid behavior.

It indicates that no published runtime candidate satisfied the active resolution rules with sufficient confidence.

The resolver must not fabricate knowledge to avoid returning `null`.

—

## Resolution Contract Rules

The active UKA v1.0 resolution flow is:

```text
Creator Idea
        ↓
runtime-resolver.js
        ↓
Candidate Evaluation
        ↓
Scoring
        ↓
Ranking
        ↓
Confidence Gating
        ↓
RuntimeResolutionResult
```

When resolution succeeds:

```text
canonical = resolved CanonicalRecord
domain = resolved DomainRecord
```

When resolution does not satisfy the confidence rules:

```text
canonical = null
domain = null
```

The absence of a valid resolution is not a contract failure.

—

## Public Resolver API Contract

The runtime resolver exposes the following public API:

```text
resolveCanonical
resolveDomain
resolveRuntimeKnowledge
```

### `resolveCanonical`

Input:

```text
Creator Idea
```

Output:

```text
CanonicalRecord
or
null
```

### `resolveDomain`

Input:

```text
CanonicalRecord
or
null
```

Output:

```text
DomainRecord
or
null
```

### `resolveRuntimeKnowledge`

Input:

```text
Creator Idea
```

Output:

```text
RuntimeResolutionResult
```

The public API must remain stable unless a documented contract change is introduced.

—

# Contract 9

## Generator Knowledge Context

**Produced by:**  
`generator.js`

**Derived from:**  
`RuntimeResolutionResult`

**Consumed by:**  
Generated Prompt

### Resolved Behavior

When a valid runtime resolution exists, the generator may add:

```text
KNOWLEDGE CONTEXT

Canonical: [Resolved Canonical]
Domain: [Resolved Master Domain]
```

### Null Behavior

When the Runtime Resolution Result contains no valid canonical resolution, `KNOWLEDGE CONTEXT` is omitted entirely.

The generator must not create substitute knowledge when the resolver returns no valid result.

—

# Contract Rules

Every pipeline stage owns its documented output contract.

Every stage consumes only documented contracts.

Stages may never consume undocumented objects.

Stages may never mutate received immutable contracts.

Stages may only produce their documented output.

Generated knowledge artifacts must not be manually patched.

Application code must not fabricate unpublished UKA knowledge.

Runtime capabilities may be consumed only when officially published and available through the Knowledge Runtime Package.

—

# Validation Rules

Every contract must be validated before consumption where validation is defined by the owning stage.

Validation failures in the knowledge publishing pipeline terminate the affected pipeline execution.

Transformation must not continue on invalid required input.

Runtime resolution failure is different from contract validation failure.

A valid runtime package may produce:

```text
canonical: null
domain: null
```

when creator input does not resolve with sufficient confidence.

This is expected runtime behavior and must not be treated as a malformed contract.

—

# Versioning

Contract versions follow semantic versioning where contract versioning applies.

Breaking contract changes require:

- Architecture review
- ADR review
- Documentation update
- Publisher compatibility validation
- Runtime consumer compatibility validation

Changes to active runtime resolution capability scope require an Architecture Decision Record.

—

# Architecture Boundaries

## UKA Owns

- Authoritative knowledge
- Master Domains
- Canonical Outputs
- Future knowledge capabilities
- Knowledge governance

## Knowledge Importer Owns

- Workbook ingestion
- Workbook validation
- Knowledge normalization
- Knowledge Document generation

## Knowledge Publisher Owns

- Runtime transformation
- Runtime validation
- Runtime package generation
- Runtime metadata

## AI Prompt Studio Runtime Consumer Owns

- Runtime loading
- Resolution against published runtime capabilities
- Candidate scoring
- Candidate ranking
- Confidence gating
- Runtime Resolution Result generation

## Prompt Generator Owns

- Prompt construction
- Consumption of Runtime Resolution Result
- Conditional Knowledge Context inclusion
- Final generated prompt structure

—

# Related Documents

- `ADR-0001.md`
- `ADR-0002.md`
- `ADR-0003.md`
- `ARCHITECTURE.md`
- `PRODUCT_DECISIONS.md`
- `PUBLISHER_PIPELINE.md`
- `IMPORTER_SPEC.md`
- `PUBLISHER_SPEC.md`

—

# Document Status

**Status: LOCKED**

This document is the official data contract specification for the Knowledge Importer, Knowledge Publisher, AI Prompt Studio Runtime Consumer, and Prompt Generator boundaries.

For UKA v1.0, the active runtime resolution contract uses published **Canonical Outputs** and **Master Domains**.

The runtime contract remains forward-compatible with future UKA capabilities.

Intent, Alias, Relationship, and Structured Context are not active runtime resolution capabilities for UKA v1.0 and must not be fabricated or hardcoded in the application layer.

The Runtime Resolution Result explicitly supports deterministic null behavior.

Future implementation must conform to these contracts.