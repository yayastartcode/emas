# Melyoni Group - Official Company Profile

An ultra-premium, high-performance corporate profile website designed for **Melyoni Group**, a diversified natural resources and commodities conglomerate operating in Indonesia.

This website balances visual excellence, clean industrial aesthetics, data transparency, and responsible mining practices (ESG) to serve as a modern digital portal for global investors, partners, and regulators.

---

## 🌟 Premium Features

1.  **High-Fidelity Visual Storytelling**: Features curated cinematic exploration visuals capturing tropical drilling sites, geophysics mapping, core-logging, and community-centered environmental reclamation.
2.  **Instant Bilingual System (ID/EN)**: A lightweight, native client-side translation engine that translates all texts, labels, metadata, and forms on the fly without page reloads.
3.  **Modern Scroll-Driven Reveals**: Uses cutting-edge CSS scroll timelines (`@supports (animation-timeline: view())`) to animate sections dynamically as they enter the screen, with a robust JS `IntersectionObserver` fallback for older or unsupported browsers.
4.  **Glassmorphic Navigation**: A floating header with backdrop blur that morphs and draws a subtle glowing golden divider upon scroll past `50px`.
5.  **Interactive Exploration Hub**: Active tab controls letting users inspect geographical data, target geologies, and active drilling phases of the **East Kalimantan** and **Manado** concessions.
6.  **ESG & Sustainability Focus**: Showcases community welfare and forest restoration metrics with smooth numeric counter animations.

---

## 📁 Project Architecture

```bash
melyoni-mineral-nusantara/
├── index.html          # Main HTML5 semantic structure & SEO metadata
├── README.md           # Project documentation
├── .gitignore          # Excluded system & env files
├── css/
│   └── style.css       # Design system tokens, variables, fluid layouts, keyframes, transitions
├── js/
│   └── main.js         # Navigation, translations, counter counts, tabs, and form logic
└── assets/
    ├── hero_bg.png      # Sunrise exploration site backdrop
    ├── kaltim_site.png  # Jungle exploration core-sample drilling rig
    ├── manado_site.png  # Volcanic coastal ridge geology sample logging
    └── esg_green.png    # Forest reclamation and social empowerment program
```

---

## 🛠️ How to Run & Preview

### Local Execution (No dependencies)
Double click `index.html` or open it directly in any modern browser:
```bash
open index.html
```

### Local Dev Server (Recommended)
To run a local server for simulated mobile responsive testing or to verify exact resource fetch behavior, run:
```bash
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## 🚀 Deployment (Cloudflare Pages)

The website is fully optimized for static deployment on **Cloudflare Pages**:

### Direct Deploy using Wrangler CLI
1.  Authenticate with Wrangler:
    ```bash
    npx wrangler login
    ```
2.  Deploy to Cloudflare Pages:
    ```bash
    npx wrangler pages deploy . --project-name=melyoni-mineral-nusantara
    ```

### Automated GitHub CI/CD (Recommended)
1.  Push this project to a new GitHub repository:
    ```bash
    git init
    git add .
    git commit -m "feat: initial commit of Melyoni Mineral Nusantara profile"
    git branch -M main
    # add remote and push...
    ```
2.  Go to **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3.  Select your repository and select the **HTML / Static** preset.
4.  Click **Save and Deploy**. Cloudflare will automatically build and publish the site on every `git push`!
