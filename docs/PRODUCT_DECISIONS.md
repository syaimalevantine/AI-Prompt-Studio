# AI Prompt Studio
## PRODUCT_DECISIONS.md

Status: LOCKED
Version: 1.0
Last Updated: July 2026

—

# Purpose

This document records all product decisions that have been approved and locked.

These decisions become the official source of truth for AI Prompt Studio.

Implementation must follow these decisions.

—

# PD-0001

Title

Mobile First

Status

LOCKED

Decision

AI Prompt Studio is designed mobile-first.

Desktop layouts adapt from the mobile experience, not the opposite.

—

# PD-0002

Title

Single-column Layout

Status

LOCKED

Decision

The primary creator workflow uses a single-column layout to maximize focus and reduce cognitive load.

—

# PD-0003

Title

Intent Library replaces Categories

Status

LOCKED

Decision

Categories become an internal implementation detail.

Creators interact with the Intent Library instead of categories.

—

# PD-0004

Title

UKA becomes the Knowledge Engine

Status

LOCKED

Decision

UKA Official Master Baseline v1.0 is the official Intent Library and Knowledge Engine of AI Prompt Studio.

All future intent expansion originates from UKA.

—

# PD-0005

Title

Templates are Optional

Status

LOCKED

Decision

Templates are optional helpers.

Creators may start directly from an idea.

—

# PD-0006

Title

Smart Search

Status

LOCKED

Decision

Search appears only when needed.

Search uses Intent, Canonical, Context, and Alias from UKA.

—

# PD-0007

Title

Creator Identity

Status

LOCKED

Decision

Users are called Creators.

Every Creator owns a permanent Creator ID.

Creator Name is the public identity.

Additional authentication methods (Google, Apple, GitHub) may be linked without changing Creator ID.

—

# PD-0008

Title

Privacy by Design

Status

LOCKED

Decision

Prompt content is never stored by default.

Only anonymous metadata required for product analytics may be collected.

—

# PD-0009

Title

Analytics Architecture

Status

LOCKED

Decision

Level 1

Product Dashboard

Aggregate analytics only.

Level 2

Creator Dashboard

Creator-specific metadata only.

Level 3

Prompt Content

Not implemented.

Prompt contents are not accessible by default.

—

# PD-0010

Title

Footer

Status

LOCKED

Decision

Before 100 Happy Creators

Built with feedback from our early creators.

Made with ☕ by Syaima Levantine.

After sufficient validated usage

Loved by XX% of creators.

Made with ☕ by Syaima Levantine.

—

# PD-0011

Title

Creator Philosophy

Status

LOCKED

Decision

A creator should never feel forced to migrate.

Creators simply gain another way to enter their studio.

—
—

# PD-0012

Title

Publisher Build Pipeline

Status

LOCKED

Decision

The Publisher is implemented as a staged build pipeline.

Each stage has one clearly defined responsibility.

Each stage produces immutable output that becomes the input of
the next stage.

Validation must always complete before any transformation stage.

Builder components must never modify upstream data.

The Publisher remains the only subsystem authorized to generate
Knowledge Runtime Packages.

Implementation details are documented in
PUBLISHER_PIPELINE.md.

This decision complements ADR-0002 and does not change the
official runtime architecture.

—

# PD-0013

## Title

UKA v1.0 Active Knowledge Capability Scope

## Status

LOCKED

## Decision

UKA remains the official Knowledge Engine and Source of Truth for AI Prompt Studio.

For UKA v1.0, the active runtime resolution capability uses:

```text
Canonical Outputs
        +
Master Domains
```

Intent, Alias, Relationship, and Structured Context are future knowledge capabilities.

They must not be fabricated, inferred as authoritative UKA knowledge, or hardcoded in the AI Prompt Studio application layer.

These capabilities may become active only when they are officially authored, governed, published, and available through the Knowledge Runtime Package.

This decision clarifies the current implementation scope of PD-0003 and PD-0004.

The long-term creator-first and Intent-oriented product direction remains valid, but an active authoritative Intent Library must not be represented as available before UKA officially publishes the required capability.

This decision conforms to ADR-0003.

—

# PD-0014

## Title

Creator Entry Experience

## Status

LOCKED

## Decision

The primary creator entry point is the Creator Idea through the Prompt Canvas.

Creators should be able to begin directly from what they want to accomplish.

The creator experience must not require creators to navigate:

- Internal categories
- UKA registries
- Canonical IDs
- Domain IDs
- Internal taxonomy
- Runtime resolution mechanics

Categories remain an internal implementation detail where applicable.

