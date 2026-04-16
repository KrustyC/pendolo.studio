import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center pt-28 pb-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10 animate-fade-up">
            Motion with a fixed point
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight leading-[1.3] mb-14 animate-fade-up-delay-1">
            Pendolo is a boutique studio combining{" "}
            <span className="font-editorial border-b border-foreground/30 pb-0.5">design</span>{" "}
            foundations with technical precision.{" "}
            <span className="font-editorial border-b border-foreground/30 pb-0.5">Brand identity</span>,{" "}
            <span className="font-editorial border-b border-foreground/30 pb-0.5">web design</span>,{" "}
            and development for businesses that value clarity.
          </h1>
          <Link
            to="/work"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity animate-fade-up-delay-2"
          >
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
