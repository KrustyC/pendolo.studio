import { Link } from "react-router-dom";
import { useState } from "react";

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
    <section className="py-32 md:py-44 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
            PROCESS
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
            How we work
          </h2>
        </div>

        {/* Horizontal accordion — collapses to the left */}
        <div className="flex w-full h-[420px] md:h-[480px] border-t border-b border-border overflow-hidden">
          {steps.map((step, index) => {
            const isActive = index === active;
            return (
              <button
                key={step.number}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                aria-expanded={isActive}
                className={`group relative h-full text-left border-l border-border first:border-l-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                  isActive
                    ? "flex-grow-[8] bg-background"
                    : "flex-grow-[1] bg-secondary/40 hover:bg-secondary"
                }`}
                style={{ flexBasis: 0 }}
              >
                {/* Collapsed view — vertical label on the left edge */}
                <div
                  className={`absolute inset-y-0 left-0 w-16 md:w-20 flex flex-col items-center justify-between py-8 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <span className="text-xs tracking-[0.3em] text-muted-foreground">
                    {step.number}
                  </span>
                  <span
                    className={`text-xs md:text-sm tracking-[0.25em] uppercase whitespace-nowrap transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/70"
                    }`}
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {step.title}
                  </span>
                  <span className="w-px h-8 bg-border" aria-hidden />
                </div>

                {/* Expanded content */}
                <div
                  className={`h-full pl-20 md:pl-28 pr-8 md:pr-16 py-10 md:py-14 flex flex-col justify-between transition-opacity duration-500 ${
                    isActive
                      ? "opacity-100 delay-200"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="max-w-xl">
                    <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
                      Step {step.number}
                    </p>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16">
          <Link
            to="/process"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity"
          >
            Learn more about our process and pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessPreview;
