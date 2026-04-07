import { Link } from "react-router-dom";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We start by listening. Understanding your business, your audience, your goals, and the constraints we're working within.",
    details: [
      "Initial briefing and objectives alignment",
      "Stakeholder interviews when needed",
      "Defining project scope and deliverables",
      "Timeline and budget agreement",
    ],
  },
  {
    number: "02",
    title: "Research & Architecture",
    description: "Before any visual work begins, we map the landscape. Competitor analysis, content audit, and information architecture define the foundation.",
    details: [
      "Competitor and market analysis",
      "Content audit and inventory",
      "Information architecture",
      "User journey mapping",
    ],
  },
  {
    number: "03",
    title: "Design",
    description: "Visual direction, interface design, and brand systems. Every design decision is grounded in the research phase. Iteration is structured, not endless.",
    details: [
      "Visual concept development",
      "UI/UX design with iterative feedback",
      "Component system and design tokens",
      "Responsive and adaptive design",
    ],
  },
  {
    number: "04",
    title: "Development",
    description: "Clean code, modern frameworks, performance-first architecture. Development runs parallel to final design refinements, not after them.",
    details: [
      "Frontend and backend implementation",
      "Clean architecture and code standards",
      "CMS and content management integration",
      "Third-party integrations",
    ],
  },
  {
    number: "05",
    title: "Testing & Optimization",
    description: "Performance testing, accessibility audits, cross-browser checks. We test under real-world conditions, not just ideal ones.",
    details: [
      "Performance and load testing",
      "Accessibility compliance checks",
      "Cross-browser and device testing",
      "Core Web Vitals optimization",
    ],
  },
  {
    number: "06",
    title: "Launch & Monitoring",
    description: "Deployment with confidence. Monitoring, observability, and analytics from day one. We don't launch and disappear.",
    details: [
      "Staged deployment and DNS configuration",
      "Observability and uptime monitoring",
      "Analytics and tracking setup",
      "Post-launch support and iteration",
    ],
  },
];

const ProcessPage = () => {
  return (
    <main className="pt-32 md:pt-44 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-28 animate-fade-up">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">PROCESS</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-10">
            Structured,
            <br />
            <span className="font-editorial">not rigid.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Every project follows a clear process. It adapts to the scope and complexity of the work, but the discipline stays the same.
          </p>
        </div>

        <div className="space-y-0">
          {processSteps.map((step) => (
            <section key={step.number} className="border-t border-border py-16 md:py-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-1">
                  <span className="text-xs text-muted-foreground tracking-[0.2em]">{step.number}</span>
                </div>
                <div className="md:col-span-4">
                  <h2 className="text-xl md:text-2xl font-light tracking-tight mb-4">{step.title}</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">{step.description}</p>
                </div>
                <div className="md:col-span-7 md:pl-8">
                  <ul className="space-y-4">
                    {step.details.map((detail) => (
                      <li key={detail} className="text-sm text-muted-foreground flex items-start gap-4">
                        <span className="w-1 h-1 rounded-full bg-foreground/30 mt-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-border pt-20 mt-8">
          <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
            Ready to start the process?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase border border-foreground/30 px-6 py-3 text-foreground/80 hover:text-foreground hover:border-foreground/60 transition-all duration-300"
          >
            Start a project
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProcessPage;
