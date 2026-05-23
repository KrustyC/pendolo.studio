import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Footer } from "@/components/Footer";
import { GlassCursor } from "@/components/GlassCursor";
import { Navbar } from "@/components/Navbar";
import { fontVariables } from "@/lib/utils/fonts";

import "./globals.css";

const BASE_URL = "https://www.pendolo.studio";
const DESCRIPTION =
  "Branding, web design and development for businesses that value a different point of view.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Pendolo Studio",
    template: "%s | Pendolo Studio",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Pendolo Studio",
    title: "Pendolo Studio",
    description: DESCRIPTION,
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pendolo Studio",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pendolo Studio",
  url: BASE_URL,
  logo: `${BASE_URL}/brand.svg`,
  email: "hello@pendolo.studio",
  description: DESCRIPTION,
  knowsAbout: [
    "Branding",
    "Brand Strategy",
    "Identity Design",
    "Web Design",
    "Web Development",
    "Product Design",
    "UX Design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <GlassCursor />
        <Navbar />
        {children}
        <Footer />
        <Toaster />

        {process.env.NODE_ENV === "production" ? (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        ) : null}
      </body>
    </html>
  );
}
