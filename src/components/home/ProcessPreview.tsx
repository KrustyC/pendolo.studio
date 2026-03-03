import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Process</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            How we work
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-xs text-muted-foreground font-body tracking-wide">
                {step.number}
              </span>
              <h3 className="font-display text-lg font-semibold mt-2 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/process"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide group"
          >
            Learn more about our process
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessPreview;