The application may use published runtime intelligence internally without exposing the underlying knowledge architecture as a required creator workflow.

The current UKA v1.0 creator flow is conceptually:

```text
Creator Idea
        ↓
Optional Runtime Knowledge Resolution
        ↓
Prompt Construction
        ↓
Generated Prompt
```

This decision clarifies the current creator experience described by PD-0003.

Intent may become part of the runtime intelligence layer in the future when officially published by UKA, but the application must not fabricate an Intent Library to provide the creator entry experience.

—

# PD-0015

## Title

Legacy Template System Retirement

## Status

LOCKED

## Decision

The Prompt Engine does not depend on the legacy static template system.

The primary prompt generation model is:

```text
Creator Idea
        +
Application Settings
        +
Optional Published Runtime Knowledge
        ↓
Generated Prompt
```

Legacy creator-facing templates are to be removed or refactored during Fase 9 — Full App Integration & UX.

The legacy template selector must not remain the primary creator entry point.

A separate “Start from Scratch” option is not required because the Prompt Canvas itself is the direct starting point.

Removing the legacy template system does not remove the Prompt Engine.

The Prompt Engine remains the system responsible for prompt construction.

This decision supersedes PD-0005 for the current product architecture.

—

# PD-0016

## Title

Runtime-Aware Discovery and Search

## Status

LOCKED

## Decision

Search or discovery features must use only knowledge capabilities that are officially published and available through the active Knowledge Runtime Package.

For UKA v1.0, active runtime knowledge resolution uses:

```text
Canonical Outputs
        +
Master Domains
```

Intent, Alias, Relationship, and Structured Context must not be used as active authoritative search or discovery signals until they are officially published by UKA.

Search remains an optional product capability and should appear only when it provides meaningful value to the creator experience.

The application must not create hardcoded Intent, Alias, Relationship, or Structured Context datasets to simulate future Smart Search capability.

This decision supersedes the active capability assumptions in PD-0006 while preserving the long-term possibility of richer governed discovery.

—

# PD-0017

## Title

Footer and Social Proof Threshold

## Status

LOCKED

## Decision

Before AI Prompt Studio reaches 100 Happy Creators, the footer must not display percentage-based creator satisfaction claims.

The pre-threshold footer is:

```text
Made with ☕ by Syaima Levantine.
```

After AI Prompt Studio reaches at least 100 Happy Creators and sufficient validated usage exists to support a meaningful percentage, the footer may display:

```text
Loved by XX% of creators.
Made with ☕ by Syaima Levantine.
```

The percentage must be based on validated product data.

It must not be fabricated, estimated without sufficient evidence, or displayed before the minimum threshold is reached.

The exact percentage must reflect the validated metric available at that time.

This decision supersedes the pre-threshold wording in PD-0010 and clarifies the minimum threshold for percentage-based social proof.

—

# PD-0018

## Title

Runtime Knowledge Context Behavior

## Status

LOCKED

## Decision

For UKA v1.0, AI Prompt Studio may enrich generated prompts with published runtime knowledge when resolution succeeds.

The active knowledge context may contain:

```text
Canonical: [Resolved Canonical]
Domain: [Resolved Master Domain]
```

Knowledge Context is conditional.

When runtime resolution returns:

```text
canonical: null
domain: null
```

the Knowledge Context section is omitted entirely.

Prompt generation must continue.

The application must not fabricate substitute knowledge to avoid a null resolution.

No Knowledge Context is preferable to incorrect Knowledge Context.

This behavior is part of the current creator experience and must remain consistent with ADR-0003, DATA_CONTRACTS.md, INTENT_ENGINE.md, and PROMPT_ENGINE.md.

—

# PD-0019

## Title

Knowledge Intelligence Boundary

## Status

LOCKED

## Decision

AI Prompt Studio consumes governed knowledge through the published Knowledge Runtime Package.

The application must not bypass the governed knowledge pipeline by creating private authoritative knowledge systems in the application layer.

The governed flow is:

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
        ↓
AI Prompt Studio
```

Future knowledge capabilities must enter the application through this pipeline.

This includes future:

- Intent
- Alias
- Relationship
- Structured Context

Application algorithms may perform matching, scoring, ranking, confidence gating, and other implementation behavior against published knowledge.

These algorithms do not become an alternative Source of Truth.

This decision preserves the product principle:

> **AI Prompt Studio learns from behavior, not from creators’ work.**

Creator work must not silently become authoritative UKA knowledge.

# Document Status

Status

LOCKED

This document may only change through a new approved Product Decision.