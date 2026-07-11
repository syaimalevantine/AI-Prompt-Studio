# PUBLISHER_PIPELINE.md

Status: LOCKED
Version: 1.0
Last Updated: July 2026

—

# Purpose

This document defines the internal Publisher pipeline used to
transform the UKA Official Master Baseline into runtime-ready
knowledge packages.

This document describes implementation details.

Architectural decisions remain governed by ADR-0002.

—

# Publisher Overview

The Publisher is implemented as a staged build pipeline.

Each stage has one responsibility.

Each stage produces immutable output for the next stage.

No stage modifies data produced by previous stages.

—

# Pipeline

```
UKA Official Master Baseline
            │
            ▼
Importer Configuration
            │
            ▼
Workbook Profile
            │
            ▼
Workbook Resolver
            │
            ▼
Workbook Validation
            │
            ▼
Workbook Loader
            │
            ▼
Import Context
            │
            ├──────────────────────────────┐
            ▼                              ▼
Metadata Builder                  Statistics Builder
            │                              │
            └──────────────┬───────────────┘
                           ▼
                 Knowledge Builder
                           │
                           ▼
             knowledge-internal.json
                           │
                           ▼
                  Runtime Publisher
                           │
                           ▼
            Knowledge Runtime Package
                           │
                           ▼
                  AI Prompt Studio
```

—

# Pipeline Stages

## P1 — Importer Configuration

Loads importer configuration.

Responsibilities

- Load importer configuration.
- Validate configuration.
- Resolve project paths.

Output

Configuration

—

## P2 — Workbook Profile

Loads the active workbook profile.

Responsibilities

- Load workbook profile.
- Validate profile schema.
- Resolve workbook definition.

Output

Workbook Profile

—

## P3 — Workbook Resolver

Locates the workbook.

Responsibilities

- Resolve workbook path.
- Verify workbook exists.

Output

Workbook Path

—

## P4 — Workbook Validation

Validates workbook structure.

Responsibilities

- Validate worksheet existence.
- Validate required columns.
- Validate workbook integrity.

Output

Validated Workbook

—

## P5 — Workbook Loader

Loads workbook contents.

Responsibilities

- Read workbook.
- Convert worksheets into objects.
- Build import data.

Output

Workbook Data

—

## P6 — Import Context

Creates a normalized context used by all builders.

Responsibilities

- Combine configuration.
- Combine profile.
- Combine workbook.
- Combine workbook data.

Output

Import Context

—

## P7 — Metadata Builder

Generates metadata.

Responsibilities

- Profile metadata.
- Import timestamp.
- Version metadata.

Output

Metadata

—

## P8 — Statistics Builder

Generates build statistics.

Responsibilities

- Count Core Domains.
- Count Master Domains.
- Count Canonical Outputs.
- Count Knowledge Infrastructure.

Output

Statistics

—

## P9 — Knowledge Builder

Builds the internal knowledge document.

Responsibilities

- Build Core Domains.
- Build Master Domains.
- Build Canonical Outputs.
- Build Knowledge Infrastructure.
- Assemble Knowledge Document.

Output

knowledge-internal.json

—

## P10 — Runtime Publisher

Generates runtime packages.

Responsibilities

- Registry validation.
- Relationship resolution.
- Runtime optimization.
- Package generation.
- Runtime versioning.

Output

Knowledge Runtime Package

—

# Data Flow

```
Configuration
        │
        ▼
Workbook Profile
        │
        ▼
Workbook
        │
        ▼
Workbook Data
        │
        ▼
Import Context
        │
        ▼
Knowledge Document
        │
        ▼
Knowledge Runtime Package
```

—

# Pipeline Principles

The Publisher pipeline follows these principles.

- Single Source of Truth.
- Single Responsibility.
- Immutable pipeline.
- Validation before transformation.
- Deterministic output.
- Versioned artifacts.
- Platform independent.

—

# Source of Truth

UKA Official Master Baseline is the only editable knowledge source.

Workbook Profile defines the workbook schema.

Importer transforms workbook data.

Publisher generates runtime packages.

AI Prompt Studio consumes runtime packages only.

—

# Related Documents

- ADR-0002.md
- PRODUCT_DECISIONS.md
- PUBLISHER_SPEC.md
- IMPORTER_SPEC.md
- DATA_CONTRACTS.md

—

# Document Status

Status

LOCKED

Future implementation improvements must preserve the architectural contract defined by ADR-0002.