import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Have a project
            <br />
            <span className="font-editorial italic font-normal">in mind?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            We work with businesses that care about how they present themselves. If that sounds like you, let's talk.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide rounded-sm group transition-colors hover:bg-foreground/90"
          >
            Get in touch
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
