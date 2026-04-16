import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Brand",
    description:
      "Identity systems that hold up across every touchpoint. From strategy to guidelines, built for consistency and longevity.",
    items: ["Brand Identity", "Brand Architecture", "Identity Guidelines", "Marketing Materials"],
  },
  {
    number: "02",
    title: "Web Design",
    description:
      "Research-driven design that balances form and function. Clear information architecture, strong visual systems, considered user experience.",
    items: ["Competitor Research", "Content Architecture", "UX/UI Design", "UI Kit"],
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Clean, performant code with deployment discipline. From implementation through monitoring, built for speed and reliability.",
    items: ["Website Implementation", "E-commerce", "Performance Testing", "Monitoring"],
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-32 md:py-44 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
            SERVICES
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
            What we do
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-16">
          {services.map((service) => (
            <div key={service.title} className="group">
              <span className="text-xs text-muted-foreground tracking-[0.2em] block mb-4">
                {service.number}
              </span>
              <h3 className="text-lg font-normal mb-4 tracking-tight">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/services"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
