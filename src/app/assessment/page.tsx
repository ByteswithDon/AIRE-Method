"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, DIMENSIONS, type Answer } from "@/lib/assessment";

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const question = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const isLast = currentIndex === QUESTIONS.length - 1;
  const dim = DIMENSIONS.find((d) => d.key === question.dimension)!;

  function handleSelect(value: number) {
    setSelected(value);
  }

  function handleNext() {
    if (selected === null) return;
    const updated = [
      ...answers.filter((a) => a.questionId !== question.id),
      { questionId: question.id, value: selected },
    ];
    if (isLast) {
      sessionStorage.setItem("aire-answers", JSON.stringify(updated));
      router.push("/results");
      return;
    }
    setDirection(1);
    setAnswers(updated);
    setSelected(answers.find((a) => a.questionId === QUESTIONS[currentIndex + 1].id)?.value ?? null);
    setCurrentIndex((i) => i + 1);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setDirection(-1);
    const prev = QUESTIONS[currentIndex - 1];
    setSelected(answers.find((a) => a.questionId === prev.id)?.value ?? null);
    setCurrentIndex((i) => i - 1);
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -24 }),
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-white" style={{ background: "#0A0A0A" }}>
      {/* Header */}
      <header>
        <nav
          className="px-6 md:px-10 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link href="/" className="text-sm font-bold tracking-[0.18em] uppercase focus-ring hover:opacity-80 transition-opacity">
            AIRE™
          </Link>
          <div className="flex items-center gap-4">
            <span
              className="text-xs px-2 py-0.5 rounded font-bold tracking-wider uppercase"
              style={{ background: "rgba(245,197,24,0.1)", color: "#F5C518", border: "1px solid rgba(245,197,24,0.2)" }}
            >
              Prototype
            </span>
            <span className="text-xs" style={{ color: "#606060" }}>
              {currentIndex + 1} / {QUESTIONS.length}
            </span>
          </div>
        </nav>

        {/* Progress bar */}
        <div className="h-0.5 relative" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{ background: "#F5C518" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Demo notice */}
        <div
          className="px-6 md:px-10 py-2 text-xs"
          style={{ background: "rgba(245,197,24,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#606060" }}
        >
          Demo mode — responses are stored in your browser session only and will not be saved.
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className="md:w-64 px-6 md:px-8 py-10 flex flex-col gap-8 shrink-0"
          style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: "#606060" }}>
              Dimension
            </p>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black" style={{ color: dim.color }}>
                {dim.letter}
              </span>
              <div>
                <div className="text-sm font-semibold">{dim.key}</div>
                <div className="text-xs mt-0.5" style={{ color: "#606060" }}>{dim.desc}</div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="hidden md:block">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: "#606060" }}>
              Progress
            </p>
            <div className="flex flex-col gap-3">
              {DIMENSIONS.map((d) => {
                const dimQs = QUESTIONS.filter((q) => q.dimension === d.key);
                const isCurrent = d.key === question.dimension;
                return (
                  <div key={d.key} className="flex items-center gap-3">
                    <span className="text-xs w-4 font-black" style={{ color: isCurrent ? d.color : "#333" }}>
                      {d.letter}
                    </span>
                    <div className="flex gap-1.5">
                      {dimQs.map((q) => {
                        const ans = answers.find((a) => a.questionId === q.id);
                        const isCur = q.id === question.id;
                        return (
                          <div
                            key={q.id}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              background: isCur ? d.color : ans ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)",
                              boxShadow: isCur ? `0 0 6px ${d.color}80` : "none",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-14 py-14 max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-bold tracking-[0.18em] uppercase mb-6" style={{ color: dim.color }}>
                {dim.key} · Cell {question.cell} of 3
              </p>

              <h1
                className="text-2xl md:text-3xl font-semibold leading-snug mb-3"
                style={{ letterSpacing: "-0.01em" }}
              >
                {question.text}
              </h1>

              {question.subtext && (
                <p className="text-sm mb-10 font-light" style={{ color: "#A0A0A0" }}>
                  {question.subtext}
                </p>
              )}

              <fieldset className="flex flex-col gap-2.5 mb-12">
                <legend className="sr-only">Rate your organization from 1 to 5</legend>
                {question.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center gap-4 px-5 py-4 rounded-lg cursor-pointer transition-all duration-200"
                      style={{
                        background: isSelected ? "rgba(245,197,24,0.1)" : "rgba(255,255,255,0.03)",
                        border: isSelected ? "1px solid rgba(245,197,24,0.4)" : "1px solid rgba(255,255,255,0.06)",
                        boxShadow: isSelected ? "0 0 16px rgba(245,197,24,0.1)" : "none",
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                          (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.1)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                          (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.06)";
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={opt.value}
                        checked={isSelected}
                        onChange={() => handleSelect(opt.value)}
                        className="sr-only"
                      />
                      <span
                        className="text-xs font-black w-5 tabular-nums"
                        style={{ color: isSelected ? "#F5C518" : "#606060" }}
                      >
                        {opt.value}
                      </span>
                      <span className="text-sm font-medium">{opt.label}</span>
                      {isSelected && (
                        <span className="ml-auto text-xs" style={{ color: "#F5C518" }}>✓</span>
                      )}
                    </label>
                  );
                })}
              </fieldset>

              <div className="flex items-center gap-4">
                {currentIndex > 0 && (
                  <button
                    onClick={handleBack}
                    className="text-sm font-semibold hover:opacity-60 transition-opacity focus-ring"
                    style={{ color: "#A0A0A0" }}
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className="text-sm font-bold px-8 py-3.5 rounded transition-all focus-ring inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: "#F5C518", color: "#0A0A0A", minHeight: 44 }}
                  onMouseEnter={e => {
                    if (selected !== null) {
                      (e.currentTarget as HTMLElement).style.background = "#FFD43B";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(245,197,24,0.4)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "#F5C518";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {isLast ? "View Results" : "Continue"}
                  <span>{isLast ? "→" : "→"}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
