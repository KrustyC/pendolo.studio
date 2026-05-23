"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { classNames } from "@/lib/utils/classNames";

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navOnDarkBg = pathname === "/contact" || pathname === "/services";

  return (
    <nav
      data-navbar
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4 lg:px-5"
    >
      <div
        className={classNames("flex justify-between", {
          "items-start": isHome,
          "items-center": !isHome,
        })}
      >
        <Link href="/" aria-label="Pendolo home">
          <img
            src="/black_logo.svg"
            alt="Pendolo"
            width={307}
            height={90}
            className={classNames(
              "h-auto shrink-0",
              {
                "w-38 sm:w-44 md:w-56 lg:w-64": isHome,
                "w-19 sm:w-22 md:w-32 lg:w-38": !isHome,
              },
              navOnDarkBg && "brightness-0 invert"
            )}
          />
        </Link>
        <div
          className={classNames(
            "flex items-center gap-5 text-[8px] uppercase tracking-[0.08em] md:text-[10px]",
            {
              "text-white": navOnDarkBg,
              "text-[#0d0d0d]": !navOnDarkBg,
            },
            isHome && "mt-0.5 shrink-0"
          )}
        >
          <Link
            href="/services"
            className="transition-opacity hover:opacity-70"
          >
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
