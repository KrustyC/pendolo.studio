import { Link } from "react-router-dom";
import CallToAction from "@/components/home/CallToAction";
import ProcessPreview from "@/components/home/ProcessPreview";
import ServicesScrollProcess from "@/components/services/ServicesScrollProcess";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const serviceCategories = [
  {
    title: "Brand",
    intro: "Identity systems that communicate clearly and hold up over time. We start with strategy and build outward — from naming and positioning to the visual system that carries it all.",
    services: [
      { name: "Brand Strategy", desc: "Positioning, narrative, and foundations before visual expression." },
      { name: "Identity Design", desc: "Logos, typography, colour systems, and visual language." },
      { name: "Identity Guidelines", desc: "Documentation that ensures consistency without policing." },
      { name: "Editorial design", desc: "Publications, reports, and long-form layouts where typography and grid carry the story." },
      { name: "Marketing Materials", desc: "Print and digital collateral aligned to the brand system." },
      { name: "Packaging", desc: "Structural design, dielines, and rollout for product and retail touchpoints." },
    ],
  },
  {
    title: "Web Design",
    intro: "Research-driven web design that balances usability with visual quality. We design interfaces that respect users' time and present content with clarity.",
    services: [
      { name: "UX research", desc: "Interviews, usability insight, and evidence before layout decisions." },
      { name: "Site map", desc: "Top-level structure for navigation, content groupings, and priority." },
      { name: "Website architecture", desc: "Templates, modules, and content relationships that scale." },
      { name: "UI Design", desc: "Interface layout, hierarchy, and states grounded in the UX story." },
      { name: "UI Kits", desc: "Component libraries for consistency and a clean handoff to build." },
      { name: "Design Systems", desc: "Tokens, patterns, and governance so product and dev stay aligned." },
      { name: "Figma prototypes", desc: "Clickable flows for testing ideas and locking interactions before build." },
    ],
  },
  {
    title: "Web Development",
    intro: "Clean code, fast sites, reliable deployment. We build with performance as a baseline, not an afterthought. Every site ships with monitoring and is optimized for real-world conditions.",
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

type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  included: { label: string; sub?: string }[];
  addOns?: string[];
  accent?: boolean;
  /** Shown above the tier name (e.g. “Most chosen”) */
  badge?: string;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Essentials",
    tagline:
      "One focused discipline. Good when you know exactly what you need — identity, interface, or implementation — and want to move without padding.",
    price: "From €9,500",
    included: [
      { label: "Single-discipline engagement", sub: "Choose brand, product design, or engineering for the core scope." },
      { label: "Discovery + strategy session", sub: "Align on goals, audience, constraints, and technical reality." },
      { label: "Up to 3 revision rounds" },
      { label: "Figma or repo handoff", sub: "Design system files, or documented code your team can own." },
      { label: "2-week post-launch support" },
    ],
  },
  {
    name: "Professional",
    tagline:
      "Two or three disciplines together — brand, design, and build speaking one language. For scale-ups shipping a coherent product, not a patchwork.",
    price: "From €21,000",
    included: [
      { label: "Multi-discipline engagement", sub: "e.g. identity + site, or UI system + production build." },
      { label: "Full discovery & strategy phase" },
      { label: "Dedicated Slack channel" },
      { label: "Unlimited revision rounds", sub: "Within the agreed timeline and scope boundaries." },
      { label: "Documentation + training", sub: "Brand guidelines, component specs, or runbooks — whatever the handoff needs." },
      { label: "4-week post-launch support" },
    ],
    addOns: [
      "Brand identity system — from €7,000",
      "Marketing website (design + build, up to ~8 pages) — from €12,000",
      "Product UI & design system — from €9,500",
      "MVP web app (scoped, shipped) — from €18,000",
      "Positioning & strategy workshops — from €5,300",
      "Investor / narrative deck — from €4,100",
    ],
    accent: true,
  },
  {
    name: "Full studio",
    tagline:
      "We embed as your studio: strategy through shipped product — brand, UX/UI, and engineering on one roadmap, with retainer optional after launch.",
    price: "From €41,000",
    included: [
      { label: "Brand, design & development", sub: "All three disciplines sequenced with shared milestones." },
      { label: "Embedded working model", sub: "Weekly rituals, backlog, and demos — not throw-it-over-the-wall." },
      { label: "Weekly strategy & architecture touchpoints" },
      { label: "Priority resourcing" },
      { label: "Full docs, QA, training & handoff" },
      { label: "Retainer option at project close" },
    ],
  },
];

/** Brand surfaces for the three discipline cards (Services hero grid) */
const SERVICE_CARD_THEMES = [
  { bg: "#575ecf", intro: "text-white/75", serviceDesc: "text-white/70" },
  { bg: "#43ccbc", intro: "text-neutral-950/75", serviceDesc: "text-neutral-950/70" },
  { bg: "#fe7b02", intro: "text-neutral-950/75", serviceDesc: "text-neutral-950/70" },
] as const;

