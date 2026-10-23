# Sudhir Tiwari — Portfolio

Personal portfolio website for **Sudhir Tiwari** — project coordination, operations and data-driven problem solving.

**Live demo:** https://root-Akira.github.io/sudhir-portfolio *(after enabling GitHub Pages)* · Repo: https://github.com/root-Akira/sudhir-portfolio

## Features

- Retro newspaper/terminal-inspired design with a monospace + serif type system
- Interactive **dino runner mini-game** in the hero (jump, duck, day/night cycle, persistent high score)
- Interactive career timeline (2023–2026) with per-role detail panel
- Scroll-spy side index and scramble-text wordmark
- Fully responsive with mobile navigation
- Self-hosted fonts (IBM Plex Mono, Public Sans, Young Serif) with `font-display: swap`
- Respects `prefers-reduced-motion`

## Sections

01 Profile · 02 Work · 03 Practice · 04 Projects · 05 Contact

## Tech Stack

| | |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| Language | JavaScript (JSX) |
| Styling | Plain CSS (no framework) |

## Getting Started

```bash
git clone https://github.com/root-Akira/sudhir-portfolio.git
cd sudhir-portfolio
npm install
npm run dev      # start dev server
```

## Build

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project Structure

```
sudhir-portfolio/
├── index.html
├── vite.config.js
├── public/
│   ├── fonts/                  # self-hosted .woff2 fonts
│   └── sudhir-portrait.jpg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── fonts.css               # @font-face declarations
    ├── styles.css
    └── components/
        ├── Topbar.jsx          # nav + scramble wordmark
        ├── SideIndex.jsx       # scroll-spy section index
        ├── Hero.jsx            # intro + portrait
        ├── DinoGame.jsx        # canvas mini-game
        ├── Profile.jsx
        ├── Work.jsx            # interactive timeline
        ├── Practice.jsx
        ├── Projects.jsx
        ├── Contact.jsx
        └── SocialIcons.jsx
```

## Contact

- **Email:** sudhirtiwari2209@gmail.com
- **X:** [@Sudhir0922](https://x.com/Sudhir0922)
- **Instagram:** [this_sudhirtiwari](https://www.instagram.com/this_sudhirtiwari)
