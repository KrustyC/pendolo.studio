"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Service = {
  title: string;
  description: string;
  items: readonly string[];
};

const services: readonly Service[] = [
  {
    title: "Branding",
    description:
      "Identity systems that communicate clearly and hold up over time. We start with strategy and build outward — from naming and positioning to the visual system that carries it all.",
    items: [
      "Brand Strategy",
      "Identity Design",
      "Identity Guidelines",
      "Editorial Design",
      "Marketing Materials",
      "Packaging",
    ],
  },
  {
    title: "Product Design",
    description:
      "Research-driven design that balances form and function. Clear information architecture, strong visual systems, considered user experience.",
    items: [
      "UX Research",
      "Site Map",
      "Website Architecture",
      "UI Design",
      "UI Kits",
      "Design Systems",
      "Figma Prototypes",
    ],
  },
  {
    title: "Web Design",
    description:
      "Clean, performant code with deployment discipline. From implementation through monitoring, built for speed and reliability.",
    items: [
      "Website Implementation",
      "E-commerce",
      "AI Agent Implementation",
      "Blog Implementation",
      "Deployment",
      "Monitoring",
      "Performance Testing",
      "Tracking & Analytics",
    ],
  },
] as const;

const ACTIVE = "#F25C3D";
const INACTIVE = "#0D0D0D";

const CHIP_STYLES: { bg: string; fg: string }[] = [
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
  { bg: "#0D0D0D", fg: "#fef7ee" },
];

const HEAP_LAYOUT: { left: string; top: string; rotate: number }[] = [
  { left: "4%", top: "6%", rotate: -6 },
  { left: "44%", top: "0%", rotate: 4 },
  { left: "60%", top: "18%", rotate: -3 },
  { left: "0%", top: "36%", rotate: 5 },
  { left: "30%", top: "32%", rotate: -5 },
  { left: "56%", top: "52%", rotate: 4 },
  { left: "8%", top: "62%", rotate: -6 },
  { left: "38%", top: "70%", rotate: 3 },
];

