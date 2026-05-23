import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white pb-24 md:pb-28">
      <div className="text-center text-[#0D0D0D]">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-neutral-500">Oops! Page not found</p>
        <Link
          href="/"
          className="text-[#F25C3D] underline underline-offset-4 transition-opacity hover:opacity-90"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
