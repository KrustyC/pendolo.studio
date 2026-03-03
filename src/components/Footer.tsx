import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <p className="font-display text-lg font-bold tracking-tight mb-3">Pendolo</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A design-first digital studio. Brand identity, web design, and development.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium tracking-wide uppercase mb-4">Pages</p>
            <div className="space-y-2">
              {["About", "Services", "Work", "Process", "Contact"].map((page) => (
                <Link
                  key={page}
                  to={`/${page.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium tracking-wide uppercase mb-4">Get in touch</p>
            <a
              href="mailto:hello@pendolo.studio"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              hello@pendolo.studio
            </a>
            <p className="text-sm text-muted-foreground mt-6">UK · Italy</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pendolo. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Design with structure. Build with discipline.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
