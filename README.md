# AIRE™ Method App — GAP Assessment Tool

**A web-based AI governance diagnostic built on a methodology I developed to solve a real organizational problem.**

> **Prototype Notice:** This is a demonstration build. The assessment UI and scoring logic are fully functional, but responses are stored in browser session storage only. A production version would connect to a Supabase backend for data persistence and AI-assisted recommendations.

---

## What Is the AIRE Method?

AIRE stands for **Approach · Implementation · Responsibility · Enablement** — a four-dimension framework for evaluating an organization's readiness to adopt new technology, specifically AI tools.

I developed it because I kept encountering the same pattern: organizations in flat structures — where colleagues carry leadership responsibilities but still report to directors — making technology adoption decisions in silos. The result was duplicate subscriptions, misaligned rollouts, underutilized tools, and teams that were never fully brought along.

The problem isn't that people don't care about the tools. It's that there's no shared process for deciding *whether* a tool is actually needed, *who* needs to be involved, and *what* successful adoption looks like before anyone signs a contract.

AIRE gives organizations a structured pathway to work through that together — without requiring anyone to be a technical expert to participate meaningfully.

---

## Origin Story

This started as a Google Sheets evaluation tool — a structured spreadsheet I used to facilitate technology adoption conversations with stakeholders across sectors. I designed it to surface the real questions that tend to get skipped: Does this tool match our strategic approach? Have we thought through the responsibility and governance implications? Do our staff have the capacity to actually use this well?

I've had the opportunity to share the AIRE Method with stakeholders, technology leaders, and practitioners at the **Learning Forward Winter Conference**, where the reception was genuinely encouraging. People recognized the gap it was solving immediately — and several wanted to know how to bring it back to their organizations.

That response pushed me to take the spreadsheet-and-facilitation-guide model and build it into something you can actually move through online.

---

## What This App Does

The app walks users through a **12-question diagnostic** organized across the AIRE 4×3 matrix:

| Dimension | Focus |
|---|---|
| **A — Approach** | Strategic vision, leadership alignment, success metrics |
| **I — Implementation** | Production deployment, infrastructure, vendor evaluation |
| **R — Responsibility** | Governance policies, privacy, bias monitoring |
| **E — Enablement** | Training, internal champions, learning culture |

Each question is scored on a 1–5 scale. The scoring engine calculates a maturity score per dimension and an overall readiness score, mapped to five maturity levels: **Initial → Emerging → Developing → Established → Leading**.

Results include a per-dimension breakdown and a download of the **AIRE Companion Guide** — the facilitation document that explains the methodology, assessment cells, and 30-day action pathway in full.

---

## Why I Built It This Way

This project is itself a demonstration of how I work.

I used **AI-enabled prototyping** (Claude + Claude Code) to take a methodology I'd developed and tested in real facilitation settings and turn it into a working web application. This is exactly the approach I advocate for and use professionally: use AI tools to close the gap between concept and working proof-of-concept, so that technical and non-technical stakeholders can see and react to something real — not a slide deck.

The stack (Next.js, Tailwind, Framer Motion, Supabase on the roadmap) reflects the kind of lightweight, modern infrastructure I use for internal prototyping and platform evaluation work.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Planned backend:** Supabase (PostgreSQL + Row Level Security)
- **Deployment:** Vercel
- **Version control:** GitHub

---

## Roadmap

- [ ] Supabase integration — persist responses per session/org
- [ ] AI-assisted recommendations based on dimension scores and uploaded framework
- [ ] Organization-level reporting dashboard
- [ ] Facilitated cohort mode (multiple respondents, aggregate scoring)
- [ ] Export to PDF report

---

## Companion Guide

The AIRE Companion Guide is available as a PDF download within the app. It includes the full methodology, assessment cell descriptions, facilitation notes, and the 30-day action pathway.

---

## About

Built by **Lyndonia Jane** — Microsoft 365 and SharePoint administrator, LMS administrator, and migration specialist with 10+ years leading SharePoint strategy and enterprise learning infrastructure.

[LinkedIn](https://www.linkedin.com/in/lyndonia-jane) · [GitHub](https://github.com/byteswithdon)
