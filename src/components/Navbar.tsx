import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Process", path: "/process" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-lg font-light tracking-tight text-foreground">
            Pendolo
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs tracking-[0.15em] uppercase transition-opacity duration-300 ${
                  location.pathname === link.path
                    ? "text-foreground opacity-100"
                    : "text-muted-foreground opacity-70 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="text-xs tracking-[0.15em] uppercase border border-foreground/30 px-5 py-2 text-foreground/80 hover:text-foreground hover:border-foreground/60 transition-all duration-300"
            >
              Contact
            </Link>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-10 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-opacity"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-sm tracking-[0.15em] uppercase text-foreground"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
