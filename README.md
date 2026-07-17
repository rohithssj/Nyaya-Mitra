# Nyaya Mitra

Nyaya Mitra is an advanced AI-powered legal technology platform designed to bridge the gap between complex legal terminology and ordinary citizens. It provides a secure, privacy-first interface for users to upload, analyze, and understand complex legal documents such as First Information Reports (FIRs), court summons, legal notices, and bail orders without requiring immediate counsel from expensive legal professionals.

Operating on a robust, provider-agnostic AI architecture, Nyaya Mitra extracts text from scanned documents using high-accuracy Optical Character Recognition (OCR), classifies the document type, and deterministically applies legal rules to extract critical timelines, rights, and obligations. The platform guarantees reliability by anchoring all legal logic in static rule engines rather than relying on generative AI, effectively eliminating hallucinations in legal advice.

Designed for scalability and production readiness, the system serves as essential infrastructure for democratizing legal access, empowering individuals to make informed decisions and act within mandated legal deadlines.

---

## Problem Statement

Navigating the legal system is a daunting challenge for most citizens. Legal documents are densely formatted, heavily reliant on archaic terminology, and difficult for non-experts to interpret. 

When individuals receive critical documents—such as an FIR, a charge sheet, or a court summons—they are often unaware of their immediate rights, obligations, or the severity of the situation. This lack of understanding leads to panic, missed court deadlines, and a failure to secure timely legal representation. 

Furthermore, access to legal professionals is often prohibitively expensive and time-consuming, creating a significant barrier to justice for marginalized and middle-income demographics. There is currently a systemic lack of accessible, AI-powered infrastructure that can securely process legal documents and explain them in plain language without generating hallucinatory or unreliable legal advice.

---

## Our Approach

Nyaya Mitra relies on a deterministic, multi-stage processing pipeline to ensure absolute accuracy and reliability. 

1. **Document Upload**: The user securely uploads a legal document (PDF or image).
2. **Optical Character Recognition (OCR)**: The system extracts raw text from the document using advanced vision models, complete with caching mechanisms to prevent redundant processing.
3. **Document Classification**: The extracted text is analyzed to deterministically classify the document type (e.g., FIR, Bail Order, Legal Notice).
4. **Information Extraction**: The system extracts critical entities such as dates, case numbers, jurisdictions, and involved parties.
5. **Legal Rule Engine**: Extracted entities are passed through a deterministic, JSON-based rule engine that applies statutory legal logic (e.g., bailability, maximum punishments) based on verified penal codes.
6. **Summary Generation**: A plain-language summary of the document is generated.
7. **Rights & Obligations**: The user is presented with their specific legal rights and immediate obligations.
8. **Timeline & Deadlines**: A precise timeline of events and upcoming deadlines is generated to ensure compliance.
9. **Grounded AI Chat**: Users can ask questions about their document. The AI is strictly sandboxed to the extracted context, preventing hallucinations.
10. **Draft Generator**: The system assists in generating standard legal drafts (e.g., replies to notices) based on the extracted context.

---

## Solution Architecture

```text
[ User Interface (React) ]
       │
       ▼
[ Document Upload ]
       │
       ▼
[ OCR Processing Layer ] ── (Cache Check)
       │
       ▼
[ Document Classification ]
       │
       ▼
[ Entity Extraction ]
       │
       ▼
[ Deterministic Legal Rule Engine (Static JSON) ]
       │
       ▼
[ Contextual AI Pipeline ]
       ├─► Plain Language Summary
       ├─► Rights & Obligations Engine
       ├─► Timeline & Deadline Calculator
       ├─► Grounded AI Chat Assistant
       └─► Legal Draft Generator
       │
       ▼
[ Secure Document & History Storage (MongoDB) ]
```

The architecture is explicitly designed to decouple the generative capabilities of Large Language Models from hard legal logic. By sandboxing AI interactions behind a deterministic rule engine, Nyaya Mitra guarantees high-fidelity, actionable outputs.

---

## Features

### Current Features
- Secure Document Upload Pipeline
- Provider-Agnostic AI Architecture (OpenRouter integration)
- Optical Character Recognition (OCR) with intelligent caching
- Automated Document Classification (FIR, Summons, Notices, etc.)
- Graceful degradation and model fallback mechanisms

### Planned Features
- Information and Entity Extraction
- Deterministic Legal Rule Engine integration
- Plain-language Document Summarization
- Rights, Obligations, and Timeline generation
- Context-Grounded AI Chat Assistant
- Legal Draft Generator

### Future Scope
- Voice-assisted accessibility
- Regional Indian language support
- Integration with official e-Courts APIs
- Mobile application deployment
- End-to-end case tracking and analytics

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React, TypeScript, Vite |
| **Styling** | TailwindCSS, Framer Motion |
| **Backend** | Node.js, Express, TypeScript |
| **AI Architecture** | OpenRouter (Provider-Agnostic REST Implementation) |
| **OCR & Vision** | Gemini Vision / Qwen VL via OpenRouter |
| **Database** | MongoDB Atlas |
| **Vector DB** | ChromaDB |
| **Authentication** | Clerk |
| **State Management** | React Hooks, Context API |
| **Version Control** | Git, GitHub |

---

## Project Structure

