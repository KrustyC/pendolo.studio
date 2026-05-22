import { useState } from "react";

/** Same palette order as `ServicesPreview` — cycles for four steps */
const STEP_THEMES = [
  { bg: "#9484D2", fg: "#0D0D0D" },
  { bg: "#43CCBC", fg: "#0D0D0D" },
  { bg: "#0D0D0D", fg: "#FFFFFF" },
  { bg: "#9484D2", fg: "#0D0D0D" },
] as const;

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your business, goals, and audience.",
    detail:
      "We start by listening. Stakeholder conversations, audience interviews, and a careful audit of where you are today. The goal is to surface the real problem worth solving — not the one that was easiest to brief.",
  },
  {
    number: "02",
    title: "Research",
    description: "Competitor analysis, content architecture, strategic direction.",
    detail:
      "We map the landscape you operate in, study how people actually move through it, and turn the findings into a clear strategic direction. Every later decision traces back to something concrete from this stage.",
  },
  {
    number: "03",
    title: "Design",
    description: "Visual concepts, UI systems, and iterative refinement.",
    detail:
      "Identity, interface, and motion are developed in tight loops. We design in the medium — real type, real grids, real components — and refine until the work feels inevitable rather than decorated.",
  },
  {
    number: "04",
    title: "Development",
    description: "Clean implementation with performance as a baseline.",
    detail:
      "We build with the same care as we design. Modern stacks, accessible markup, considered interactions, and performance treated as a feature. What launches is what we'd want to inherit ourselves.",
  },
];

const ProcessPreview = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-32 md:py-44">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">How we work</h2>
      </div>

      {/* Full-viewport horizontal bands — colours match “What we do” */}
      <div className="relative w-full min-h-[100svh] h-[100svh] flex overflow-hidden border-t border-black/10">
        {steps.map((step, index) => {
          const isActive = index === active;
          const theme = STEP_THEMES[index % STEP_THEMES.length];
          const isDark = theme.bg === "#0D0D0D";
          const divider = isDark ? "border-l border-white/15" : "border-l border-black/10";

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              aria-expanded={isActive}
              className={`group relative h-full min-h-0 text-left ${divider} first:border-l-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                isActive ? "flex-grow-[8]" : "flex-grow-[1] hover:brightness-[1.03]"
              }`}
              style={{
                flexBasis: 0,
                backgroundColor: theme.bg,
                color: theme.fg,
              }}
            >
              {/* Collapsed rail — top-aligned */}
              <div
                className={`absolute inset-y-0 left-0 w-14 sm:w-16 md:w-20 flex flex-col items-center justify-start gap-10 pt-8 md:pt-10 pb-8 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-100"
                }`}
              >
                <span className="text-xs tracking-[0.3em]" style={{ color: theme.fg }}>
                  {step.number}
                </span>
                <span
                  className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase whitespace-nowrap transition-opacity opacity-100"
                  style={{
                    color: theme.fg,
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {step.title}
                </span>
              </div>

              {/* Expanded panel — top-aligned copy */}
              <div
                className={`h-full min-h-0 pl-14 sm:pl-16 md:pl-24 pr-6 sm:pr-10 md:pr-14 pt-8 md:pt-10 pb-10 flex flex-col justify-start gap-8 md:gap-10 transition-opacity duration-500 ${
                  isActive ? "opacity-100 delay-200" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="max-w-xl">
                  <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: theme.fg }}>
                    Step {step.number}
                  </p>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight mb-5" style={{ color: theme.fg }}>
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: theme.fg }}>
                    {step.detail}
                  </p>
                </div>
                <p className="text-xs tracking-[0.2em] uppercase max-w-xl" style={{ color: theme.fg }}>
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
};

export default ProcessPreview;
