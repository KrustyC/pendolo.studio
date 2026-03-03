import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <main className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 animate-fade-up">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">About</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
            A studio built on
            <br />
            <span className="font-editorial italic font-normal">complementary strengths.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Pendolo was formed from a simple observation: great design without solid technology falls short. Strong technology without considered design fails to connect. We decided to bridge that gap.
          </p>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-24">
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">The name</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Pendolo is the Italian word for pendulum. It represents balance — the constant, measured movement between design and technology. Neither side dominates. Both sides inform the work.
            </p>

            <h2 className="font-display text-xl font-semibold mb-4 mt-10">How we work</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are a boutique studio: a designer and a developer at the core, supported by trusted collaborators when projects require it. This means every project gets direct attention from the people who make the decisions.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Design meets engineering</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Our designer brings deep graphic design foundations — brand systems, typography, visual hierarchy. Our developer brings corporate-level engineering experience — clean architecture, observability, performance optimization, deployment discipline.
            </p>

            <h2 className="font-display text-xl font-semibold mb-4 mt-10">International reach</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Based between the UK and Italy, we work across borders naturally. The team is bilingual in Italian and English, with working Spanish. Cross-cultural projects are not an exception — they are our baseline.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="border-t border-border pt-16 mb-20">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-8">Team</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
            <div>
              <div className="bg-muted aspect-square rounded-sm mb-4 max-w-[200px]" />
              <h3 className="font-display font-semibold">Design Lead</h3>
              <p className="text-sm text-muted-foreground">Brand identity, visual systems, UX/UI</p>
            </div>
            <div>
              <div className="bg-muted aspect-square rounded-sm mb-4 max-w-[200px]" />
              <h3 className="font-display font-semibold">Development Lead</h3>
              <p className="text-sm text-muted-foreground">Architecture, performance, deployment</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Want to work together?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide group mt-2"
          >
            Get in touch
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default About;
