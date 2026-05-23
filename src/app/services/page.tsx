import type { Metadata } from "next";
import Link from "next/link";

import { ServicesHero } from "./_components/ServicesHero";
import { ServicesStack } from "./_components/ServicesStack";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, product design, and web development. Identity systems, UI design, and performant code — built to last.",
  alternates: {
    canonical: "https://www.pendolo.studio/services",
  },
  openGraph: {
    url: "https://www.pendolo.studio/services",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Branding",
      provider: {
        "@type": "Organization",
        name: "Pendolo Studio",
        url: "https://www.pendolo.studio",
      },
      description:
        "Identity systems that communicate clearly and hold up over time. We start with strategy and build outward — from naming and positioning to the visual system that carries it all.",
      serviceType: "Branding",
      url: "https://www.pendolo.studio/services",
    },
    {
      "@type": "Service",
      name: "Product Design",
      provider: {
        "@type": "Organization",
        name: "Pendolo Studio",
        url: "https://www.pendolo.studio",
      },
      description:
        "Research-driven design that balances form and function. Clear information architecture, strong visual systems, considered user experience.",
      serviceType: "Product Design",
      url: "https://www.pendolo.studio/services",
    },
    {
      "@type": "Service",
      name: "Web Design",
      provider: {
        "@type": "Organization",
        name: "Pendolo Studio",
        url: "https://www.pendolo.studio",
      },
      description:
        "Clean, performant code with deployment discipline. From implementation through monitoring, built for speed and reliability.",
      serviceType: "Web Design",
      url: "https://www.pendolo.studio/services",
    },
  ],
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ServicesHero />
      <ServicesStack />
      <section className="bg-[#F25C3D] text-[#0D0D0D]">
        <div className="container mx-auto flex flex-col items-start gap-6 px-6 pt-10 pb-14 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:pt-12 md:pb-16 lg:px-14 lg:pb-20">
          <p className="max-w-2xl text-balance text-[clamp(1.1rem,1.6vw,1.5rem)] font-light leading-snug tracking-tight">
            If you still have your doubts but are curious to know us, set up a
            free call.
          </p>
          <Link
            href="/contact"
            className="cta-marketing shrink-0 whitespace-nowrap"
          >
            Book an Intro Call
          </Link>
        </div>
      </section>
    </main>
  );
}
