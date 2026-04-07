import { Link } from "react-router-dom";

const caseStudies = [
  {
    title: "Meridian Cultural Centre",
    category: "Brand · Web Design · Development",
    context: "A cultural venue bridging Italian and British arts programming needed a cohesive identity and digital platform.",
    outcome: "Complete brand identity, bilingual website, and event management system serving 15,000+ annual visitors.",
  },
  {
    title: "Terraverde Organic",
    category: "Brand · E-commerce",
    context: "A family-run organic producer expanding from local markets to European-wide online sales.",
    outcome: "Brand system and e-commerce platform handling multi-currency, multi-language product catalogue.",
  },
  {
    title: "Lumen Foundation",
    category: "Web Design · Development",
    context: "A non-profit supporting digital literacy needed a clear, accessible website to communicate impact and attract donors.",
    outcome: "Accessible, fast-loading website with integrated donation flow and impact reporting dashboard.",
  },
  {
    title: "Forge & Frame",
    category: "Brand Identity",
    context: "An architectural photography studio needed an identity that reflected precision and craft.",
    outcome: "Minimal brand system with custom typography, stationery suite, and portfolio website.",
  },
];

const Work = () => {
  return (
    <main className="pt-32 md:pt-44 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-28 animate-fade-up">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">WORK</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-10">
            Selected
            <br />
            <span className="font-editorial">case studies.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Each project follows a structured approach: understand the problem, define the strategy, design the solution, build it right.
          </p>
        </div>

        <div className="space-y-0">
          {caseStudies.map((study, index) => (
            <article key={study.title} className="border-t border-border py-12 md:py-16">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-1">
                  <span className="text-xs text-muted-foreground tracking-[0.2em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <div className="bg-secondary aspect-[4/3]" />
                </div>
                <div className="md:col-span-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    {study.category}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                    {study.title}
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Context</p>
                      <p className="text-sm text-muted-foreground leading-[1.8]">{study.context}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Outcome</p>
                      <p className="text-sm text-muted-foreground leading-[1.8]">{study.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-border pt-20 mt-8">
          <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
            Your project could be next.
          </h2>
          <Link
            to="/contact"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Work;
