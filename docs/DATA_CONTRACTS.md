# DATA_CONTRACTS.md

Status: LOCKED

Version: 1.0

Last Updated: July 2026

—

# Purpose

This document defines every data contract exchanged between
Importer, Publisher, and AI Prompt Studio.

A data contract specifies the exact structure that a stage
produces and the next stage consumes.

Stages must never assume undocumented fields.

Every change to a contract requires updating this document.

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

# Contract 1

## Configuration

Produced by

Importer Configuration

Consumed by

Workbook Profile

Structure

```
Configuration
├── importer
├── source
├── profile
├── schema
├── output
├── validation
└── logging
```

Immutable

YES

—

# Contract 2

## Workbook Profile

Produced by

Workbook Profile Loader

Consumed by

Workbook Validator

Workbook Loader

Structure

```
WorkbookProfile
├── profile
├── workbook
├── sheets
└── validation
```

Immutable

YES

—

# Contract 3

## Workbook

Produced by

Workbook Loader

Consumed by

Workbook Validator

Workbook Data Loader

Structure

```
Workbook
├── SheetNames
└── Sheets
```

Immutable

YES

—

# Contract 4

## Workbook Data

Produced by

Workbook Data Loader

Consumed by

Import Context

Structure

```
WorkbookData
├── coreDomains[]
├── masterDomains[]
├── canonicalOutputs[]
└── knowledgeInfrastructure[]
```

Immutable

YES

—

# Contract 5

## Import Context

Produced by

Import Context Builder

Consumed by

Metadata Builder

Statistics Builder

Knowledge Builder

Structure

```
ImportContext
├── configuration
├── profile
├── workbook
├── workbookPath
└── data
```

Immutable

YES

—

# Contract 6

## Knowledge Document

Produced by

Knowledge Builder

Consumed by

Runtime Publisher

Structure

```
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

Immutable

YES

—

# Contract 7

## Knowledge Runtime Package

Produced by

Publisher

Consumed by

AI Prompt Studio

Structure

```
KnowledgeRuntimePackage
├── runtime
├── registries
├── metadata
└── version
```

Immutable

YES

—

# Contract Rules

Every pipeline stage owns exactly one output contract.

Every stage consumes one or more documented contracts.

Stages may never consume undocumented objects.

Stages may never mutate received contracts.

Stages may only produce their documented output.

—

# Validation Rules

Every contract must be validated before consumption.

Validation failures terminate the pipeline immediately.

Transformation is never executed on invalid contracts.

—

# Versioning

Contract versions follow semantic versioning.

Breaking contract changes require:

- Architecture review
- ADR review
- Documentation update
- Publisher compatibility validation

—

# Related Documents

- ADR-0002.md
- PRODUCT_DECISIONS.md
- PUBLISHER_PIPELINE.md
- IMPORTER_SPEC.md
- PUBLISHER_SPEC.md

—

# Document Status

Status

LOCKED

This document is the official contract specification for every
Publisher pipeline stage.

Future implementation must conform to these contracts.