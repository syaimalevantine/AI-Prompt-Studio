# Knowledge Importer Schema

## Purpose

This directory contains the schema, configuration, and importer logic used to convert a UKA Workbook into the internal knowledge format used by AI Prompt Studio.

The importer acts as a validation layer between the workbook and the runtime knowledge.

Pipeline:

```
UKA Workbook (.xlsx)
        │
        ▼
Knowledge Importer
        │
        ▼
knowledge-internal.json
        │
        ▼
Knowledge Publisher
        │
        ▼
knowledge-runtime.json
```

—

## Files

### import-config.json

Defines the importer configuration.

Includes:

- workbook location
- profile selection
- schema definition
- output location
- validation rules
- logging options

—

### knowledge-import.schema.json

Defines the structure expected from every workbook profile.

This schema is treated as the contract between the workbook and the importer.

—

### import.js

Main importer implementation.

Responsibilities:

- load configuration
- load workbook profile
- validate workbook
- load worksheet data
- build internal knowledge document
- export knowledge JSON

—

## Design Principles

- deterministic
- schema-first
- fail-fast validation
- reproducible imports
- portable architecture
- implementation independent

—

## Version

Current Version:

1.0.0