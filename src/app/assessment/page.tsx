"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, DIMENSIONS, type Answer } from "@/lib/assessment";

const C = {
  bg:      "#0D2255",
  card:    "#163070",
  mid:     "#091A45",
  surface: "#1A3A80",
  accent:  "#ADE1FB",
  border:  "rgba(173,225,251,0.1)",
  muted:   "rgba(173,225,251,0.72)",
  subtle:  "rgba(173,225,251,0.4)",
};

// Neumorphic shadow tokens — medium-tone base unlocks both light and dark directions
const raised   = "-8px -8px 18px rgba(50,100,220,0.65), 8px 8px 22px rgba(0,5,25,0.92)";
const pressed  = "inset 5px 5px 12px rgba(0,5,25,0.88), inset -4px -4px 10px rgba(50,100,220,0.45)";
const btnRaised = "-5px -5px 14px rgba(50,100,220,0.55), 5px 5px 16px rgba(0,5,25,0.9)";
const btnHover  = "-8px -8px 18px rgba(70,130,240,0.55), 8px 8px 22px rgba(0,5,25,0.95), 0 0 28px rgba(173,225,251,0.25)";
const btnGradient = "linear-gradient(135deg, #C4EAFE 0%, #ADE1FB 45%, #7EC8E3 100%)";
const trackInset  = "inset 4px 4px 9px rgba(0,5,25,0.85), inset -3px -3px 7px rgba(50,100,220,0.42)";

