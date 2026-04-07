import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="pt-32 md:pt-44 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-4xl mb-28 animate-fade-up">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">ABOUT</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-10">
            A studio built on
            <br />
            <span className="font-editorial">complementary strengths.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Pendolo was formed from a simple observation: great design without solid technology falls short. Strong technology without considered design fails to connect. We decided to bridge that gap.
          </p>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-32">
          <div>
            <h2 className="text-xl font-normal mb-5 tracking-tight">The name</h2>
            <p className="text-muted-foreground text-sm leading-[1.8] mb-10">
              Pendolo is the Italian word for pendulum. It represents balance — the constant, measured movement between design and technology. Neither side dominates. Both sides inform the work.
            </p>

            <h2 className="text-xl font-normal mb-5 tracking-tight">How we work</h2>
            <p className="text-muted-foreground text-sm leading-[1.8]">
              We are a boutique studio: a designer and a developer at the core, supported by trusted collaborators when projects require it. This means every project gets direct attention from the people who make the decisions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-normal mb-5 tracking-tight">Design meets engineering</h2>
            <p className="text-muted-foreground text-sm leading-[1.8] mb-10">
              Our designer brings deep graphic design foundations — brand systems, typography, visual hierarchy. Our developer brings corporate-level engineering experience — clean architecture, observability, performance optimization, deployment discipline.
            </p>

            <h2 className="text-xl font-normal mb-5 tracking-tight">International reach</h2>
            <p className="text-muted-foreground text-sm leading-[1.8]">
              Based between the UK and Italy, we work across borders naturally. The team is bilingual in Italian and English, with working Spanish. Cross-cultural projects are not an exception — they are our baseline.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="border-t border-border pt-20 mb-28">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12">TEAM</p>
          <div className="grid md:grid-cols-2 gap-12 max-w-2xl">
            <div>
              <div className="bg-secondary aspect-square mb-6 max-w-[200px]" />
              <h3 className="text-base font-normal tracking-tight">Design Lead</h3>
              <p className="text-sm text-muted-foreground mt-1">Brand identity, visual systems, UX/UI</p>
            </div>
            <div>
              <div className="bg-secondary aspect-square mb-6 max-w-[200px]" />
              <h3 className="text-base font-normal tracking-tight">Development Lead</h3>
              <p className="text-sm text-muted-foreground mt-1">Architecture, performance, deployment</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-20">
          <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6">
            Want to work together?
          </h2>
          <Link
            to="/contact"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
};

export default About;