const faqs = [
  {
    question: "How do we get started?",
    answer:
      "Pick a package — and we'll send you a quick form to fill out. It helps us build a clear brief. Then we hop on a call to talk through the details and get started.",
  },
  {
    question: "I'm not sure what I need. Can we chat first?",
    answer:
      "Absolutely. Book an intro call and we'll help you figure out the right scope. No pressure, no hard sell — just a clear conversation about what would actually serve your project.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "50% upfront to kick things off and 50% on delivery. For larger engagements we split payments across milestones. Invoices go out through Stripe and we accept card or bank transfer.",
  },
  {
    question: "What about revisions?",
    answer:
      "Essentials includes up to three structured revision rounds. Professional includes unlimited rounds within the agreed timeline and scope. Full studio follows the same principle with longer runway. Beyond that we bill hourly or scope a change request.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Yes. Tiers stack — if you start with Essentials and move to Professional or Full studio, we credit work already delivered and continue from there.",
  },
];

const Services = () => {
  return (
    <main className="pb-32">
      <div className="pt-32 md:pt-44">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mb-28 animate-fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-10">
              We design and build for small businesses and startups
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Three disciplines, one coherent process. Every project benefits from design thinking and engineering rigour working together from day one.
            </p>
          </div>

          <section className="pt-16">
            <div className="mb-10 md:mb-12">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground mb-3">
                Services
              </p>
              <h2 className="text-2xl md:text-4xl font-light tracking-tight">
                Services we offer
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {serviceCategories.map((category, index) => {
                const theme = SERVICE_CARD_THEMES[index];
                return (
                  <div
                    key={category.title}
                    className={cn(
                      "flex min-h-0 flex-col p-6 md:p-7 lg:p-8",
                      index === 0 ? "text-white" : "text-neutral-950",
                    )}
                    style={{ backgroundColor: theme.bg }}
                  >
                    <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-5">
                      {category.title}
                    </h2>
                    <p className={cn("text-sm leading-[1.8] mb-8", theme.intro)}>
                      {category.intro}
                    </p>
                    <div className="mt-auto space-y-3">
                      {category.services.map((service) => (
                        <div key={service.name}>
                          <h3 className="text-sm font-normal mb-1 tracking-tight">{service.name}</h3>
                          <p className={cn("text-sm", theme.serviceDesc)}>{service.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <ProcessPreview />

      <ServicesScrollProcess />

      <section className="section-dark">
        <div className="container mx-auto px-6 lg:px-12 py-32 md:py-44">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.35em] text-white mb-4">
            Packages
          </p>
          <div className="flex justify-center mb-6 md:mb-8">
            <span className="font-editorial italic text-2xl md:text-3xl tracking-[0.35em] uppercase text-white">
              Pricing
            </span>
          </div>
          <p className="text-center text-sm md:text-base text-white max-w-2xl mx-auto mb-14 md:mb-16 leading-relaxed">
            Engagements that pair brand with build — scoped so design decisions and technical constraints are handled together, not in silos.
          </p>

          <div className="grid gap-5 md:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>

          <div className="mt-5">
            <div className="bg-white/[0.03] p-7 md:p-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 mb-3">
                Bespoke
              </p>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
                Need something tailored?
              </h3>
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-white/90">
                If your needs do not fit neatly into a package, we can shape a bespoke engagement around your goals, organisation type, and the level of support hours you need each month.
              </p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
                This works well for in-house teams needing senior design or development support, charities and public-sector organisations with specific delivery constraints, and founders who need flexible capacity as priorities shift.
              </p>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="cta-marketing"
                >
                  Discuss Bespoke Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="flex justify-center mb-16 md:mb-20">
            <span className="font-editorial italic text-2xl md:text-3xl tracking-[0.35em] uppercase text-white">
              FAQ
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-base md:text-lg font-normal tracking-tight mb-4 text-white">
              {faqs[0].question}
            </h3>
            <p className="text-sm md:text-base leading-[1.8] text-white">
              {faqs[0].answer}
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-10">
            {faqs.slice(1).map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="border-b border-white/15"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-normal tracking-tight text-white hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base leading-[1.8] text-white pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CallToAction />

    </main>
  );
};

const PricingCard = ({ tier }: { tier: PricingTier }) => {
  const isAccent = tier.accent;

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex flex-col h-full p-7 md:p-8 transition-colors",
          isAccent
            ? "bg-[#F7B3CD] text-neutral-950"
            : "bg-white text-neutral-950",
        )}
      >
        <div className="mb-6">
          {tier.badge ? (
            <span className="mb-4 inline-block border border-neutral-950/15 bg-neutral-950/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-950">
              {tier.badge}
            </span>
          ) : null}
          <h3 className="text-xl md:text-2xl font-normal tracking-tight mb-3">
            {tier.name}
          </h3>
          <p
            className={cn(
              "text-[11px] italic tracking-wide",
              "text-neutral-950",
            )}
          >
            {tier.tagline}
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          {tier.included.map((item) => (
            <li key={item.label}>
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                    isAccent ? "bg-neutral-950" : "bg-[#F7B3CD]",
                  )}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{item.label}</p>
                  {item.sub ? (
                    <p
                      className={cn(
                        "text-[11px] leading-snug mt-1",
                        "text-neutral-950",
                      )}
                    >
                      {item.sub}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <p className="text-3xl md:text-4xl font-light tracking-tight">{tier.price}</p>
        </div>
      </div>

      {tier.addOns && tier.addOns.length > 0 ? (
        <div className="mt-4 px-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white mb-3">
            Also available by deliverable:
          </p>
          <ul className="space-y-1.5">
            {tier.addOns.map((addOn) => (
              <li key={addOn} className="text-xs text-white">
                + {addOn}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Services;
