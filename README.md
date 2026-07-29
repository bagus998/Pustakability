# 📚 Pustakability — Accessible Digital Library

[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-Level%20AA-00D4AC?style=for-the-badge)](https://www.w3.org/WAI/WCAG2AA-Conformance)
[![React 18](https://img.shields.io/badge/React-18-3B5BDB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**Pustakability** is an **Accessible Digital Library Platform** built for students with print disabilities (blindness, low vision, dyslexia, or physical motor impairments) at **Universitas Brawijaya (UB)**. Developed under the guidance of **Pusat Layanan Disabilitas (PLD) UB**, this platform ensures barrier-free access to academic textbooks, journals, and learning resources in accessible digital formats.

---

## ✨ Key Features

- **♿ WCAG 2.1 Level AA Accessibility**:
  - **Screen Reader Native**: Semantic HTML5 tags and complete ARIA landmarks optimized for NVDA, JAWS, VoiceOver, and TalkBack.
  - **Color Contrast & Dark Mode**: High contrast ratios (4.5:1 minimum) with light and dark mode toggles.
  - **200% Text Zoom Reflow**: Responsive layout adapts to 200% text enlargement without clipping content or causing horizontal scroll.
  - **Keyboard Navigation**: 100% operable via keyboard with visible focus rings and skip-to-content links (`#main-content`, `#book-content`).

- **🌐 Full Bilingual Support (i18n)**:
  - Instant toggle between **Indonesian (`id`)** and **English (`en`)** across all pages, navigation menus, modals, and error messages.

- **📖 Integrated Accessible E-Book Reader**:
  - Supports **EPUB**, **TXT**, and **PDF** formats with instant browser preview.
  - **Text-to-Speech (TTS)** audio narration for auditory learning.
  - Custom typography controls (Font size adjustment, line height, font family selection, and theme switching).
  - Interactive table of contents and bookmarking system.

- **👥 Role-Based Access Control (RBAC)**:
  - **Guest / Student**: Browse accessible catalog, search/filter books by category or format, read e-books.
  - **Volunteer**: Upload new accessible e-books via drag-and-drop file interface (`.epub`, `.txt`, `.pdf`) and monitor submission statuses.
  - **Admin**: Full administrative dashboard to manage user accounts (approve, suspend, edit, delete), manage book collections, and validate volunteer submissions.

- **⚡ Supabase Integration & Authentication**:
  - User authentication with email/password and Supabase Auth.
  - Magic Link email password recovery flow using secure URL tokens (`PUT /auth/v1/user`).
  - PostgreSQL database persistence (`profiles`, `books`, `kv_store`) with offline fallback support.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Auth + REST API) |
| **Deployment** | [Vercel](https://vercel.com/) / Static Web Hosting |

---

## ⚙️ Environment Configuration

Before running the application, create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Define your Supabase credentials in `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_ANON_KEY=your_supabase_public_anon_key
```

---

## 🚀 Quick Start / Local Setup

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/bagus998/Pustakabillity_figma.git
cd Pustakabillity_figma
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 4. Build for Production

To create an optimized production build:

```bash
npm run build
```

The output files will be generated in the `dist/` directory.

---

## 📁 Project Structure

```text
Pustakabillity_figma/
├── public/                  # Public static assets
├── src/
│   ├── app/
│   │   ├── api/             # Supabase API clients (books.ts, users.ts, supabase.ts)
│   │   ├── components/      # UI Components & Page Views
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── EbookReader.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ForgotPasswordModal.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── VolunteerDashboard.tsx
│   │   │   └── ...
│   │   ├── contexts/        # React Contexts (ToastContext)
│   │   ├── i18n/            # Internationalization (LanguageContext, translations.ts)
│   │   ├── types/           # TypeScript interfaces and data models
│   │   └── App.tsx          # Main Application Entrypoint & Navigation Router
│   ├── main.tsx             # Application DOM Root
│   └── index.css            # Global CSS Styles & Accessibility Utilities
├── supabase/                # Supabase Edge Functions & Config
├── .env.example             # Environment Variable Template
├── vercel.json              # Vercel SPA Routing Configuration
├── vite.config.ts           # Vite Build Configuration
└── README.md                # Project Documentation
```

---

## 🌐 Deployment

### Deploying to Vercel

This repository includes a `vercel.json` file pre-configured for Single Page Application (SPA) routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Simply connect your repository to [Vercel](https://vercel.com/) and configure the `VITE_SUPABASE_PROJECT_ID` and `VITE_SUPABASE_ANON_KEY` environment variables.

---

## 📄 License & Copyright

© 2026 **Pustakability** — Pusat Layanan Disabilitas (PLD), Universitas Brawijaya.  
All rights reserved.
