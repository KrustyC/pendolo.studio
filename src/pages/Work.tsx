import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    title: "Meridian Cultural Centre",
    category: "Brand · Web Design · Development",
    context: "A cultural venue bridging Italian and British arts programming needed a cohesive identity and digital platform.",
    outcome: "Complete brand identity, bilingual website, and event management system serving 15,000+ annual visitors.",
    color: "bg-secondary",
  },
  {
    title: "Terraverde Organic",
    category: "Brand · E-commerce",
    context: "A family-run organic producer expanding from local markets to European-wide online sales.",
    outcome: "Brand system and e-commerce platform handling multi-currency, multi-language product catalogue.",
    color: "bg-muted",
  },
  {
    title: "Lumen Foundation",
    category: "Web Design · Development",
    context: "A non-profit supporting digital literacy needed a clear, accessible website to communicate impact and attract donors.",
    outcome: "Accessible, fast-loading website with integrated donation flow and impact reporting dashboard.",
    color: "bg-card",
  },
  {
    title: "Forge & Frame",
    category: "Brand Identity",
    context: "An architectural photography studio needed an identity that reflected precision and craft.",
    outcome: "Minimal brand system with custom typography, stationery suite, and portfolio website.",
    color: "bg-secondary",
  },
];

const Work = () => {
  return (
    <main className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20 animate-fade-up">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Work</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
            Selected
            <br />
            <span className="font-editorial italic font-normal">case studies.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Each project follows a structured approach: understand the problem, define the strategy, design the solution, build it right.
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <article key={study.title} className="border-t border-border pt-8">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-1">
                  <span className="text-sm text-muted-foreground font-body">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={`md:col-span-5 ${study.color} aspect-[4/3] rounded-sm`} />
                <div className="md:col-span-6">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    {study.category}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                    {study.title}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Context</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.context}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Outcome</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-border pt-16 mt-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Your project could be next.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide group mt-2"
          >
            Start a conversation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Work;
