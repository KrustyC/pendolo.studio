"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lightOnBackdrop =
    isHome || pathname === "/contact" || pathname === "/services";

  return (
    <footer
      data-pendolo-footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-transparent px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 md:px-4 md:pb-[calc(0.875rem+env(safe-area-inset-bottom))] md:pt-3.5 lg:px-5",
        lightOnBackdrop ? "text-[#fef7ee]" : "text-[#0d0d0d]",
      )}
    >
      <div className="grid grid-cols-2 gap-y-2 text-[8px] uppercase leading-[1.6] tracking-[0.06em] md:grid-cols-3 md:text-[10px]">
        <div>
          <p>Based in UK</p>
        </div>
        <div className="md:text-center">
          <a
            href="mailto:hello@pendolo.studio"
            className="block text-inherit transition-opacity hover:opacity-80"
          >
            hello@pendolo.studio
          </a>
        </div>
        <div className="col-span-2 text-right md:col-span-1">
          © {new Date().getFullYear()} Pendolo
        </div>
      </div>
    </footer>
  );
};

export default Footer;
