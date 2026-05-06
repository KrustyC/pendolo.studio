import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

const BG = "#000000";
const FG = "#fef7ee";
const FG_MUTED = "rgba(254, 247, 238, 0.45)";
const ACCENT = "#43ccbc";

const STEP_COUNT = 8;

const processDialSteps = [
  {
    label: "Step one",
    headline: "Discovery & alignment",
    sub: "Goals, constraints, and what success looks like — agreed before pixels or commits.",
  },
  {
    label: "Step two",
    headline: "Research & audit",
    sub: "Landscape, content, and behaviour — so decisions trace back to evidence, not taste alone.",
  },
  {
    label: "Step three",
    headline: "Architecture & IA",
    sub: "Structure for navigation, templates, and scale — the skeleton the rest hangs on.",
  },
  {
    label: "Step four",
    headline: "Creative direction",
    sub: "Visual and narrative territory — a clear lane before high‑fidelity craft begins.",
  },
  {
    label: "Step five",
    headline: "Design & systems",
    sub: "UI, brand touchpoints, tokens, and components — designed in the medium they ship in.",
  },
  {
    label: "Step six",
    headline: "Build & integration",
    sub: "Implementation with performance and accessibility as baselines, not polish passes.",
  },
  {
    label: "Step seven",
    headline: "QA & optimization",
    sub: "Real devices, real conditions — accessibility, speed, and cross‑browser confidence.",
  },
  {
    label: "Step eight",
    headline: "Launch & handoff",
    sub: "Deployment, monitoring, docs, and training — so your team owns what ships.",
  },
] as const;

const cx = 200;
const cy = 200;
const ringRx = 196;
const ringRy = 128;
const dotR = 4;
const ellipsePathFromTop = `M ${cx} ${cy - ringRy} A ${ringRx} ${ringRy} 0 1 1 ${cx} ${cy + ringRy} A ${ringRx} ${ringRy} 0 1 1 ${cx} ${cy - ringRy}`;

function dotAngleRad(index: number) {
  return -Math.PI / 2 + (index / STEP_COUNT) * Math.PI * 2;
}

function ellipsePoint(x: number, y: number, rx: number, ry: number, rad: number) {
  return { x: x + rx * Math.cos(rad), y: y + ry * Math.sin(rad) };
}

function ServicesScrollProcessStatic() {
  return (
    <section
      className="border-t border-white/10 py-24 md:py-32"
      style={{ backgroundColor: BG, color: FG }}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-12">
          Eight beats, one thread
        </h2>
        <ol className="space-y-8">
          {processDialSteps.map((step, i) => (
            <li key={step.headline} className="border-l border-white/15 pl-6">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: ACCENT }}>
                {step.label}
              </p>
              <p className="text-lg md:text-xl font-light tracking-tight mb-2">{step.headline}</p>
              <p className="text-sm leading-relaxed" style={{ color: FG_MUTED }}>
                {step.sub}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServicesScrollProcessInteractive() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [stepIndex, setStepIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = p >= 1 ? STEP_COUNT - 1 : Math.floor(p * STEP_COUNT);
    setStepIndex((prev) => (prev === idx ? prev : idx));
  });

  const step = processDialSteps[stepIndex];
  const progress = stepIndex / STEP_COUNT;

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/10"
      style={{
        backgroundColor: BG,
        color: FG,
        minHeight: `${STEP_COUNT * 100}vh`,
      }}
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden px-4">
        <div className="relative mx-auto flex w-full max-w-[min(92vw,560px)] flex-col items-center justify-center">
          <div className="relative aspect-square w-full max-w-[420px] sm:max-w-[480px]">
            <svg
              viewBox="0 0 400 400"
              className="h-full w-full"
              aria-hidden
            >
              {Array.from({ length: STEP_COUNT }, (_, i) => {
                const rad = dotAngleRad(i);
                const { x, y } = ellipsePoint(cx, cy, ringRx, ringRy, rad);
                const active = i === stepIndex;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={active ? dotR + 1.5 : dotR}
                    fill={active ? ACCENT : FG}
                    fillOpacity={active ? 1 : 0.55}
                  />
                );
              })}

              <motion.path
                d={ellipsePathFromTop}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                initial={false}
                animate={{ strokeDashoffset: 1 - progress }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </svg>

            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <p
                className="mb-3 text-[10px] font-medium uppercase tracking-[0.32em]"
                style={{ color: FG_MUTED }}
              >
                {step.label}
              </p>
              <h2 className="text-balance text-lg font-light uppercase leading-snug tracking-[0.12em] sm:text-xl md:text-2xl">
                {step.headline}
              </h2>
              <p
                className="mt-4 max-w-[240px] text-pretty text-[11px] leading-relaxed sm:max-w-xs sm:text-xs"
                style={{ color: FG_MUTED }}
              >
                {step.sub}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const ServicesScrollProcess = () => {
  const reduceMotion = useReducedMotion();
  return reduceMotion ? <ServicesScrollProcessStatic /> : <ServicesScrollProcessInteractive />;
};

export default ServicesScrollProcess;
