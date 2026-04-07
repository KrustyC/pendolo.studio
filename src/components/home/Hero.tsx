import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10 animate-fade-up">
            READY?
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-light tracking-tight leading-[1.05] mb-12 animate-fade-up-delay-1">
            Let's build
            <br />
            something
            <br />
            <span className="font-editorial">iconic.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-14 animate-fade-up-delay-2">
            Pendolo is a boutique studio combining design foundations with technical precision. Brand identity, web design, and development for businesses that value clarity.
          </p>
          <Link
            to="/contact"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity animate-fade-up-delay-3"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
