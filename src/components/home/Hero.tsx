import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-6">
              Digital Design Studio
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
              Design with
              <br />
              structure.
              <br />
              <span className="font-editorial italic font-normal">Build with discipline.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mb-10">
              Pendolo is a boutique studio combining design foundations with technical precision. Brand identity, web design, and development for businesses that value clarity.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-sm font-medium tracking-wide group"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-up-delay-2">
            <div className="relative w-32 h-64">
              <div className="pendulum-arm absolute top-0 left-1/2 -translate-x-1/2">
                <div className="w-px h-48 bg-foreground/30" />
                <div className="w-5 h-5 rounded-full bg-accent -translate-x-[9px] mt-[-1px]" />
              </div>
              <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-foreground/20 -translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
