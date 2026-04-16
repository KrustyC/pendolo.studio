import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-dark">
      {/* Pre-footer CTA */}
      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10">
        <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
          Have a project in mind?
        </h3>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase border border-white/30 px-6 py-3 text-white/80 hover:text-white hover:border-white/60 transition-all duration-300 self-start md:self-auto"
        >
          Partner with us
          <span className="text-sm">↗</span>
        </Link>
      </div>

      {/* Main footer */}
      <div className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            <div>
              <p className="text-lg font-light tracking-tight mb-4 text-white">Pendolo</p>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                Based between the UK and Italy.
                <br />
                Operating internationally.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6">Sitemap</p>
              <div className="space-y-3">
                {["Home", "About", "Services", "Work", "Process"].map((page) => (
                  <Link
                    key={page}
                    to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    className="block text-sm text-white/60 hover:text-white transition-opacity"
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6">Services</p>
              <div className="space-y-3">
                {["Brand Design", "Web Design", "Web Development"].map((service) => (
                  <Link
                    key={service}
                    to="/services"
                    className="block text-sm text-white/60 hover:text-white transition-opacity"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6">Get in touch</p>
              <a
                href="mailto:hello@pendolo.studio"
                className="block text-sm text-white/60 hover:text-white transition-opacity mb-3"
              >
                hello@pendolo.studio
              </a>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Pendolo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
