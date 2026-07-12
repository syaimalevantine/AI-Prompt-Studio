# Knowledge Engine Architecture

**Status:** LOCKED  
**Current Runtime Scope:** UKA v1.0  
**Architecture State:** Fase 7–8 Complete

—

## Overview

AI Prompt Studio adopts **UKA Official Master Baseline v1.0** as its official Knowledge Source.

The UKA workbook is never consumed directly by AI Prompt Studio.

Instead, knowledge moves through a controlled publishing pipeline:

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
        ↓
Knowledge Resolution
        ↓
Prompt Generator
        ↓
Generated Prompt
```

The **Knowledge Runtime Package** is the official runtime contract between the UKA publishing system and AI Prompt Studio.

AI Prompt Studio consumes only published runtime knowledge. It does not read, infer from, or depend directly on the UKA workbook.

—

## Source of Truth

The **UKA Official Master Baseline** is the single human-edited knowledge source.

### Locked Principles

- UKA remains the single Source of Truth.
- The UKA workbook is the authoring layer.
- AI Prompt Studio never reads the UKA workbook directly.
- Generated knowledge artifacts are never edited manually.
- Application code must not fabricate unpublished UKA knowledge.
- Runtime capabilities are consumed only when officially published by the Knowledge Runtime Package.

—

## Knowledge Publishing Pipeline

```text
UKA Official Master Baseline (.xlsx)
        ↓
Knowledge Importer
        ↓
knowledge-internal.json
        ↓
Knowledge Publisher
        ↓
knowledge-runtime.json
        ↓
AI Prompt Studio
```

The publishing pipeline separates authoring data from runtime data.

This separation allows the UKA workbook to retain authoring, governance, audit, and documentation information without exposing unnecessary data to the application runtime.

—

## Layer Responsibilities

### 1. Authoring Layer

**System:** UKA Official Master Baseline

Responsible for:

- Knowledge authoring
- Master Domains
- Canonical Outputs
- Governance
- Source-of-truth maintenance
- Future knowledge capabilities when officially introduced by UKA

The authoring layer is human-maintained.

—

### 2. Knowledge Importer

The Knowledge Importer transforms the UKA workbook into the Internal Knowledge Contract.

Responsible for:

- Reading the UKA Official Master Baseline workbook
- Validating workbook structure
- Mapping workbook data into the internal knowledge model
- Normalizing authoring data
- Generating `knowledge-internal.json`

The Knowledge Importer does not generate runtime packages.

—

### 3. Internal Knowledge Contract

**Artifact:**

```text
knowledge-internal.json
```

The Internal Knowledge Contract is the official interface between the Knowledge Importer and the Knowledge Publisher.

Responsible for:

- Normalized knowledge data
- Stable internal representation
- Importer output
- Publisher input

### Locked Principles

- Generated automatically
- Never edited manually
- Not consumed directly by AI Prompt Studio
- Independent from the runtime package contract

—

### 4. Knowledge Publisher

The Knowledge Publisher transforms the Internal Knowledge Contract into the Knowledge Runtime Package.

Responsible for:

- Reading `knowledge-internal.json`
- Validating publishable knowledge
- Transforming internal knowledge into runtime data
- Optimizing runtime data
- Generating runtime metadata
- Generating versioned runtime packages

The Knowledge Publisher does not read the UKA workbook directly.

—

### 5. Knowledge Runtime Package

**Artifact:**

```text
runtime/knowledge-runtime.json
```

The Knowledge Runtime Package is the official runtime contract consumed by AI Prompt Studio.

### Runtime Principles

- Runtime is generated, never manually authored.
- Runtime is immutable from the application perspective.
- Runtime is versioned.
- Runtime is optimized for application consumption.
- AI Prompt Studio consumes published runtime packages only.
- The runtime contract remains forward-compatible with future UKA capabilities.

—

## Current Runtime Capability Scope — UKA v1.0

AI Prompt Studio builds Knowledge Resolution only against capabilities actually published by the current Knowledge Runtime Package.

For **UKA v1.0**, the active resolution scope is:

```text
Canonical Outputs
        +