```text
Nyaya-Mitra/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   ├── assets/           # Static assets
│   │   └── App.tsx           # Application entry point
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Node.js API Server
│   ├── src/
│   │   ├── config/           # Centralized environment & AI configuration
│   │   ├── constants/        # System-wide constants and enumerations
│   │   ├── prompts/          # Isolated system prompts for AI services
│   │   ├── providers/        # AI provider integrations (e.g., OpenRouter)
│   │   ├── services/         # Core business logic (OCR, Classification, etc.)
│   │   ├── storage/          # Caching and persistence layers
│   │   └── types/            # TypeScript interfaces
│   ├── server.ts             # Express application initialization
│   └── package.json
│
└── README.md
```

---

## How It Works

1. **Onboarding**: The user accesses the web platform and authenticates securely.
2. **Submission**: The user uploads a scanned PDF or image of a legal document.
3. **Processing**: The backend calculates a cryptographic hash of the file. If previously processed, cached results are returned instantly to minimize API consumption. Otherwise, the document is routed through the OCR and Classification pipelines.
4. **Analysis**: The deterministic rule engine evaluates the extracted entities against static legal statutes.
5. **Presentation**: The user is presented with a dashboard detailing a plain-language summary, their legal rights, strict deadlines, and potential consequences.
6. **Interaction**: The user utilizes the sandboxed AI chat to ask specific questions about the document without risking exposure to hallucinated legal advice.

---

## Why Nyaya Mitra is Different

- **Deterministic Rule Engine**: Unlike standard AI wrappers, Nyaya Mitra never allows generative AI to determine bailability, statutory punishments, or legal deadlines. This logic is strictly enforced by static rule engines.
- **Grounded AI**: The chat system is tightly sandboxed to the retrieved context of the uploaded document and verified legal databases. It defaults to advising professional counsel rather than hallucinating answers.
- **Citizen-First Design**: The interface is intentionally calm, minimal, and accessible, reducing cognitive load for users in distress.
- **Scalable Architecture**: The backend utilizes a provider-agnostic AI layer with intelligent request queuing, automated retries, and cascading model fallbacks to ensure production-grade reliability.
- **Privacy-First Approach**: Documents are processed transiently and cached securely. System architecture strictly segregates PII from public model training datasets.

---

## Challenges

- **OCR Accuracy on Degraded Media**: Indian legal documents are often poorly scanned, handwritten, or stamped. Implementing robust multi-modal vision models was critical to extracting usable text.
- **Hallucination Prevention**: Ensuring the AI does not offer hallucinated legal advice required building a rigid pipeline that separates entity extraction from deterministic rule evaluation.
- **Complex Provider Ecosystems**: Managing rate limits, timeouts, and diverse API schemas necessitated the development of a custom, highly resilient, provider-agnostic AI service layer.
- **Legal Terminology Translation**: Bridging the gap between complex Latin/legal terms and plain English without losing the technical accuracy of the original document.

---

## Future Roadmap

- **Multi-Lingual Support**: Expansion to support Hindi and other regional Indian languages natively.
- **Lawyer Integration**: A portal for users to seamlessly export their analyzed case files directly to vetted legal professionals.
- **Court Date Reminders**: Automated SMS/Email integrations to notify users of impending deadlines extracted from their documents.
- **Offline OCR Edge Processing**: Shifting OCR workloads to edge devices to enhance privacy and reduce server costs.
- **RAG over Legal Databases**: Integrating comprehensive Retrieval-Augmented Generation across exhaustive penal codes and past judgments.

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-org/Nyaya-Mitra.git
cd Nyaya-Mitra
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd ../backend
npm install
npm run dev
```

---

## Environment Variables

The backend requires an `.env` file in the `backend/` directory.

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | The port the backend server listens on | `3000` |
| `AI_PROVIDER` | The AI provider to use | `openrouter` |
| `OPENROUTER_API_KEY` | Your OpenRouter API key | `sk-or-v1-...` |
| `OCR_MODEL` | Primary model used for OCR processing | `google/gemini-2.0-flash-lite-preview-02-05` |
| `OCR_FALLBACK_MODEL` | Fallback model if the primary OCR model fails | `qwen/qwen2.5-vl-72b-instruct` |
| `CLASSIFICATION_MODEL` | Model used for document classification | `google/gemini-2.5-flash` |
| `SUMMARY_MODEL` | Model used for summarization | `google/gemini-2.5-flash` |
| `ENTITY_MODEL` | Model used for entity extraction | `google/gemini-2.5-flash` |
| `CHAT_MODEL` | Model used for the grounded AI chat | `google/gemini-2.5-flash` |
| `DRAFT_MODEL` | Model used for legal draft generation | `google/gemini-2.5-pro` |

---

## API Flow

1. **Frontend Application**: The React application collects the user's document and transmits it via `multipart/form-data`.
2. **Express Backend**: The `server.ts` entry point receives the upload and calculates a cryptographic hash.
3. **Storage Layer**: The system queries `DocumentStore.ts` for an existing cache hit.
4. **Service Layer**: On a cache miss, the document is sequentially processed by `OCRService.ts` and `ClassificationService.ts`.
5. **AI Service Pipeline**: These services construct specific prompts and queue requests through `AIService.ts`, which interfaces with `OpenRouterProvider.ts`.
6. **Response**: The structured JSON payload containing OCR and Classification metadata is returned to the frontend and persisted to the cache.

---

## Contributing

Contributions are welcome. Please ensure that all pull requests align with the project's deterministic architecture principles.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Team

- **[Team Member 1]** - [Role]
- **[Team Member 2]** - [Role]
- **[Team Member 3]** - [Role]
- **[Team Member 4]** - [Role]
