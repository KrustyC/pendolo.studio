import type { Metadata } from "next";

import { Hero } from "./_components/Hero";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.pendolo.studio",
  },
  openGraph: {
    url: "https://www.pendolo.studio",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pendolo Studio",
  url: "https://www.pendolo.studio",
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
    </main>
  );
}