const DIM_COLORS = ["#ADE1FB", "#7EB8D4", "#ADE1FB", "#7EB8D4"];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]           = useState<Answer[]>([]);
  const [selected, setSelected]         = useState<number | null>(null);
  const [direction, setDirection]       = useState(1);

  const question  = QUESTIONS[currentIndex];
  const progress  = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const isLast    = currentIndex === QUESTIONS.length - 1;
  const dimIndex  = DIMENSIONS.findIndex(d => d.key === question.dimension);
  const dim       = DIMENSIONS[dimIndex];
  const dimColor  = DIM_COLORS[dimIndex];

  function handleNext() {
    if (selected === null) return;
    const updated = [
      ...answers.filter(a => a.questionId !== question.id),
      { questionId: question.id, value: selected },
    ];
    if (isLast) {
      sessionStorage.setItem("aire-answers", JSON.stringify(updated));
      router.push("/results");
      return;
    }
    setDirection(1);
    setAnswers(updated);
    setSelected(answers.find(a => a.questionId === QUESTIONS[currentIndex + 1].id)?.value ?? null);
    setCurrentIndex(i => i + 1);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setDirection(-1);
    const prev = QUESTIONS[currentIndex - 1];
    setSelected(answers.find(a => a.questionId === prev.id)?.value ?? null);
    setCurrentIndex(i => i - 1);
  }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 24 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -24 }),
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-white" style={{ background: C.bg }}>

      {/* Nav */}
      <header>
        <nav className="px-6 md:px-10 py-5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${C.border}` }}>
          <Link href="/" className="text-sm font-extrabold tracking-[0.18em] uppercase hover:opacity-70 transition-opacity focus-ring">
            AIRE™
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs px-3 py-1 rounded-full font-extrabold tracking-wider uppercase"
              style={{
                background: C.card,
                color: C.accent,
                border: `1px solid rgba(173,225,251,0.12)`,
                boxShadow: raised,
              }}>
              Prototype
            </span>
            <span className="text-xs font-semibold tabular-nums" style={{ color: C.muted }}>
              {currentIndex + 1} / {QUESTIONS.length}
            </span>
          </div>
        </nav>

        {/* Neumorphic progress bar */}
        <div className="px-6 md:px-10 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="h-3 rounded-full overflow-hidden"
            style={{ background: C.mid, boxShadow: trackInset }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: btnGradient }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-semibold" style={{ color: C.subtle }}>
              {dim.key} · Cell {question.cell} of 3
            </span>
            <span className="text-xs font-bold" style={{ color: dimColor }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Demo notice */}
        <div className="px-6 md:px-10 py-2 text-xs font-medium"
          style={{ background: "rgba(173,225,251,0.02)", borderBottom: `1px solid ${C.border}`, color: C.muted }}>
          Demo mode. Responses are stored in your browser session only.
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="md:w-64 px-6 md:px-8 py-10 flex flex-col gap-8 shrink-0"
          style={{ borderRight: `1px solid ${C.border}` }}>

          {/* Current dimension badge */}
          <div>
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: C.subtle }}>
              Dimension
            </p>
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: C.card, boxShadow: raised, border: `1px solid rgba(173,225,251,0.06)` }}>
              <span className="text-3xl" style={{ fontWeight: 900, color: dimColor, lineHeight: 1 }}>{dim.letter}</span>
              <div>
                <div className="text-sm font-bold text-white">{dim.key}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: C.muted }}>{dim.desc}</div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="hidden md:block">
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: C.subtle }}>Progress</p>
            <div className="flex flex-col gap-4">
              {DIMENSIONS.map((d, di) => {
                const dimQs     = QUESTIONS.filter(q => q.dimension === d.key);
                const isCurrent = d.key === question.dimension;
                const dc        = DIM_COLORS[di];
                return (
                  <div key={d.key} className="flex items-center gap-3">
                    <span className="text-xs w-4 font-extrabold" style={{ color: isCurrent ? dc : "rgba(173,225,251,0.2)" }}>
                      {d.letter}
                    </span>
                    <div className="flex gap-2">
                      {dimQs.map(q => {
                        const ans   = answers.find(a => a.questionId === q.id);
                        const isCur = q.id === question.id;
                        return (
                          <div key={q.id}
                            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                            style={{
                              background: isCur ? dc : ans ? "rgba(173,225,251,0.5)" : C.card,
                              boxShadow:  isCur
                                ? `0 0 8px ${dc}aa, ${raised}`
                                : ans
                                ? raised
                                : pressed,
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

        {/* Question area */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-14 py-14 max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={question.id} custom={direction}
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>

              <h1 className="text-2xl md:text-3xl leading-snug mb-3" style={{ letterSpacing: "-0.01em", fontWeight: 800 }}>
                {question.text}
              </h1>

              {question.subtext && (
                <p className="text-sm mb-10 font-medium" style={{ color: C.muted }}>{question.subtext}</p>
              )}

              {/* Neumorphic radio options */}
              <fieldset className="flex flex-col gap-3 mb-12">
                <legend className="sr-only">Rate your organization from 1 to 5</legend>
                {question.options.map(opt => {
                  const isSel = selected === opt.value;
                  return (
                    <label key={opt.value}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200"
                      style={{
                        background: C.card,
                        boxShadow:  isSel ? pressed : raised,
                        border:     isSel
                          ? `1px solid rgba(173,225,251,0.25)`
                          : `1px solid rgba(173,225,251,0.05)`,
                        transform:  isSel ? "scale(0.99)" : "scale(1)",
                      }}
                    >
                      <input type="radio" name="answer" value={opt.value}
                        checked={isSel} onChange={() => setSelected(opt.value)} className="sr-only" />

                      {/* Neumorphic radio dot */}
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                        style={{
                          background: C.mid,
                          boxShadow: isSel ? pressed : raised,
                        }}>
                        {isSel && (
                          <div className="w-2 h-2 rounded-full" style={{ background: dimColor }} />
                        )}
                      </div>

                      <span className="text-xs font-extrabold w-4 tabular-nums shrink-0"
                        style={{ color: isSel ? dimColor : C.subtle }}>
                        {opt.value}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: isSel ? "#fff" : C.muted }}>
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </fieldset>

              {/* Navigation buttons */}
              <div className="flex items-center gap-4">
                {currentIndex > 0 && (
                  <button onClick={handleBack}
                    className="text-sm font-bold px-6 py-3 rounded-full transition-all focus-ring"
                    style={{
                      color: C.muted,
                      background: C.card,
                      boxShadow: raised,
                      border: `1px solid rgba(173,225,251,0.06)`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "-8px -8px 18px rgba(70,130,240,0.55), 8px 8px 22px rgba(0,5,25,0.95)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = raised;
                      (e.currentTarget as HTMLElement).style.color = C.muted;
                    }}
                  >← Back</button>
                )}

                <button onClick={handleNext} disabled={selected === null}
                  className="text-sm font-extrabold px-8 py-3.5 rounded-full transition-all focus-ring inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: btnGradient,
                    color: C.bg,
                    boxShadow: selected !== null ? btnRaised : "none",
                  }}
                  onMouseEnter={e => {
                    if (selected !== null) {
                      (e.currentTarget as HTMLElement).style.boxShadow = btnHover;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = selected !== null ? btnRaised : "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}>
                  {isLast ? "View Results →" : "Continue →"}
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
