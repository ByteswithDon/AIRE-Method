"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const DIMENSIONS = [
  { letter: "A", name: "Approach", desc: "Vision & strategic stance", color: "#F5C518" },
  { letter: "I", name: "Implementation", desc: "Deployment & tooling", color: "#FF6B35" },
  { letter: "R", name: "Responsibility", desc: "Ethics & privacy", color: "#4CAF50" },
  { letter: "E", name: "Enablement", desc: "Staff capacity & culture", color: "#64B5F6" },
];

const STATS = [
  { num: "12", label: "Assessment cells" },
  { num: "4×3", label: "Framework matrix" },
  { num: "30", label: "Day action pathway" },
];

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-white relative overflow-x-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Hero background — keyboard/tech atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 20% 80%, rgba(100,181,246,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(245,197,24,0.04) 0%, transparent 60%),
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* ── Nav ── */}
      <header className="relative z-10">
        <nav
          className="px-6 md:px-12 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          aria-label="Main navigation"
        >
          <span className="text-sm font-bold tracking-[0.18em] uppercase text-white">
            AIRE™
          </span>

          <div className="flex items-center gap-6">
            {/* About toggle */}
            <button
              onClick={() => { setAboutOpen(!aboutOpen); setBioOpen(false); }}
              className="text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors focus-ring"
            >
              About
            </button>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/lyndonia-jane"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors focus-ring flex items-center gap-1.5"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/byteswithdon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors focus-ring flex items-center gap-1.5"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Download */}
            <a
              href="/AIRE-Companion-Guide.pdf"
              download
              className="text-sm font-semibold px-4 py-2 rounded transition-all focus-ring flex items-center gap-2"
              style={{
                background: "rgba(245,197,24,0.1)",
                color: "#F5C518",
                border: "1px solid rgba(245,197,24,0.25)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(245,197,24,0.2)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(245,197,24,0.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(245,197,24,0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <DownloadIcon />
              <span className="hidden sm:inline">Companion Guide</span>
            </a>
          </div>
        </nav>

        {/* About drawer */}
        <AnimatePresence>
          {aboutOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="px-6 md:px-12 py-8 max-w-3xl"
                style={{ background: "rgba(20,20,20,0.9)" }}
              >
                <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: "#F5C518" }}>
                  About
                </p>
                <p className="text-sm leading-relaxed text-[#A0A0A0] mb-4">
                  Microsoft 365 and SharePoint administrator, LMS administrator, and migration specialist
                  with 10+ years leading SharePoint strategy and building the infrastructure behind enterprise
                  learning and collaboration platforms. Designs information architecture and permissions models,
                  creates platform schematics, and advises leadership on technology selection and configuration.
                </p>
                <button
                  onClick={() => setBioOpen(!bioOpen)}
                  className="text-xs font-semibold tracking-wide text-[#F5C518] hover:opacity-80 transition-opacity focus-ring flex items-center gap-1"
                >
                  {bioOpen ? "Show less ↑" : "Read full bio ↓"}
                </button>
                <AnimatePresence>
                  {bioOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-3 text-sm leading-relaxed text-[#A0A0A0]">
                        <p>
                          Leads infrastructure development and migration for learning management systems, paired
                          with internal team enablement, technical prototyping, and the adoption, training, and
                          rollout documentation that makes new platforms stick.
                        </p>
                        <p>
                          Uses AI-enabled prototyping — schematics, mockups, and working proofs of concept — to
                          model features before rollout and bridge technical and non-technical teams. Grounds
                          platform decisions in deep research: learner-engagement and usability studies, A/B
                          testing, and post-release review.
                        </p>
                        <p>
                          Hands-on across the M365 stack (SharePoint, Teams, Learn 365 / Zensai) and a range of
                          LMS platforms and API integrations.
                        </p>
                        <div className="pt-2">
                          <p className="text-xs font-semibold tracking-wide uppercase text-white mb-2">Core Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "SharePoint Online","M365 Administration","LMS Administration","Power Automate",
                              "Power BI","Information Architecture","Content Migration","WCAG / ADA",
                              "API Integration","SCORM / xAPI","SQL","Supabase","Vercel","GitHub",
                              "Docebo","Canvas","Moodle","Notion","Scribe","Zendesk"
                            ].map(s => (
                              <span
                                key={s}
                                className="text-xs px-2 py-1 rounded"
                                style={{ background: "rgba(255,255,255,0.06)", color: "#A0A0A0" }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Prototype notice banner ── */}
      <div
        className="relative z-10 px-6 md:px-12 py-3 flex flex-wrap items-center gap-3 justify-between text-xs"
        style={{ background: "rgba(245,197,24,0.06)", borderBottom: "1px solid rgba(245,197,24,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold tracking-wider uppercase"
            style={{ background: "rgba(245,197,24,0.15)", color: "#F5C518", border: "1px solid rgba(245,197,24,0.3)" }}
          >
            Prototype
          </span>
          <span className="text-[#A0A0A0]">
            This is a demonstration only. Responses are <strong className="text-white">not saved</strong> — no backend or database is connected.
          </span>
        </div>
        <button
          onClick={() => setIntroOpen(!introOpen)}
          className="text-[#F5C518] font-semibold hover:opacity-80 transition-opacity focus-ring whitespace-nowrap"
        >
          {introOpen ? "Hide context ↑" : "Why I built this ↓"}
        </button>
      </div>

      {/* Intro context drawer */}
      <AnimatePresence>
        {introOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="px-6 md:px-12 py-8 max-w-3xl"
              style={{ background: "rgba(14,14,14,0.95)" }}
            >
              <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: "#64B5F6" }}>
                Context &amp; Intent
              </p>
              <div className="space-y-3 text-sm leading-relaxed text-[#A0A0A0]">
                <p>
                  The AIRE Method grew out of a real problem I kept encountering: decision-makers in flat
                  organizations adopting technology without a shared process — leading to duplicate
                  subscriptions, misaligned rollouts, and teams that never fully adopted the tools.
                </p>
                <p>
                  I started as a Google Sheets evaluation tool — a structured spreadsheet I used to
                  facilitate conversations with stakeholders. After presenting it at the{" "}
                  <strong className="text-white">Learning Forward Winter Conference</strong> and watching
                  leaders across sectors immediately recognize the gap it was solving, I decided to build
                  a proper web-based version.
                </p>
                <p>
                  This prototype demonstrates how the framework translates into an interactive digital
                  tool. In a production version, responses would be stored in Supabase and the scoring
                  engine would generate AI-assisted recommendations based on the uploaded framework.
                  <strong className="text-white"> This demo shows the UX and logic — not the live backend.</strong>
                </p>
                <p>
                  I built it using AI-enabled prototyping (Claude + Claude Code) paired with my own
                  platform architecture background — exactly the kind of approach I use to bridge
                  technical and non-technical teams in my day-to-day work.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <main id="main-content" className="relative z-10 flex-1 flex flex-col lg:flex-row">
        {/* Left — copy */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-20 max-w-2xl">
          <motion.p
            {...fade(0.1)}
            className="text-xs font-bold tracking-[0.22em] uppercase mb-6"
            style={{ color: "#F5C518" }}
          >
            AI Governance Diagnostic
          </motion.p>

          <motion.h1
            {...fade(0.18)}
            className="leading-none tracking-tight mb-6 font-black"
            style={{ fontSize: "clamp(52px, 8vw, 88px)", letterSpacing: "-0.03em" }}
          >
            GAP
            <br />
            <span style={{ color: "#F5C518" }}>Assessment</span>
          </motion.h1>

          <motion.p
            {...fade(0.26)}
            className="text-base leading-relaxed max-w-md mb-10 font-light"
            style={{ color: "#A0A0A0" }}
          >
            Measure your organization&rsquo;s readiness across the four dimensions
            of responsible AI adoption — and get a structured 30-day action pathway.
          </motion.p>

          <motion.div {...fade(0.32)}>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded transition-all focus-ring group"
              style={{
                background: "#F5C518",
                color: "#0A0A0A",
                boxShadow: "0 0 0 0 rgba(245,197,24,0)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#FFD43B";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(245,197,24,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#F5C518";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(245,197,24,0)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Begin Assessment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fade(0.44)}
            className="flex gap-10 mt-16 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {STATS.map((s) => (
              <div key={s.num}>
                <div className="text-3xl font-black mb-1" style={{ color: "#F5C518" }}>
                  {s.num}
                </div>
                <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#606060" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — dimension cards */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {DIMENSIONS.map((dim, i) => (
              <motion.div
                key={dim.letter}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 rounded-xl flex flex-col gap-2 transition-all duration-300 cursor-default"
                style={{
                  background: "rgba(20,20,20,0.8)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(30,30,30,0.9)";
                  el.style.border = `1px solid ${dim.color}40`;
                  el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${dim.color}20`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(20,20,20,0.8)";
                  el.style.border = "1px solid rgba(255,255,255,0.06)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span className="text-3xl font-black" style={{ color: dim.color }}>
                  {dim.letter}
                </span>
                <span className="text-sm font-semibold text-white">{dim.name}</span>
                <span className="text-xs" style={{ color: "#606060" }}>{dim.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4 text-xs"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#606060" }}
      >
        <span>AIRE™ — AI Readiness &amp; Implementation Evaluation</span>
        <div className="flex items-center gap-4">
          <a
            href="/AIRE-Companion-Guide.pdf"
            download
            className="hover:text-white transition-colors focus-ring flex items-center gap-1.5"
          >
            <DownloadIcon size={12} />
            Download Companion Guide
          </a>
          <span
            className="px-2 py-0.5 rounded"
            style={{ background: "rgba(245,197,24,0.1)", color: "#F5C518", border: "1px solid rgba(245,197,24,0.2)" }}
          >
            Prototype
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ── Icons ── */
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function DownloadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
