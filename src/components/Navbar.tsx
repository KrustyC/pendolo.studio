import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
];

const languages = ["EN", "IT", "ES"] as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const linkBase =
    "text-[10px] uppercase font-medium text-[#0D0D0D] transition-colors duration-200 hover:text-[#0D0D0D]";
  const linkActive = "text-[#0D0D0D]";

  return (
    <nav className="fixed left-0 right-0 top-3 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div
          className={cn(
            "h-12 md:h-[3.15rem] rounded-full bg-[#F8F8F6]/95 backdrop-blur-md",
            "flex items-center justify-between px-5 md:px-7",
            scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : "shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
          )}
        >
          <Link
            to="/"
            className="text-[9px] md:text-[10px] font-medium uppercase text-[#0D0D0D]"
          >
            Studio Pendolo
          </Link>

          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(linkBase, location.pathname === link.path && linkActive)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className={cn(linkBase, location.pathname === "/contact" && linkActive)}>
              Contact
            </Link>
          </div>

          <button
            className="md:hidden p-1 text-[#0D0D0D]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div
            className="hidden md:flex items-center text-[10px] uppercase font-medium text-[#0D0D0D]"
            aria-label="Language"
          >
            {languages.join("-")}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden mx-4 mt-2 rounded-3xl bg-[#F8F8F6]/95 px-6 py-6 space-y-5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-[10px] uppercase font-medium text-[#0D0D0D]",
                location.pathname === link.path && linkActive,
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={cn(
              "block text-[10px] uppercase font-medium text-[#0D0D0D]",
              location.pathname === "/contact" && linkActive,
            )}
          >
            Contact
          </Link>
          <div className="pt-2 text-[10px] uppercase font-medium text-[#0D0D0D]">
            {languages.map((code, i) => (
              <span key={code} className="flex items-center gap-3">
                {i > 0 ? <span className="text-[10px] opacity-40">·</span> : null}
                <span className="text-[10px] uppercase font-medium text-[#0D0D0D]">
                  {code}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
