import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-dark">
      <div className="mx-auto w-full px-2 md:px-3 lg:px-4 pt-20 md:pt-24 pb-6">
        {/* Massive wordmark */}
        <h2
          aria-label="Pendolo"
          className="font-light leading-[0.85] text-white text-[28vw] md:text-[24vw] lg:text-[22vw]"
        >
          Pendolo
        </h2>

        {/* Bottom info row */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] font-medium uppercase text-white">
          <div className="space-y-1">
            <p>Based UK · Italy</p>
            <p className="text-white">Operating internationally</p>
          </div>

          <div className="space-y-1 md:text-center">
            <a
              href="mailto:hello@pendolo.studio"
              className="block hover:text-white transition-colors"
            >
              hello@pendolo.studio
            </a>
            <p className="text-white">(+44) 20 4538 1100</p>
          </div>

          <div className="space-y-1 md:text-right">
            <div className="flex flex-wrap md:justify-end items-center gap-3">
              {[
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Work", to: "/work" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="text-white">
              © {new Date().getFullYear()} Pendolo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
