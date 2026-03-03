import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    title: "Brand",
    intro: "Identity systems that communicate clearly and hold up over time. We start with strategy and build outward — from naming and positioning to the visual system that carries it all.",
    approach: "Every brand decision is grounded in research. We don't decorate — we build systems that scale across touchpoints and cultures.",
    services: [
      { name: "Brand Identity", desc: "Core identity development from strategy through visual expression." },
      { name: "Brand Architecture", desc: "Structuring brand relationships for clarity and growth." },
      { name: "Identity Design", desc: "Logos, typography, colour systems, and visual language." },
      { name: "Identity Guidelines", desc: "Documentation that ensures consistency without policing." },
      { name: "Marketing Materials", desc: "Print and digital collateral aligned to the brand system." },
    ],
  },
  {
    title: "Web Design",
    intro: "Research-driven web design that balances usability with visual quality. We design interfaces that respect users' time and present content with clarity.",
    approach: "Design starts with content architecture, not decoration. We map the user journey, then build visual systems that support it.",
    services: [
      { name: "Competitor Research", desc: "Understanding the landscape before making design decisions." },
      { name: "Content Architecture", desc: "Structuring information for clarity and discoverability." },
      { name: "Visual Concept", desc: "Defining the visual direction and design language." },
      { name: "UX/UI Design", desc: "Interface design grounded in user needs and business goals." },
      { name: "UI Kit", desc: "Component libraries for consistency and development efficiency." },
      { name: "Adaptations", desc: "Responsive and multi-platform design adaptations." },
      { name: "Website Maintenance", desc: "Ongoing design support and iterative improvement." },
    ],
  },
  {
    title: "Web Development",
    intro: "Clean code, fast sites, reliable deployment. We build with performance as a baseline, not an afterthought. Every site ships with monitoring and is optimized for real-world conditions.",
    approach: "We write maintainable code with clean architecture. Observability, performance testing, and deployment discipline are standard — not optional extras.",
    services: [
      { name: "Website Implementation", desc: "Frontend and backend development with modern frameworks." },
      { name: "E-commerce Development", desc: "Online stores built for performance and conversion." },
      { name: "AI Agent Implementation", desc: "Chatbots and automation integrated thoughtfully." },
      { name: "Blog Implementation", desc: "CMS-powered editorial platforms." },
      { name: "Deployment", desc: "Hosting, CI/CD pipelines, and infrastructure management." },
      { name: "Monitoring", desc: "Observability tools for uptime, performance, and error tracking." },
      { name: "Performance Testing", desc: "Load testing, Core Web Vitals optimization, speed audits." },
      { name: "Tracking & Analytics", desc: "Privacy-conscious analytics and conversion tracking." },
    ],
  },
];

const Services = () => {
  return (
    <main className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20 animate-fade-up">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Services</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
            Design-led.
            <br />
            <span className="font-editorial italic font-normal">Technically solid.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Three disciplines, one coherent process. Every project benefits from design thinking and engineering rigour working together from day one.
          </p>
        </div>

        <div className="space-y-24">
          {serviceCategories.map((category) => (
            <section key={category.title} className="border-t border-border pt-12">
              <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-5">
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {category.intro}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    {category.approach}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <div className="space-y-6">
                    {category.services.map((service) => (
                      <div key={service.name} className="border-b border-border pb-4">
                        <h3 className="font-display text-sm font-semibold mb-1">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-border pt-16 mt-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Ready to start?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Tell us about your project. We'll review it and respond within two working days.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide rounded-sm group transition-colors hover:bg-foreground/90"
          >
            Start a project
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Services;
