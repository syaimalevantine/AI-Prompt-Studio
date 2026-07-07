# AI Prompt Studio

## PUBLISHER_SPEC.md

Status: LOCKED

Version: 2.0

Last Updated: July 2026

—

# Purpose

This document defines the Publisher subsystem of AI Prompt Studio.

The Publisher transforms the UKA Official Master Baseline into versioned Knowledge Runtime Packages.

The Publisher separates authoring data from runtime data.

—

# Philosophy

UKA is the Authoring System.

Publisher is the Build System.

AI Prompt Studio is the Runtime System.

Knowledge is authored once, published once, and consumed many times.

—

# Source of Truth

Publisher reads only:

**UKA Official Master Baseline**

No runtime package is edited manually.

All runtime packages are generated.

—

# Input

Publisher consumes the following UKA registries:

- Master Domains
- Canonical Registry
- Context
- Alias
- Hub
- Cluster
- Relationships
- Intent Mapping

Governance documents are excluded.

Release Notes are excluded.

Audit History is excluded.

Architecture Decisions are excluded.

—

# Publishing Pipeline

```
UKA Official Master Baseline
        │
        ▼
Registry Validation
        │
        ▼
Relationship Resolution
        │
        ▼
Runtime Transformation
        │
        ▼
Package Validation
        │
        ▼
Knowledge Runtime Package
```

—

# Knowledge Runtime Package

The Publisher generates runtime packages composed of independent registries.

## Intent Registry

Contains runtime intents.

—

## Domain Registry

Contains published domains.

—

## Canonical Registry

Contains canonical concepts.

—

## Relationship Registry

Contains ID-based relationships between runtime entities.

—

## Runtime Metadata

Contains:

- version
- generatedAt
- sourceVersion
- publishProfile

—

# Publish Profiles

Publisher supports multiple runtime profiles.

## Core

High-priority runtime knowledge.

—

## Full

Complete published runtime knowledge.

—

## Mobile

Optimized runtime package for lightweight devices.

—

## Enterprise

Enterprise-specific runtime package.

—

# Runtime Principles

Runtime follows the following principles.

- Registry-based
- ID-first
- Immutable
- Versioned
- Platform-independent

—

# Runtime Contract

AI Prompt Studio never consumes the UKA workbook.

AI Prompt Studio consumes only published Knowledge Runtime Packages.

Knowledge Runtime Packages become the official runtime contract.

—

# Responsibilities

## UKA

Responsible for:

- Knowledge authoring
- Governance
- Registry management
- Canonical maintenance

—

## Publisher

Responsible for:

- Validation
- Transformation
- Packaging
- Runtime optimization
- Versioning

—

## AI Prompt Studio

Responsible for:

- Intent Search
- Prompt Generation
- Creator Experience

—

# Validation

Every published runtime package must:

- pass schema validation
- preserve registry integrity
- preserve relationship integrity
- preserve runtime compatibility

Publishing fails if validation fails.

—

# Future Roadmap

Version 1.0

Static Publisher

↓

Version 1.1

Incremental Publishing

↓

Version 2.0

Continuous Publishing

↓

Version 3.0

Automated Knowledge Distribution

—

# Final Status

Status

LOCKED

Changes to the Publisher architecture require a new Architecture Decision Record.