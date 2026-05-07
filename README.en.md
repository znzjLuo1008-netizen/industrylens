# 🔍 IndustryLens · Industry Keyword Encyclopedia

[English](README.en.md) | [中文](README.md)

> Enter an industry name and understand it **in 30 seconds**.
> 100 hand-crafted keywords · Pro definition + Plain-language explainer + Industry data · Plus top-3 company breakdown.

🌐 **Live demo**: [znzjluo1008-netizen.github.io/industrylens](https://znzjluo1008-netizen.github.io/industrylens/)

---

## 💡 Why

Every industry has its own jargon: ARR in SaaS, BEV and L4 in autonomous driving, CXO in biotech...

What really stops founders, strategists, and analysts from understanding a new sector isn't the logic — it's simply **what the hell these words mean**.

IndustryLens does one thing:

**Give you a lens — 100 keywords to unpack any industry's full landscape.**

Each keyword comes with **four blocks**:

- 📖 **Pro definition** — the way prospectuses and research reports would put it, with data
- 🔍 **Dig deeper** — one-click jump to Wikipedia / Google
- 📈 **Industry data** — specific numbers, companies, market share
- 💬 **Plain language** — so even your mom could follow

---

## ✨ Key Features

| Capability | Description |
|------|------|
| 🔎 **Smart search** | Input industry / company / technical term, three-tier confidence match, instant response |
| 📚 **100-word encyclopedia** | Each industry curated with 100 top keywords across 4 categories (Core / Finance / Tech / Business) |
| 🏆 **Top-3 companies** | 3 flagship companies per industry: eco-niche, moat, lifecycle, revenue structure |
| 🤖 **AI fallback** | Real-time DeepSeek generation for unknown industries, cached 30 days locally |
| 🔗 **External anchors** | Wikipedia / Google one-click lookup on every keyword |
| 🔗 **Shareable URLs** | Hash routing: refresh, share, browser-back all just work |
| ⚡️ **Instant load** | Preloaded data for all 109 industries ship in a single JS file |

---

## 🗂 Coverage

**109 industries across 15 verticals**

```
💻 Digital Tech    Enterprise SaaS · AI · Cloud · Big Data · AI Chips · Cybersecurity · IoT · AR/VR · Blockchain · Low-code ...
🚗 Smart Mobility  Autonomous driving · EVs · Auto parts · Charging · Drones · Rail ...
💊 Biotech         Innovative drugs · Medical devices · IVD · CXO · Medical aesthetics · Digital health · BCI ...
⚡️ Energy          Solar · Wind · Storage · Hydrogen · Nuclear · New materials · Semiconductors ...
🏭 Manufacturing   Industrial software · Smart manufacturing · Robotics · Lasers · 3D printing ...
🏦 Finance         Banking · Securities · Insurance · PE/VC · REITs · Wealth management · Fintech ...
🛒 Consumer        E-commerce · Short-video · Live commerce · Beauty · Luxury · F&B · Home · Pet ...
🎬 Media           Games · Animation · Film · Music · Publishing · Social media · Sports ...
🏢 Others          Real estate · Logistics · Education · Elderly care · Agriculture · Chemicals · Shipping · Mining ...
```

> Full keyword list in [`VOCABULARY.md`](./VOCABULARY.md)

---

## 🚀 Quick Start

### Use online
Just visit: **https://znzjluo1008-netizen.github.io/industrylens/**

### Run locally

```bash
# 1. Clone
git clone https://github.com/znzjLuo1008-netizen/industrylens.git
cd industrylens

# 2. Start a static server
python3 -m http.server 8891
# or: npx serve .

# 3. Open in browser
open http://localhost:8891
```

### Configure AI (optional)

The preloaded dataset already covers 109 industries, so you can use 90% of scenarios **without AI**. To enable real-time generation for new industries, either:

**Option 1** (recommended for dev): create `config.local.js` (gitignored)

```js
window.__DS_KEY__ = 'sk-your-deepseek-key';
```

**Option 2** (end users): open the ⚙️ settings panel in the top-right corner and paste your DeepSeek API key (stored in localStorage, never uploaded).

Get a key at 👉 [platform.deepseek.com](https://platform.deepseek.com/)

---

## 🏗 Architecture

**Pure front-end SPA. No build. Drop the HTML file anywhere and it runs.**

```
index.html                ← Single-page entry (CSS/JS inline)
├── preloaded_data.js     ← Full data for 109 industries (keywords + companies, ~1.5MB)
├── ai-service.js         ← DeepSeek streaming + 30-day localStorage cache
├── companies.js          ← Top-3 company fallback
├── synonyms.js           ← Three-tier confidence matching
├── keywords.js           ← Industry mapping fallback
├── VOCABULARY.md         ← Keyword inventory
└── bg-clay.png / img/    ← 3D clay background + brand assets
```

### Key Design Decisions

| Challenge | Solution |
|------|------|
| First-paint speed | Preloaded `preloaded_data.js` injects `KEYWORDS_DB / COMPANIES_DB` on load |
| AI cost/latency | Local-first → 30-day localStorage cache → AI only as last resort |
| Match accuracy | Three-tier: exact word match → synonyms → pinyin initials, weighted |
| Data trust | AI prompt guardrails: research-report tone, no fabrication; single-item 100% revenue triggers "undisclosed" fallback |
| Refresh / share | Hash routing preserves state; links are bookmarkable |
| Pushing large files | GitHub Contents API + base64 + Python temp-JSON to avoid shell truncation |

---

## 🎨 Design Language

- **Palette**: Minimalist light theme · Main `#166534` (dark green) + `#0F6E56` (teal) + `#185FA5` (link blue)
- **Typography**: Space Grotesk (display) · Inter (body) · Noto Sans SC (Chinese)
- **Card style**: White surface + 0.5px hairline dividers + 16px radius. Only the "plain-language" block keeps a light-green tint (emotional anchor)
- **Number highlight**: Percentages and autonomy levels auto-styled like hyperlinks (blue tint + underline)
- **Motion**: 14s background breathing + IntersectionObserver scroll reveal
- **Copy guardrails**: Research-report lens (eco-niche / moat / lifecycle), **never investment language** (target price / PE / DCF)

---

## 📌 Data Sources

- **Keywords**: TF-IDF extraction from industry prospectuses and research reports + human curation + LLM enrichment (DeepSeek batch generation v3/v5)
- **Top-3 companies**: Verifiable data from public filings, annual reports. **Zero fabrication**.
- **Synonyms / pinyin**: Hand-curated + auto-generated hybrid

---

## 📅 Roadmap

- ✅ 100-word encyclopedia · 109 industries
- ✅ Top-3 company deep-dive
- ✅ AI fallback generation
- ✅ GitHub Pages deployment
- ✅ Full preloading for instant access
- ✅ Keyword card visual system overhaul (v33: hyperlink-style number highlight)
- ⏳ Sub-sector drill-down (e.g., splitting CRM / HRM out of SaaS)
- ⏳ Industry comparison mode (two industries side by side)
- ⏳ Keyword relationship graph
- ⏳ Bookmarks / personal learning history

---

## ⚠️ Disclaimer

This tool is for learning and research only, and does **not** constitute investment advice.
Data is based on public sources to the best of our ability but may contain errors or be outdated. Always verify against official filings.

---

## 🙋 Made by

**Luo Luo** · AI Product Manager · 2026
For bugs or feature requests, please open an [Issue](https://github.com/znzjLuo1008-netizen/industrylens/issues).
