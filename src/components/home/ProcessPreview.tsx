import { Link } from "react-router-dom";

const steps = [
  { number: "01", title: "Discovery", description: "Understanding your business, goals, and audience." },
  { number: "02", title: "Research", description: "Competitor analysis, content architecture, strategic direction." },
  { number: "03", title: "Design", description: "Visual concepts, UI systems, and iterative refinement." },
  { number: "04", title: "Development", description: "Clean implementation with performance as a baseline." },
  { number: "05", title: "Testing", description: "Quality assurance, performance testing, accessibility checks." },
  { number: "06", title: "Launch", description: "Deployment, monitoring setup, and ongoing support." },
];

const ProcessPreview = () => {
  return (
    <section className="py-32 md:py-44 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">PROCESS</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
            How we work
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-xs text-muted-foreground tracking-[0.2em]">
                {step.number}
              </span>
              <h3 className="text-lg font-normal mt-3 mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/process"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity"
          >
            Learn more about our process
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessPreview;
