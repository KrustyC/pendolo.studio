"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

const SECOND_LINE = "Let’s decide together.";
const SECOND_LINE_DELAY_S = 2;
const LETTER_STAGGER_S = 0.045;

const headingClass =
  "text-center text-[clamp(0.95rem,1.55vw,1.35rem)] font-semibold uppercase leading-[1.55] tracking-[0.04em]";

function GlowLine({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className={reduceMotion ? "block" : "services-hero-glow-flash block"}>
      {children}
    </span>
  );
}

function LetterByLetterLine({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className="mt-1 block font-semibold">{text}</span>;
  }

  return (
    <span className="mt-1 inline-block font-semibold" aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="services-hero-letter-flash inline-block"
          style={{
            animationDelay: `${SECOND_LINE_DELAY_S + i * LETTER_STAGGER_S}s`,
          }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export const ServicesHero = () => {
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-[#0D0D0D] text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-24 md:px-8 lg:px-12">
        <h1 className={headingClass}>
          <GlowLine>
            We can do small things or
            <br />
            we can do bigger things.
          </GlowLine>
          <LetterByLetterLine text={SECOND_LINE} />
        </h1>
      </div>
    </section>
  );
};
