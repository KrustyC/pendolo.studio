import { Link } from "react-router-dom";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesStack from "@/components/services/ServicesStack";

const Services = () => {
  return (
    <main>
      <ServicesHero />
      <ServicesStack />
      <section className="bg-[#F25C3D] text-[#0D0D0D]">
        <div className="container mx-auto flex flex-col items-start gap-6 px-6 pt-10 pb-14 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:pt-12 md:pb-16 lg:px-14 lg:pb-20">
          <p className="max-w-2xl text-balance text-[clamp(1.1rem,1.6vw,1.5rem)] font-light leading-snug tracking-tight">
            If you still have your doubts but are curious to know us, set up a free call.
          </p>
          <Link to="/contact" className="cta-marketing shrink-0 whitespace-nowrap">
            Book an Intro Call
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
