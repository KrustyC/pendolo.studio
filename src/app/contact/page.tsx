import { Suspense } from "react";

import { ContactForm } from "./_components/ContactForm";

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
