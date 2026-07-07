# AI Prompt Studio
## AUTHENTICATION.md

Status: LOCKED

Version: 1.0

Last Updated: July 2026

—

# Purpose

This document defines the authentication architecture of AI Prompt Studio.

Authentication exists to help creators securely return to their own studio while preserving privacy, continuity, and ownership.

—

# Philosophy

> A creator should never feel forced to migrate.

Creators simply gain another way to enter their studio.

—

# Core Principles

## 1. Permanent Creator ID

Every creator receives a permanent internal Creator ID.

Creator ID:

- never changes
- is never reused
- is not exposed publicly

Creator ID is the primary identity inside AI Prompt Studio.

—

## 2. Creator Name

Creator Name is the public identity.

Creators may choose any Creator Name.

Duplicate Creator Names are allowed.

The system differentiates creators using Creator ID.

—

## 3. Passkey

During Private Alpha and Beta, creators authenticate using:

- Creator Name
- Passkey

This remains a first-class authentication method.

It will never be removed.

—

## 4. Linked Authentication

Future authentication methods include:

- Google
- Apple
- GitHub

These methods are linked to the existing Creator ID.

They do not replace Creator Name + Passkey.

—

# Account Linking

One Creator ID may contain multiple authentication methods.

Example

Creator ID

↓

Creator Name + Passkey

Google

Apple

GitHub

All point to the same creator workspace.

—

# Migration Policy

Creators are never forced to migrate.

Existing creators may continue using:

- Creator Name
- Passkey

for as long as they choose.

Adding Google or Apple simply adds another login method.

—

# Workspace Ownership

Workspace ownership belongs to Creator ID.

Not to:

- Creator Name
- Email
- Google
- Apple
- GitHub

Authentication methods may change.

Workspace ownership never changes.

—

# Privacy

Authentication is independent from prompt content.

Prompt contents are never stored by default.

Authentication data must never expose creator prompts.

—

# Security Principles

Authentication should support:

- secure identity
- minimal data collection
- account recovery
- linked sign-in
- future extensibility

without compromising creator privacy.

—

# Future Roadmap

Private Alpha

↓

100 Happy Creators

↓

Beta

↓

Public Release

Authentication evolves without breaking Creator IDs.

—

# Final Status

Status

LOCKED

Future authentication changes must preserve Creator ID continuity.