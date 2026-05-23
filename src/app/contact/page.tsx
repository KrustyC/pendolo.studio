import { Suspense } from "react";
import type { Metadata } from "next";

import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Pendolo Studio. Get in touch for branding, web design, and development enquiries.",
  alternates: {
    canonical: "https://www.pendolo.studio/contact",
  },
  openGraph: {
    url: "https://www.pendolo.studio/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="section-dark min-h-svh flex items-center py-20 md:py-24">
      <div className="container mx-auto w-full px-3 md:px-4 lg:px-6">
        <div className="max-w-5xl mx-auto animate-fade-up">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
