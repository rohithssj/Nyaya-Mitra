# Nyaya Mitra Agent Instructions

You are working on **Nyaya Mitra**, an AI Legal Rights Navigator. This document outlines the core rules, architecture, and design system you must follow when assisting with this project.

## Product Principles
- **Calm & Minimal**: The user is likely in distress. The interface must reduce cognitive load.
- **Trustworthy & Professional**: High-stakes environment. No visual gimmicks.
- **Premium & Government-Grade**: Must feel like official infrastructure built by Apple/Stripe.
- **Helpful & Grounded**: Never overwhelming, never sensational, never hallucinates.
- **Deterministic AI (CRITICAL)**: The system must **never** let AI determine bailability, punishments, deadlines, or rights. These must stem from a deterministic rule engine (JSON-based).

## Tech Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS, React Router, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB Atlas
- **Vector DB**: ChromaDB
- **Auth**: Clerk
- **AI/ML**: Gemini, LangChain, Google Vision API
- **Deployment**: Vercel (Frontend), Render (Backend)

## Design System
- **Colors**:
  - Background: `#0D0D0D`
  - Cards/Surfaces: `#171717`
  - Accent (Primary): `#7A1F2B`
  - Hover/Active: `#8B2635`
  - Highlight/Warning: `#B8860B`
  - Primary Text: `#F5F5F5`
  - Secondary Text: `#B8B8B8`
- **Strict Color Constraint**: No Blue, No Purple.
- **Fonts**: Fraunces (Headings), IBM Plex Sans (Body), IBM Plex Mono (Data/Dates)
- **UI Elements**: 8pt grid system, flat design with subtle 1px borders (`#2A2A2A`), Framer Motion animations.

## Core Architecture & Workflow Rules
1. **Document Processing Pipeline**: OCR -> Classification -> Info Extraction -> Deterministic Rule Engine -> Rights Engine -> Deadline Engine.
2. **Deterministic Rules**: All legal logic (bailable/compoundable/punishments) MUST be defined in static JSON files (e.g., `rules/ipc.json`), not guessed by AI.
3. **RAG System**: AI chat must strictly stick to retrieved context (Bare Acts, Legal Aid docs). Never hallucinate. If the answer is not in the context, respond with "I cannot provide legal advice on this. Please consult a lawyer."
4. **Implementation Standard**: Every feature implemented must adhere to the design system and tech stack defined above.
5. **Reference**: Always refer to the full PRD in `README.md` for overarching architectural and product decisions.
