import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Statement({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`mx-auto max-w-[42rem] text-center font-sans font-light text-[clamp(1.5rem,3.2vw,3.25rem)] leading-[1.12] tracking-tight md:text-[clamp(1.75rem,3.5vw,3.75rem)] ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const firstOpacity = useTransform(scrollYProgress, [0, 0.18, 0.34], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.28, 0.44, 0.6], [0, 1, 1]);

  return (
    <main>
      {/* 1 — Cream hero with cross-fade copy */}
      <section
        ref={heroRef}
        className="relative flex min-h-[120vh] w-full items-center justify-center overflow-hidden bg-[#fef7ee] px-8 py-32 text-center text-neutral-950 md:px-16"
      >
        <div className="sticky top-0 flex min-h-screen w-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div style={{ opacity: firstOpacity }} className="flex items-center justify-center">
              <Statement>
                We are a designer and a developer who have been working together on side hustles for the last 5 years
              </Statement>
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: secondOpacity }} className="absolute inset-0 flex items-center justify-center">
            <Statement>Only in April 2026 did we decide to start a studio.</Statement>
          </motion.div>
        </div>
      </section>

      {/* 3 — Black */}
      <section className="flex min-h-[68vh] w-full items-center justify-center border-t border-[#292929] bg-black px-8 py-20 text-center md:px-16">
        <Statement className="text-white">
          I know right? Aren&apos;t we scared that AI will ruin our industry
        </Statement>
      </section>

      {/* 4 — Teal */}
      <section className="flex min-h-[64vh] w-full items-center justify-center border-t border-[#292929] bg-[#43ccbc] px-8 py-20 text-center text-neutral-950 md:px-16">
        <Statement>
          Well, no.
          <br />
          Not yet at least.
        </Statement>
      </section>

      {/* 5 — Cream */}
      <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center bg-[#fef7ee] px-8 py-28 text-neutral-950 md:px-16">
        <Statement>
          Pendolo, means pendulum in Italian. This word describes how we work and how design and development overlap.
        </Statement>
      </section>

      {/* 6 — Orange */}
      <section className="flex min-h-[90vh] w-full items-center justify-center bg-[#fe7b02] px-8 py-24 text-center text-neutral-950 md:px-16 md:py-32">
        <Statement>
          When we create a website or an online platform we go back and forth between design and dev.
          <br />
          <br />
          We are in constant motion with a fixed point being the creative direction.
        </Statement>
      </section>

      {/* 7 — Purple */}
      <section className="flex min-h-[64vh] w-full items-center justify-center bg-[#575ecf] px-8 py-20 text-center text-white md:px-16 md:py-24">
        <Statement className="text-white">
          This helps us come up with something different and unique.
          <br />
          <br />
          This is why we think that...
        </Statement>
      </section>

      {/* 8 — Cream */}
      <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center bg-[#fef7ee] px-8 py-28 text-neutral-950 md:px-16">
        <Statement>Go on. Give us a call.</Statement>
      </section>

      {/* 9 — Orange */}
      <section className="flex min-h-[90vh] w-full items-center justify-center bg-[#fe7b02] px-8 py-24 text-center text-neutral-950 md:px-16 md:py-32">
        <Statement>
          We are curious people and like to find out about things we know nothing about. We also enjoy meeting people who
          have interesting ideas, but may not have the resources to get their brand online.
          <br />
          <br />
          Give us a call and let&apos;s try and make something work out.
        </Statement>
      </section>

      {/* 10 — Purple */}
      <section className="flex min-h-[64vh] w-full items-center justify-center bg-[#575ecf] px-8 py-20 text-center text-white md:px-16 md:py-24">
        <Statement className="text-white">
          Based between the UK, Italy and Cyprus, we work across borders and don&apos;t have a fixed office. In fact, we
          work remotely.
        </Statement>
      </section>

      {/* 11 — Orange */}
      <section className="flex min-h-[90vh] w-full items-center justify-center bg-[#fe7b02] px-8 py-24 text-center text-neutral-950 md:px-16 md:py-32">
        <Statement>
          We speak Italian, English, with working knowledge of Spanish. We have worked with and for companies in the UK,
          USA, Italy and Chile.
        </Statement>
      </section>

    </main>
  );
};

export default About;
