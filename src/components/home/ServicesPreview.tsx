import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Brand",
    description:
      "Identity systems that hold up across every touchpoint. From strategy to guidelines, built for consistency and longevity.",
    items: ["Brand Identity", "Brand Architecture", "Identity Guidelines", "Marketing Materials"],
  },
  {
    title: "Web Design",
    description:
      "Research-driven design that balances form and function. Clear information architecture, strong visual systems, considered user experience.",
    items: ["Competitor Research", "Content Architecture", "UX/UI Design", "UI Kit"],
  },
  {
    title: "Web Development",
    description:
      "Clean, performant code with deployment discipline. From implementation through monitoring, built for speed and reliability.",
    items: ["Website Implementation", "E-commerce", "Performance Testing", "Monitoring"],
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Services</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            What we do
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {services.map((service) => (
            <div key={service.title} className="group">
              <h3 className="font-display text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 mb-8">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide group"
          >
            View all services
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
