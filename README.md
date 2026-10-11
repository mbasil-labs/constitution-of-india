# Constitution of India • Samvidhan (संविधान)

[![Deploy to GitHub Pages](https://github.com/mbasil-labs/constitution-of-india/actions/workflows/deploy.yml/badge.svg)](https://github.com/mbasil-labs/constitution-of-india/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-success.svg)](#offline-progressive-web-app)
[![Design](https://img.shields.io/badge/Design-Material%20Design%203-blue.svg)](#material-design-3-experience)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An offline Progressive Web App (PWA) of the **Constitution of India (Samvidhan)**, crafted with **Material Design 3 (M3)** specifications, tactile gesture swiping, instant full-text search, landmark Supreme Court constitutional jurisprudence, plain-English simplifications, and an integrated audio reader.

🔗 **Live Application**: [https://labs.0301.in/constitution-of-india/](https://labs.0301.in/constitution-of-india/)

---

## ✨ Features

- 🇮🇳 **Complete Constitutional Corpus**:
  - Full official text across all 395+ Articles and 22 Parts.
  - Interactive browser for all **12 Schedules**.
  - Majestic, scrollable **Preamble** presentation.

- 📱 **Material Design 3 (M3) Experience**:
  - Tricolor system accent indicator with dynamic M3 color tokens.
  - Dark & Light mode support with adaptive elevation, states, and smooth transitions.
  - Responsive layouts: Top App Bar, Floating Action Buttons (FABs), Modal Sheets, and Bottom Navigation.

- 🎴 **Fluid Card-Swiping Stage**:
  - Interactive touch-swipe gestures (`swipe left` / `swipe right`) with physics-based drag tracking.
  - Desktop keyboard controls (`←` / `→` arrow keys, `J` for quick jump, `/` or `Cmd+K` for search).
  - Quick Article Jump drawer to jump directly to any article.

- 🔍 **Instant Offline Search & Filters**:
  - Real-time client-side search across article numbers, titles, clauses, summaries, and landmark cases.
  - Keyword match highlighting.
  - Part-by-part filtering (Fundamental Rights, DPSP, Union Judiciary, Emergency Provisions, etc.).
  - Saved bookmarks / favorites stored locally.

- ⚖️ **Landmark Cases & Plain Summaries**:
  - Curated landmark Supreme Court constitutional bench rulings (e.g., *Kesavananda Bharati*, *Maneka Gandhi*, *K.S. Puttaswamy*, *Minerva Mills*, *Shreya Singhal*).
  - Clear, accessible plain-English explanations alongside authoritative constitutional clauses.

- 🔊 **Voice Narration (Audio Reader)**:
  - Browser-native Web Speech Synthesis with play, pause, resume, and stop controls.
  - Auto-reads article title and constitutional clauses with live speaking indicators.

- ⚡ **100% Offline Progressive Web App (PWA)**:
  - Cache-first Service Worker architecture.
  - Installable on iOS (Safari Add to Home Screen) and Android (Chrome WebAPK).
  - Zero external database dependencies; lightning-fast client-side execution.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `←` / `→` | Previous / Next Article Card |
| `Cmd + K` or `/` | Open Search Dialog |
| `J` | Jump directly to Article Number |
| `P` | Open Preamble View |
| `S` | Open Schedules Grid |
| `B` | Bookmark current Article |
| `A` | Toggle Audio Speech Narration |
| `T` | Toggle Dark / Light Theme |
| `Esc` | Close any open Dialog / Sheet |

---

## 🛠️ Tech Stack

- **Framework / Runtime**: Vanilla JavaScript (ES modules) & HTML5
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Design Tokens**: Material Design 3 (M3) Color and Elevation system in Vanilla CSS
- **Typography & Icons**: Plus Jakarta Sans, Roboto, Material Symbols Outlined
- **Hosting**: GitHub Pages via GitHub Actions

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (Node 22 recommended)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/mbasil-labs/constitution-of-india.git
cd constitution-of-india

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Building and Deployment

```bash
# Production build
npm run build

# Static export build (used for GitHub Pages)
npm run build:static
```

Automated deployments are powered by GitHub Actions in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Every push to `main` builds the static artifacts and publishes them to GitHub Pages.

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