Master Domains
```

These are the knowledge capabilities currently used by AI Prompt Studio for runtime resolution.

### Current Resolution Capability

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

—

## Forward-Compatible Knowledge Capabilities

The architecture is designed to support additional knowledge capabilities when they are officially published by UKA.

Planned or future capabilities may include:

- Intent
- Alias
- Relationship
- Structured Context
- Additional runtime registries

These capabilities must not be fabricated, inferred as authoritative knowledge, or hardcoded in the AI Prompt Studio application layer.

They may be integrated only when they are officially published through the Knowledge Runtime Package.

### Locked Scope Decision

> AI Prompt Studio shall build Knowledge Resolution against the capabilities actually published by the current Knowledge Runtime Package.
>
> For UKA v1.0, resolution is based on Canonical Outputs and Master Domains.
>
> Planned knowledge capabilities such as Intent, Alias, Relationship, and Structured Context shall not be fabricated or hardcoded in the application layer.
>
> The runtime contract remains forward-compatible so these capabilities can be integrated when officially published by UKA.

—

## Runtime Consumer Integration

AI Prompt Studio consumes the published runtime through the runtime consumer layer.

The active application flow is:

```text
UKA Official Master Baseline
        ↓
Knowledge Importer
        ↓
knowledge-internal.json
        ↓
Knowledge Publisher
        ↓
knowledge-runtime.json
        ↓
runtime-loader.js
        ↓
runtime-resolver.js
        ↓
generator.js
        ↓
Generated Prompt
```

### `runtime-loader.js`

Responsible for:

- Loading the published Knowledge Runtime Package
- Providing runtime access to the application
- Maintaining runtime cache behavior
- Exposing runtime metadata and runtime data to consumers

The loader does not perform knowledge authoring or fabricate missing capabilities.

—

### `runtime-resolver.js`

Responsible for:

- Receiving the Creator Idea
- Resolving against published canonical knowledge
- Resolving the associated parent or Master Domain
- Ranking valid resolution candidates
- Applying confidence rules
- Returning a deterministic null result when confidence is insufficient

The resolver operates only against published runtime knowledge.

—

### `generator.js`

Responsible for:

- Receiving the Creator Idea and application settings
- Consuming the resolver result
- Adding `KNOWLEDGE CONTEXT` only when resolution succeeds
- Generating the final prompt structure

The generator does not invent knowledge when resolution returns no valid result.

—

## Canonical Resolution

Canonical Resolution is the active Knowledge Resolution capability for UKA v1.0.

The resolver uses deterministic resolution behavior based on the published runtime data.

### Resolution Pipeline

```text
Creator Idea
        ↓
Candidate Evaluation
        ↓
Scoring
        ↓
Ranking
        ↓
Confidence Gating
        ↓
Valid Resolution
        │
        ├── YES → Canonical + Master Domain
        │
        └── NO  → null
```

### Locked Resolution Principles

- Resolution is based only on published runtime knowledge.
- Candidate evaluation is deterministic.
- Candidates are scored and ranked.
- Confidence gating protects against weak matches.
- Generic or unsupported input must not force a match.
- Missing knowledge returns `null`.
- No canonical knowledge is fabricated.
- No domain knowledge is fabricated.
- The application remains functional when no knowledge resolution is available.

—

## Knowledge Context Behavior

When resolution succeeds, the generated prompt may include:

```text
KNOWLEDGE CONTEXT

