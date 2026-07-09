# Knowledge Engine Architecture

Status: LOCKED

## Overview

AI Prompt Studio adopts **UKA Official Master Baseline v1.0** as its official Knowledge Source.

The UKA workbook is never consumed directly by AI Prompt Studio.

Instead, UKA publishes a versioned **Knowledge Runtime Package** through the Publisher subsystem.

AI Prompt Studio consumes the published runtime package as its runtime knowledge layer.

—

## Runtime Architecture

```
Creator
        │
        ▼
Idea
        │
        ▼
Intent Search
        │
        ▼
Knowledge Runtime Package
        │
 ├── Intent Registry
 ├── Domain Registry
 ├── Canonical Registry
 ├── Relationship Registry
 └── Runtime Metadata
        │
        ▼
Prompt Generator
        │
        ▼
Generated Prompt
```

—

## Knowledge Publishing Pipeline

```
```text
UKA Official Master Baseline (.xlsx)
        │
        ▼
Knowledge Importer
(Excel → Internal JSON)
        │
        ▼
Internal Knowledge JSON
        │
        ▼
Knowledge Publisher
(JSON → Runtime)
        │
        ▼
Knowledge Runtime Package
(runtime/knowledge-runtime.json)
        │
        ▼
AI Prompt Studio
```
```

The Publisher transforms authoring data into optimized runtime packages.

### Importer Responsibilities

The Knowledge Importer is responsible for:

- Reading the UKA Official Master Baseline workbook.
- Validating workbook structure.
- Mapping workbook columns into the internal knowledge model.
- Normalizing authoring data.
- Generating Internal Knowledge JSON.

### Publisher Responsibilities

The Knowledge Publisher is responsible for:

- Reading Internal Knowledge JSON.
- Building runtime registries.
- Validating runtime packages.
- Optimizing runtime data.
- Generating versioned runtime packages.

### Update Workflow

```text
Edit UKA Excel
        │
        ▼
Run Knowledge Importer
        │
        ▼
Internal Knowledge JSON updated
        │
        ▼
Run Knowledge Publisher
        │
        ▼
Knowledge Runtime Package updated
        │
        ▼
Commit & Push
```

### Locked Principles

- UKA Excel is the only human-edited knowledge source.
- Internal Knowledge JSON is generated automatically.
- Runtime packages are generated automatically.
- AI Prompt Studio never reads Excel directly.
- Importer and Publisher have separate responsibilities.

AI Prompt Studio never reads the UKA workbook directly.

—

## Layer Responsibilities

### Authoring Layer

UKA Official Master Baseline

Responsible for:

- Knowledge authoring
- Master Domains
- Canonical Registry
- Context
- Alias
- Cluster
- Hub
- Governance

—

### Publishing Layer

Publisher

Responsible for:

- Validation
- Transformation
- Runtime optimization
- Package generation
- Versioning

—

### Runtime Layer

AI Prompt Studio

Responsible for:

- Creator Experience
- Intent Search
- Prompt Generation
- UI
- Settings

—

## Runtime Registries

The Knowledge Runtime Package is composed of independent registries.

### Intent Registry

Contains creator intents and their relationships to domains.

### Domain Registry

Contains published runtime domains.

### Canonical Registry

Contains canonical concepts and semantic metadata.

### Relationship Registry

Contains ID-based relationships between runtime entities.

### Runtime Metadata

Contains:

- version
- generatedAt
- publishProfile
- sourceVersion

—

## Intent Resolution

The Intent Engine performs the following flow.

```
Creator Idea

↓

Intent Detection

↓

Intent Registry

↓

Domain Registry

↓

Canonical Registry

↓

Context Resolution

↓

Prompt Generator

↓

Generated Prompt
```

—

## Runtime Principles

- Runtime is ID-first.
- Runtime is immutable.
- Runtime packages are generated, never edited manually.
- AI Prompt Studio consumes published runtime packages only.
- UKA remains the single source of truth.

—

## Future Expansion

Future runtime packages may include additional registries such as:

- Vocabulary Registry
- Persona Registry
- Style Registry
- Workflow Registry

without requiring changes to AI Prompt Studio architecture.

—

## Final Status

Status

LOCKED

The Knowledge Runtime Package becomes the official runtime contract between UKA Publisher and AI Prompt Studio.