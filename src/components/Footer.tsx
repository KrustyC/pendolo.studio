import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-dark">
      <div className="container mx-auto px-6 lg:px-12 pt-24 md:pt-32 pb-10">
        {/* Massive wordmark */}
        <h2
          aria-label="Pendolo"
          className="font-light tracking-[-0.04em] leading-[0.85] text-white text-[28vw] md:text-[24vw] lg:text-[22vw]"
        >
          Pendolo
        </h2>

        {/* Bottom info row */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-sm text-white/70">
          <div className="space-y-1">
            <p>Based UK · Italy</p>
            <p className="text-white/50">Operating internationally</p>
          </div>

          <div className="space-y-1">
            <a
              href="mailto:hello@pendolo.studio"
              className="block hover:text-white transition-colors"
            >
              hello@pendolo.studio
            </a>
            <p className="text-white/50">(+44) 20 4538 1100</p>
          </div>

          <div className="space-y-1">
            {["About", "Services", "Work", "Process"].map((page) => (
              <Link
                key={page}
                to={`/${page.toLowerCase()}`}
                className="block hover:text-white transition-colors"
              >
                {page}
              </Link>
            ))}
          </div>

          <div className="space-y-1 md:text-right">
            <Link to="/contact" className="block hover:text-white transition-colors">
              Contact
            </Link>
            <p className="text-white/50">
              © {new Date().getFullYear()} Pendolo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