const CHIP_STAGGER = 0.05;

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function StaticChipCluster({ items }: { items: readonly string[] }) {
  return (
    <ul className="relative h-full w-full" aria-label="Skills">
      {items.map((item, idx) => {
        const { bg, fg } = CHIP_STYLES[idx % CHIP_STYLES.length];
        const pos = HEAP_LAYOUT[idx % HEAP_LAYOUT.length];
        return (
          <li
            key={item}
            className="absolute max-w-[min(80%,200px)] rounded-full px-3.5 py-1.5 text-center text-[10px] font-semibold uppercase leading-snug tracking-wide md:px-4 md:py-2 md:text-[11px]"
            style={{
              left: pos.left,
              top: pos.top,
              transform: `rotate(${pos.rotate}deg)`,
              backgroundColor: bg,
              color: fg,
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

type SkillChipProps = {
  label: string;
  idx: number;
  reveal: MotionValue<number>;
};

function SkillChip({ label, idx, reveal }: SkillChipProps) {
  const { bg, fg } = CHIP_STYLES[idx % CHIP_STYLES.length];
  const pos = HEAP_LAYOUT[idx % HEAP_LAYOUT.length];

  const chipProgress = useTransform(reveal, (v) => {
    const start = idx * CHIP_STAGGER;
    const span = 1 - start;
    if (span <= 0) return v >= 1 ? 1 : 0;
    return smoothstep(Math.max(0, Math.min(1, (v - start) / span)));
  });

  const y = useTransform(chipProgress, [0, 1], [-120, 0]);
  const x = useTransform(chipProgress, [0, 1], [pos.rotate * 2, 0]);
  const opacity = useTransform(chipProgress, [0, 0.25, 1], [0, 1, 1]);
  const rotate = useTransform(
    chipProgress,
    [0, 1],
    [pos.rotate - 14, pos.rotate]
  );
  const scale = useTransform(chipProgress, [0, 1], [0.88, 1]);

  return (
    <motion.li
      className="absolute max-w-[min(80%,200px)] rounded-full px-3.5 py-1.5 text-center text-[10px] font-semibold uppercase leading-snug tracking-wide md:px-4 md:py-2 md:text-[11px]"
      style={{
        left: pos.left,
        top: pos.top,
        zIndex: idx + 1,
        y,
        x,
        opacity,
        rotate,
        scale,
        backgroundColor: bg,
        color: fg,
      }}
    >
      {label}
    </motion.li>
  );
}

function AnimatedChipCluster({
  items,
  reveal,
}: {
  items: readonly string[];
  reveal: MotionValue<number>;
}) {
  return (
    <ul className="relative h-full w-full" aria-label="Skills">
      {items.map((item, idx) => (
        <SkillChip key={item} label={item} idx={idx} reveal={reveal} />
      ))}
    </ul>
  );
}

type DisciplineRowProps = {
  service: Service;
  reveal: MotionValue<number>;
};

function DisciplineRow({ service, reveal }: DisciplineRowProps) {
  const titleColor = useTransform(
    reveal,
    [0, 0.35, 1],
    [INACTIVE, ACTIVE, ACTIVE]
  );
  const contentHeight = useTransform(reveal, [0, 1], ["0vh", "38vh"]);
  const contentOpacity = useTransform(reveal, [0, 0.3, 1], [0, 0, 1]);
  const contentY = useTransform(reveal, [0, 1], [12, 0]);

  return (
    <div className="w-full">
      <motion.h2
        style={{ color: titleColor }}
        className="m-0 font-sans text-[clamp(2.25rem,7vw,6.5rem)] font-black uppercase leading-[0.96] tracking-tight"
      >
        {service.title}
      </motion.h2>
      <motion.div
        className="overflow-hidden"
        style={{ height: contentHeight }}
        aria-hidden="true"
      >
        <motion.div
          className="grid grid-cols-1 gap-6 pt-5 md:grid-cols-12 md:gap-10 md:pt-6"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="md:col-span-6">
            <p className="max-w-md text-sm leading-relaxed md:text-base">
              {service.description}
            </p>
          </div>
          <div className="relative h-[28vh] md:col-span-6 md:h-[30vh]">
            <AnimatedChipCluster items={service.items} reveal={reveal} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const ServicesStackStatic = () => (
  <section className="bg-white text-black">
    <div className="container mx-auto px-6 py-20 md:px-10 md:py-24 lg:px-14">
      <p className="font-typewriter text-xs font-medium uppercase tracking-[0.12em]">
        What we do
      </p>
      <div className="mt-10 space-y-12">
        {services.map((service) => (
          <div key={service.title}>
            <h2 className="m-0 font-sans text-[clamp(2.25rem,7vw,6.5rem)] font-black uppercase leading-[0.96] tracking-tight text-[#0D0D0D]">
              {service.title}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-12">
              <p className="md:col-span-6 max-w-md text-sm leading-relaxed md:text-base">
                {service.description}
              </p>
              <div className="relative h-[34vh] md:col-span-6">
                <StaticChipCluster items={service.items} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SCROLL_SPRING = {
  stiffness: 80,
  damping: 26,
  mass: 0.42,
  restDelta: 0.0008,
};

const ServicesStackInteractive = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  const reveal0 = useTransform(smoothProgress, (p) => {
    if (p < 0.02) return 0;
    if (p < 0.2) return smoothstep((p - 0.02) / 0.18);
    if (p < 0.32) return 1;
    if (p < 0.44) return 1 - smoothstep((p - 0.32) / 0.12);
    return 0;
  });
  const reveal1 = useTransform(smoothProgress, (p) => {
    if (p < 0.32) return 0;
    if (p < 0.5) return smoothstep((p - 0.32) / 0.18);
    if (p < 0.62) return 1;
    if (p < 0.74) return 1 - smoothstep((p - 0.62) / 0.12);
    return 0;
  });
  const reveal2 = useTransform(smoothProgress, (p) => {
    if (p < 0.62) return 0;
    if (p < 0.82) return smoothstep((p - 0.62) / 0.2);
    return 1;
  });

  const reveals = [reveal0, reveal1, reveal2];

  return (
    <section
      ref={containerRef}
      className="relative bg-white text-black"
      style={{ height: "420vh" }}
    >
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        <div className="container mx-auto w-full px-6 md:px-10 lg:px-14">
          <p className="font-typewriter text-xs font-medium uppercase tracking-[0.12em] text-[#0D0D0D]">
            What we do
          </p>
          <div className="mt-6 md:mt-8">
            {services.map((service, i) => (
              <DisciplineRow
                key={service.title}
                service={service}
                reveal={reveals[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ServicesStack = () => {
  const reduceMotion = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsNarrow(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduceMotion || isNarrow ? (
    <ServicesStackStatic />
  ) : (
    <ServicesStackInteractive />
  );
};
