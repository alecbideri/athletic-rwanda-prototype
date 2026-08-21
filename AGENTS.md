# Ganza — Isonga Student Prototype (Context Handoff)

## Project

**Ganza** (brand is Ganza — NOT "AthleticX", NOT "NAHPAP", NOT "Athletic-Rda"). A Rwanda Ministry of Sport (MINISPORTS) development-command prototype for **Isonga school-based academies** (school centres of excellence, MINISPORTS + MINEDUC + AFD). The moat is: **keep one record per athlete, sustain and analyse it over time, and graduate the athlete on LTAD stages** — signals stay explainable and human-owned, never auto-diagnose or auto-select.

Scope: Isonga only. **No national federation operating system** (no FERWAFA as a club/federation system — that persona is permanently removed). No investment-fund numbers in the proposal.

## Tech stack (do not change)

- React 19 + TypeScript 5.8 + Vite 6 (`@vitejs/plugin-react`)
- Styling: single `src/styles.css` (~290 lines) — light theme, `--mint: #15834f` (primary green), `--violet: #655dd1`, `--coral: #db6b48`, `--ink: #15332a`, cards radius 22px
- Icons: `@phosphor-icons/react` (NOT lucide)
- Fonts: Space Grotesk (display) + DM Sans (UI)
- No router — `useState` view machine in `src/App.tsx`
- Data: local JSON in `src/data/*.json`, imported via `src/data/index.ts` (`resolveJsonModule`)

## Commands

```bash
npm run dev            # local dev, http://127.0.0.1:4173
npm run build          # tsc -b && vite build (takes 10-40s)
netlify deploy --prod --dir dist --site 2128fa49-a06d-4cc3-bd4f-b35e42c0640b
```

- Prototype live: https://athletic-rwanda-prototype.netlify.app
- GitHub repo: `alecbideri/athletic-rwanda-prototype` (branch `main`)
- Handover page (separate site): https://ganza-handover.netlify.app (site id `d52411c7-5ffb-4de0-8038-74b3db07a5ad`), source `../handover.html`
- **Netlify gotcha:** the CLI sometimes links to the wrong project (`ai-cognitive-cost`, `project-dashboards-122`). Always deploy with explicit `--site 2128fa49-...`. Verify output JSON shows `"site_name": "athletic-rwanda-prototype"`.

## Current state (most recent work)

- **Routes:** only two personas enabled — **Student-Athlete** (default) and **Coach**. **Clinician and Ministry are temporarily disabled** (routing guard `useEffect` forces `home` if `view` is ministry/federation/medical; toolbar only shows `Open Coach view`). **FERWAFA permanently removed** (dead arrays kept with `void` to satisfy noUnusedLocals).
- **Student persona (Ishimwe Eric, football, St Joseph Kabgayi — Isonga Centre):**
  - `src/data/athlete.json`: id `RW-IS-24-0782` (stable, school-agnostic — school is an attribute, not part of ID), `stage: "Train to Train"`, `stageProgress: 62`, `nextStage: "Train to Compete"`, `homeAddress {district: Muhanga, sector: Kabgayi, guardian: J. Habimana}`.
  - Overview tab: greeting `Good morning Ishimwe Eric, — football · St Joseph Kabgayi`; readiness ring = **stage progress** 62% (mint), `38% to Train to Compete · Coach review`; `YOUR DEVELOPMENT` card. **No RHR/+12 bpm/doctor in student-facing copy.**
  - Passport tab: `Ganza ID — stable RW-IS-24-0782`, `Current school`, `Current stage`, `Home Muhanga · Kabgayi`, `Isonga Centre at St Joseph Kabgayi`, `Guardian`, `ID note: School change does not change ID`.
  - Performance tab: hero `CURRENT FORM +8% trend` vs `Baseline 100`; `LargeChart` trajectory — **green solid `#15834f` = Your trajectory, violet dashed = Baseline 100** (legend in SVG, no "Ganza Green" naming), y-axis `+10%/+5%/100/−5%`, dots with `+2.4`, `+8%`; `YOUR PREVIOUS EVALUATION` video (left frame + right Overlays panel `Touch 42 / Shot 3 / Sprint 28.4 km/h`), poster is **neutral, no green pitch, no MATCH ANALYSIS**; badge on video `PERSONAL EVALUATION` (no %).
  - Health tab: CSS body map (Right shoulder/knee/ankle) + `View 3D muscles` (Sketchfab Écorché embed iframe `33162ec759e04d2985dbbdf4ec908d66`, `dnt=1&autostart=0`, watermark kept) + `Training context 220 min moderate 4/7` + `Open prevention alerts (3, named owners)` + wellness row (Sleep 6.4 h, Energy 7/10, Recovery 82%).
- **`src/data/athleticx.json`** = scraped Manus content source (Command centre, Athlete directory, Development pathway, Prevention & care, Stakeholder communication, Progression review, Cohort intelligence). Used as illustrative copy only; `athleticx` brand label must NEVER appear in UI — everything reads Ganza.

## Content rules (hard constraints)

- **Brand:** Ganza only. No "AthleticX", "ATHLETIC-Rda", "NAHPAP" anywhere in UI. (`import athleticx from './data/athleticx.json'` is fine — it's a data file, but no visible "ATHLETICX" text.)
- **Student-facing copy:** plain language, non-technical. No `+12 bpm RHR`, no `FMS/Y Balance`, no `stadiometer`, no doctor names in greetings. Stage score explained as "% through current LTAD stage".
- **LTAD:** 7 stages `Active Start → FUNdamentals → Learn to Train → Train to Train → Train to Compete → Train to Win → Active for Life`. Stages guide support; never labels of worth; never auto-selection. Ishimwe is `Train to Train`.
- **Distribution/privacy:** Athlete = own record; Coach = operational status only (Ready/Monitor/Rest + moments); Medical = full clinical; Ministry = de-identified aggregate only. `Data shall not leave Rwanda — HORAS Labs`.
- **Layout/looks: preserve the shell.** The official prototype layout must not be redesigned. Content swaps only (text/numbers/tables/graph data). Tabs are worked one at a time with local review before deploy.
- **Fictional demo:** numbers are illustrative pilot data, not medical claims.

## Next steps (in progress)

- Coach persona still shows old club-era content (AS Kigali, 24 players, Rayon Sports matches) — needs Isonga school-coach adaptation.
- Clinician (Academy Medical) and Ministry (Isonga Coordinator) routes to be re-enabled and rebuilt from `athleticx.json` when ready.
- Proposal docs live in `../docs/` (Ganza-Proposal.md/pdf, Ganza-RISA-RPPA-Isonga-Addendum.md/pdf) — RISA/RPPA Isonga addendum companion.

## Other files in ../ (ATRDA workspace, read-only context)

- `../docs/Ganza-Proposal.pdf` — investor-friendly Isonga proposal (no AthleticX footer, no clinical numbers)
- `../docs/Ganza-RISA-RPPA-Isonga-Addendum.pdf` — RISA/RPPA scoped to Isonga pilot
- `../ISO_RISA_Compliance_Strategy.md` — national master compliance framework
- `../Young Athlete Medico-Performance Metrics Handbook.pdf` — clinical metric source (for Medical tab later)
- Manus reference site (fictional AthleticX demo): `https://athleticx-fh5nmhkp.manus.space/` — Firecrawl-keyed scrapes in temp; treated as illustrative source only.
