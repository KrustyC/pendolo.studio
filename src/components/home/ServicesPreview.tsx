import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Brand",
    description:
      "Identity systems that hold up across every touchpoint. From strategy to guidelines, built for consistency and longevity.",
    items: ["Brand Identity", "Brand Architecture", "Identity Guidelines", "Marketing Materials"],
    bg: "#9484D2",
    fg: "#0D0D0D",
  },
  {
    number: "02",
    title: "Web Design",
    description:
      "Research-driven design that balances form and function. Clear information architecture, strong visual systems, considered user experience.",
    items: ["Competitor Research", "Content Architecture", "UX/UI Design", "UI Kit"],
    bg: "#43CCBC",
    fg: "#0D0D0D",
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Clean, performant code with deployment discipline. From implementation through monitoring, built for speed and reliability.",
    items: ["Website Implementation", "E-commerce", "Performance Testing", "Monitoring"],
    bg: "#0D0D0D",
    fg: "#FFFFFF",
  },
];

const ServicesPreview = () => {
  return (
    <section className="border-t border-border">
      {/* Intro */}
      <div className="container mx-auto px-6 lg:px-12 py-32 md:py-44">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
          SERVICES
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
          What we do
        </h2>
      </div>

      {/* Stacking sticky blocks */}
      <div className="relative">
        {services.map((service, i) => (
          <div
            key={service.title}
            className="sticky top-0 h-screen w-full flex items-center"
            style={{
              backgroundColor: service.bg,
              color: service.fg,
              zIndex: i + 1,
            }}
          >
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
                <div className="md:col-span-5">
                  <span
                    className="text-xs tracking-[0.3em] block mb-8 opacity-60"
                  >
                    {service.number} — SERVICE
                  </span>
                  <h3 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]">
                    {service.title}
                  </h3>
                </div>
                <div className="md:col-span-6 md:col-start-7 md:pt-6">
                  <p className="text-base md:text-lg leading-relaxed mb-12 opacity-90 max-w-xl">
                    {service.description}
                  </p>
                  <ul className="space-y-4 border-t border-current/20">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm tracking-wide border-b border-current/20 py-4 opacity-80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outro link */}
      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10 bg-background">
        <Link
          to="/services"
          className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity"
        >
          View all services
        </Link>
      </div>
    </section>
  );
};

export default ServicesPreview;
