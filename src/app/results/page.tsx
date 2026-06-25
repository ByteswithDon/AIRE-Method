"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { scoreByDimension, maturityLabel, type Answer } from "@/lib/assessment";

export default function ResultsPage() {
  const [scores, setScores] = useState<ReturnType<typeof scoreByDimension> | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("aire-answers");
    if (raw) {
      const answers: Answer[] = JSON.parse(raw);
      setScores(scoreByDimension(answers));
    }
  }, []);

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans" style={{ background: "#0A0A0A", color: "#fff" }}>
        <div className="text-center">
          <p className="text-sm mb-6" style={{ color: "#A0A0A0" }}>No assessment data found.</p>
          <Link
            href="/assessment"
            className="text-sm font-bold px-6 py-3 rounded"
            style={{ background: "#F5C518", color: "#0A0A0A" }}
          >
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  const overall = Math.round(scores.reduce((s, d) => s + d.score, 0) / scores.length);
  const label = maturityLabel(overall);

  return (
    <div className="min-h-screen flex flex-col font-sans text-white" style={{ background: "#0A0A0A" }}>
      {/* Nav */}
      <header>
        <nav
          className="px-6 md:px-12 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link href="/" className="text-sm font-bold tracking-[0.18em] uppercase hover:opacity-80 transition-opacity focus-ring">
            AIRE™
          </Link>
          <div className="flex items-center gap-4">
            <span
              className="text-xs px-2 py-0.5 rounded font-bold tracking-wider uppercase"
              style={{ background: "rgba(245,197,24,0.1)", color: "#F5C518", border: "1px solid rgba(245,197,24,0.2)" }}
            >
              Prototype
            </span>
            <Link
              href="/assessment"
              className="text-sm font-semibold hover:opacity-80 transition-opacity focus-ring"
              style={{ color: "#A0A0A0" }}
            >
              Retake
            </Link>
          </div>
        </nav>
        <div
          className="px-6 md:px-12 py-2 text-xs"
          style={{ background: "rgba(245,197,24,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#606060" }}
        >
          Demo mode — these results are session-only and have not been saved to any database.
        </div>
      </header>

      <main id="main-content" className="flex-1 px-6 md:px-12 py-14 max-w-4xl">
        {/* Overall score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-6" style={{ color: "#F5C518" }}>
            Your Results
          </p>
          <div className="flex items-end gap-6 mb-6">
            <span
              className="font-black leading-none"
              style={{ fontSize: "clamp(64px, 12vw, 96px)", color: "#F5C518" }}
            >
              {overall}
            </span>
            <div className="pb-3">
              <div className="text-xl font-semibold">{label}</div>
              <div className="text-xs font-semibold tracking-wide uppercase mt-1" style={{ color: "#606060" }}>
                Overall Maturity Score
              </div>
            </div>
          </div>
          <div className="h-1 rounded-full w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #F5C518, #FFD43B)" }}
              initial={{ width: 0 }}
              animate={{ width: `${overall}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>

        {/* Dimension cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {scores.map((dim, i) => (
            <motion.div
              key={dim.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              className="p-6 rounded-xl"
              style={{
                background: "rgba(20,20,20,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-black" style={{ color: dim.color }}>
                      {dim.letter}
                    </span>
                    <span className="text-sm font-semibold">{dim.key}</span>
                  </div>
                  <p className="text-xs" style={{ color: "#606060" }}>{dim.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: dim.color }}>{dim.score}</div>
                  <div className="text-xs font-semibold tracking-wide uppercase mt-0.5" style={{ color: "#606060" }}>
                    {maturityLabel(dim.score)}
                  </div>
                </div>
              </div>
              <div className="h-0.5 rounded-full w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: dim.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${dim.score}%` }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA + download */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="rounded-xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ background: "rgba(245,197,24,0.06)", border: "1px solid rgba(245,197,24,0.15)" }}
        >
          <div>
            <p className="text-sm font-bold mb-1">Want to learn more about the AIRE Framework?</p>
            <p className="text-xs" style={{ color: "#A0A0A0" }}>
              Download the Companion Guide for a full walkthrough of the methodology,
              assessment cells, and 30-day action pathway.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link
              href="/assessment"
              className="text-sm font-semibold px-5 py-3 rounded transition-all focus-ring"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#A0A0A0",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Retake Assessment
            </Link>
            <a
              href="/AIRE-Companion-Guide.pdf"
              download
              className="text-sm font-bold px-6 py-3 rounded transition-all focus-ring inline-flex items-center gap-2"
              style={{ background: "#F5C518", color: "#0A0A0A" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#FFD43B";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(245,197,24,0.4)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#F5C518";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Guide
            </a>
          </div>
        </motion.div>
      </main>

      {/* Maturity legend */}
      <footer
        className="px-6 md:px-12 py-8 mt-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-4" style={{ color: "#606060" }}>
          Maturity Scale
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Initial", range: "0–19", color: "#606060" },
            { label: "Emerging", range: "20–39", color: "#A0A0A0" },
            { label: "Developing", range: "40–59", color: "#64B5F6" },
            { label: "Established", range: "60–79", color: "#4CAF50" },
            { label: "Leading", range: "80–100", color: "#F5C518" },
          ].map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 px-3 py-2 rounded"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
              <span className="text-xs font-semibold" style={{ color: "#A0A0A0" }}>{m.label}</span>
              <span className="text-xs" style={{ color: "#606060" }}>{m.range}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
