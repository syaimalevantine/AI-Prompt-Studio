# AI Prompt Studio
## PUBLISHER_SPEC.md

Status: LOCKED

Version: 1.0

Last Updated: July 2026

—

# Purpose

This document defines the publishing pipeline that transforms the UKA Official Master Baseline into runtime packages consumable by AI Prompt Studio.

The Publisher separates authoring data from runtime data.

—

# Philosophy

UKA is the Authoring System.

AI Prompt Studio is the Runtime System.

The Publisher is the bridge between them.

—

# Source of Truth

Publisher reads only:

UKA Official Master Baseline

No runtime data is edited manually.

—

# Input

Publisher may consume the following UKA registries:

- Master Domains
- Canonical Outputs
- Knowledge Clusters
- Hub Domains
- Context
- Alias
- Intent Mapping

Governance artifacts are excluded from runtime.

—

# Transformation Pipeline

Publisher performs the following steps:

1. Read UKA Master Baseline
2. Validate registry integrity
3. Resolve relationships
4. Normalize runtime structure
5. Remove authoring-only data
6. Generate runtime packages
7. Validate generated packages

—

# Runtime Packages

Publisher may generate multiple packages.

## Core

intent-library-core.json

Contains only high-priority intents.

—

## Full

intent-library-full.json

Contains the complete published knowledge base.

—

## Mobile

intent-library-mobile.json

Optimized for lightweight devices.

—

## Enterprise

intent-library-enterprise.json

Contains enterprise-specific runtime packages.

—

# Runtime Data

Each Intent includes:

- Intent ID
- Intent Name
- Master Domain
- Canonical
- Alias
- Context

Optional:

- Cluster
- Hub

—

# Metadata

Every published package contains:

- version
- generatedAt
- source
- publishProfile

Example

Version

1.0.0

Publish Profile

Core

Generated

2026-07-07T10:15:00Z

—

# Runtime Contract

AI Prompt Studio never reads the UKA workbook directly.

AI Prompt Studio only consumes published runtime packages.

—

# Responsibilities

## UKA

Responsible for:

- Knowledge authoring
- Governance
- Canonical maintenance
- Registry management

—

## Publisher

Responsible for:

- Validation
- Transformation
- Packaging
- Versioning

—

## AI Prompt Studio

Responsible for:

- Intent Search
- Prompt Generation
- Creator Experience

—

# Design Principles

- Single Source of Truth
- Publish Once
- Read Many
- Immutable Runtime Packages
- Versioned Outputs
- Platform Independent

—

# Future Roadmap

Version 1.0

Static Publisher

↓

Version 1.1

Incremental Publishing

↓

Version 2.0

Automated Continuous Publishing

—

# Final Status

Status

LOCKED

Changes to the Publisher Specification require a new Architecture Decision Record.