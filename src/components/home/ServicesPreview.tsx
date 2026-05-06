import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    title: "Brand",
    description:
      "Identity systems that hold up across every touchpoint. From strategy to guidelines, built for consistency and longevity.",
    items: [
      "Brand Strategy",
      "Identity design",
      "Identity guidelines",
      "Editorial design",
      "Marketing materials",
      "Packaging",
    ],
    bg: "#9484D2",
    fg: "#0D0D0D",
  },
  {
    title: "Web Design",
    description:
      "Research-driven design that balances form and function. Clear information architecture, strong visual systems, considered user experience.",
    items: [
      "UX research",
      "Site map",
      "Website architecture",
      "UI Design",
      "UI Kits",
      "Design systems",
      "Figma prototypes",
    ],
    bg: "#43CCBC",
    fg: "#0D0D0D",
  },
  {
    title: "Web Development",
    description:
      "Clean, performant code with deployment discipline. From implementation through monitoring, built for speed and reliability.",
    items: ["Website Implementation", "E-commerce", "Performance Testing", "Monitoring"],
    bg: "#FE7B02",
    fg: "#0D0D0D",
  },
] as const;

/** High-contrast chip fills (cycle) */
const CHIP_STYLES: { bg: string; fg: string }[] = [
  { bg: "#fef7ee", fg: "#0D0D0D" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#F25C3D", fg: "#fef7ee" },
  { bg: "#BFE0DE", fg: "#0D0D0D" },
  { bg: "#F2C744", fg: "#0D0D0D" },
  { bg: "#E8B6F0", fg: "#0D0D0D" },
  { bg: "#1F8F6A", fg: "#fef7ee" },
  { bg: "#ffffff", fg: "#0D0D0D" },
];

/** Deterministic pile positions (%, %) + final rotation — chips overlap like a heap */
const HEAP_LAYOUT: { left: string; top: string; rotate: number }[] = [
  { left: "2%", top: "6%", rotate: -9 },
  { left: "22%", top: "0%", rotate: 7 },
  { left: "48%", top: "10%", rotate: -5 },
  { left: "0%", top: "28%", rotate: 8 },
  { left: "32%", top: "32%", rotate: -6 },
  { left: "58%", top: "4%", rotate: 4 },
  { left: "14%", top: "48%", rotate: -8 },
  { left: "44%", top: "52%", rotate: 10 },
  { left: "28%", top: "64%", rotate: -4 },
  { left: "6%", top: "58%", rotate: 5 },
];

function FallingSkillChips({ items }: { items: readonly string[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ul
      className="relative mx-auto w-full max-w-lg min-h-[min(52vh,380px)] md:min-h-[min(50vh,420px)]"
      aria-label="Skills"
    >
      {items.map((item, idx) => {
        const { bg, fg } = CHIP_STYLES[idx % CHIP_STYLES.length];
        const pos = HEAP_LAYOUT[idx % HEAP_LAYOUT.length];

        return (
          <motion.li
            key={item}
            className="absolute max-w-[min(92%,240px)] rounded-full px-4 py-2.5 text-center text-[11px] font-semibold uppercase leading-snug md:max-w-[min(92%,280px)] md:px-5 md:py-3 md:text-xs"
            style={{
              left: pos.left,
              top: pos.top,
              zIndex: idx + 1,
              backgroundColor: bg,
              color: fg,
            }}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    y: -220,
                    x: pos.rotate * 1.5,
                    opacity: 0,
                    rotate: pos.rotate - 18,
                    scale: 0.9,
                  }
            }
            whileInView={
              reduceMotion
                ? { opacity: 1, transition: { duration: 0.2, delay: idx * 0.04 } }
                : {
                    y: 0,
                    x: 0,
                    opacity: 1,
                    rotate: pos.rotate,
                    scale: 1,
                    transition: {
                      delay: idx * 0.07,
                      type: "spring",
                      stiffness: 360,
                      damping: 20,
                      mass: 0.82,
                    },
                  }
            }
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
          >
            {item}
          </motion.li>
        );
      })}
    </ul>
  );
}

const ServicesPreview = () => {
  const lastIndex = services.length - 1;

  return (
    <section className="relative">
      {/* Stacking sticky blocks — “What we do” title is on the mockup above (fade-in). */}
      <div className="relative">
        {services.map((service, i) => (
          <div
            key={service.title}
            className="sticky top-0 flex h-screen w-full items-start pt-24 md:pt-32 lg:pt-36"
            style={{
              backgroundColor: service.bg,
              color: service.fg,
              zIndex: i + 1,
            }}
          >
            <div className="container mx-auto w-full px-6 lg:px-12">
              <div className="grid md:grid-cols-12 items-start gap-10 md:gap-16">
                <div className="md:col-span-5">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
                    {service.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed md:mt-7 md:text-lg">
                    {service.description}
                  </p>
                </div>
                <div className="md:col-span-6 md:col-start-7 min-h-0 overflow-visible">
                  <FallingSkillChips items={service.items} />
                </div>
              </div>
            </div>

            {i === lastIndex ? (
              <div className="pointer-events-none absolute bottom-6 right-6 z-20 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12">
                <Link to="/services" className="cta-marketing pointer-events-auto">
                  View all services
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPreview;
