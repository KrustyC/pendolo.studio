import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    <main className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20 animate-fade-up">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Process</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
            Structured,
            <br />
            <span className="font-editorial italic font-normal">not rigid.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Every project follows a clear process. It adapts to the scope and complexity of the work, but the discipline stays the same.
          </p>
        </div>

        <div className="space-y-0">
          {processSteps.map((step) => (
            <section key={step.number} className="border-t border-border py-12 md:py-16">
              <div className="grid md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-1">
                  <span className="text-sm text-muted-foreground font-body">{step.number}</span>
                </div>
                <div className="md:col-span-4">
                  <h2 className="font-display text-xl md:text-2xl font-bold mb-3">{step.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                <div className="md:col-span-7 md:pl-8">
                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="text-sm text-muted-foreground flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-border pt-16 mt-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Ready to start the process?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide rounded-sm group transition-colors hover:bg-foreground/90"
          >
            Start a project
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProcessPage;
