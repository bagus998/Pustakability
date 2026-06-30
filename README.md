# 📚 Pustakability

Pustakability is an **Accessible Digital Library** frontend application designed specifically for students with print disabilities at **Universitas Brawijaya (UB)**. Managed by **Pusat Layanan Disabilitas (PLD) UB**, this platform ensures that learning materials are available in various accessible formats, breaking down the barriers to inclusive education.

## ✨ Key Features

- **♿ Accessibility First**: Designed with WCAG 2.1 AA compliance in mind. Features high contrast (Dark Mode), large clickable areas, and screen-reader-friendly semantic HTML.
- **🌐 Bilingual Support (i18n)**: Seamlessly toggle between **Indonesian** and **English** interfaces.
- **📖 Multiple Accessible Formats**: 
  - **Audio & Text-to-Speech**: For auditory learners and visually impaired students.
  - **Accessible PDF**: Formatted for standard screen readers.
  - **DAISY Books**: Digital Accessible Information System formats for precise audio navigation.
  - **Digital Braille (BRF)**: Downloadable formats ready for Braille displays.
  - **OpenDyslexic Font Support**: Dyslexia-friendly reading mode built-in.
- **🌓 Dark Mode**: Built-in toggle to switch between light and dark themes for eye comfort.
- **👥 Role-Based Access**: Specialized views and dashboards for **Users (Students)**, **Volunteers**, and **Admins**.

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Radix UI Primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: `react-i18next` & `i18next`

## 🏗 Architecture & Backend (Upcoming)

Currently, Pustakability serves as a robust frontend mockup utilizing React state and hardcoded data. 
It is architected to transition into a **Headless CMS architecture** (specifically **Headless WordPress** via WP REST API). 
Once the backend is connected, the app will dynamically fetch books, authenticate users via JWT, and handle real-time catalog searches directly from the Plesk server.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   cd Pustakabillity
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server with hot-reload:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production (Plesk/cPanel)

To compile the application into static files for production deployment:
```bash
npm run build
```
This will generate a `dist` folder. You can compress the contents of the `dist` folder into a `.zip` file and upload it to the `httpdocs` folder of your Plesk hosting. 

*(Note: Don't forget to add an `.htaccess` fallback for React Router if deploying to an Apache/Plesk server).*

## 📁 Project Structure

```text
src/
├── app/
│   ├── components/      # Reusable UI components and page sections (Navbar, Footer, Hero, etc.)
│   ├── App.tsx          # Main application entry and manual router state
├── data/                # Mock data (books, users)
├── locales/             # i18n translation files
│   ├── en.json          # English translations
│   ├── id.json          # Indonesian translations
├── imports/             # Static assets (images, logos)
```

## 📄 License
Copyright © 2026 Pustakability - Subdirectorate of Disability Services and Inclusive Education, Brawijaya University