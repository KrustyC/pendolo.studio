"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navOnDarkBg = pathname === "/contact" || pathname === "/services";

  return (
    <nav data-navbar className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4 lg:px-5">
      <div className={cn("flex justify-between", isHome ? "items-start" : "items-center")}>
        <Link href="/" aria-label="Pendolo home">
          <img
            src="/black_logo.svg"
            alt="Pendolo"
            className={cn(
              "h-auto shrink-0",
              isHome
                ? "w-[9.5rem] md:w-[17rem] lg:w-[22rem]"
                : "w-[4.75rem] sm:w-[5.5rem] md:w-[8.25rem] lg:w-[9.5rem]",
              navOnDarkBg && "brightness-0 invert",
            )}
          />
        </Link>
        <div
          className={cn(
            "flex items-center gap-5 text-[8px] uppercase tracking-[0.08em] md:text-[10px]",
            navOnDarkBg ? "text-white" : "text-[#0d0d0d]",
            isHome && "mt-0.5 shrink-0",
          )}
        >
          <Link href="/services" className="transition-opacity hover:opacity-70">
            Services
          </Link>
          <Link href="/contact" className="transition-opacity hover:opacity-70">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