Canonical: [Resolved Canonical]
Domain: [Resolved Master Domain]
```

When resolution does not meet the required confidence threshold, `KNOWLEDGE CONTEXT` is omitted entirely.

This is intentional behavior.

The absence of Knowledge Context does not represent an application failure. It represents a deterministic null resolution for unsupported, generic, ambiguous, or insufficiently confident input.

—

## Resolution Validation

The UKA v1.0 Canonical Resolution implementation was validated through live application testing.

### Locked Test Results

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

The validated behavior confirms:

- Exact supported concepts can resolve.
- Relevant reordered wording can resolve.
- Generic requests are not forced into a canonical.
- False positives are rejected.
- Knowledge coverage gaps return deterministic null behavior.

—

## Update Workflow

Knowledge updates follow the controlled pipeline:

```text
Edit UKA Official Master Baseline
        ↓
Run Knowledge Importer
        ↓
Generate knowledge-internal.json
        ↓
Run Knowledge Publisher
        ↓
Generate knowledge-runtime.json
        ↓
Runtime Consumer loads published runtime
        ↓
AI Prompt Studio resolves against current published knowledge
```

### Locked Update Principles

- UKA is edited at the source.
- Generated artifacts are not manually patched.
- The Importer owns workbook-to-internal transformation.
- The Publisher owns internal-to-runtime transformation.
- The application consumes the published runtime package.
- Knowledge capability expansion begins in UKA and the publishing pipeline, not through application-layer hardcoding.

—

## Architecture Boundaries

### UKA Owns

- Authoritative knowledge
- Knowledge definitions
- Master Domains
- Canonical Outputs
- Future knowledge capabilities
- Knowledge governance

### Knowledge Importer Owns

- Workbook ingestion
- Structural validation
- Normalization
- Internal contract generation

### Knowledge Publisher Owns

- Runtime transformation
- Runtime validation
- Runtime optimization
- Runtime package generation
- Runtime metadata

### AI Prompt Studio Runtime Consumer Owns

- Runtime loading
- Resolution against published capabilities
- Confidence-controlled knowledge selection
- Prompt generation
- Creator experience

—

## Product Principle

The architecture must preserve the following product principle:

> **AI Prompt Studio learns from behavior, not from creators’ work.**

Knowledge intelligence must come from governed UKA knowledge and explicitly designed product systems.

Creator input must not be treated as a hidden authoring source for the UKA knowledge base.

—

## Future Expansion

The Knowledge Runtime Package may expand with additional officially published capabilities.

Possible future capabilities include:

- Intent
- Alias
- Relationship
- Structured Context
- Persona
- Style
- Workflow

A Vocabulary Registry is not part of the current development scope and may be considered as a future enhancement.

Future capabilities must enter the application through the governed knowledge pipeline and published runtime contract.

```text
UKA
  ↓
Importer
  ↓
Internal Knowledge Contract
  ↓
Publisher
  ↓
Knowledge Runtime Package
  ↓
AI Prompt Studio
```

This preserves the architecture boundary and prevents application-layer knowledge fabrication.

—

## Phase Status

```text
FASE 1 — Product & UI Foundation
COMPLETE

FASE 2 — Prompt Builder / Generator Foundation
COMPLETE

FASE 3 — UKA Knowledge System
COMPLETE

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

FASE 10 — Testing / Hardening / Release
PENDING
```

—

## Final Status

**Status: LOCKED**

The Knowledge Runtime Package is the official runtime contract between the UKA publishing system and AI Prompt Studio.

For UKA v1.0, AI Prompt Studio performs Knowledge Resolution against the capabilities currently published and supported by the runtime: **Canonical Outputs and Master Domains**.

The current resolution architecture is validated through scoring, ranking, confidence gating, deterministic null fallback, and 5/5 live application tests.

Future knowledge capabilities will be integrated only when officially published by UKA through the governed knowledge pipeline.

**Fase 7 — Runtime Consumer Integration: COMPLETE / LOCKED**  
**Fase 8 — Knowledge Resolution / Intelligence: COMPLETE / LOCKED for UKA v1.0 scope**  
**Next: Fase 9 — Full App Integration & UX**