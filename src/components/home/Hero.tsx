import { Link } from "react-router-dom";
import { ReactNode } from "react";

type HighlightVariant = "scribble" | "underline-wave" | "circle";
type TooltipPosition = "top" | "bottom";

interface HighlightWordProps {
  children: ReactNode;
  variant: HighlightVariant;
  tooltip: string;
  position?: TooltipPosition;
}

const HighlightWord = ({ children, variant, tooltip, position = "top" }: HighlightWordProps) => {
  const renderHighlight = () => {
    switch (variant) {
      case "scribble":
        return (
          <svg
            className="absolute left-0 -bottom-2 w-full h-3 text-accent pointer-events-none"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M2 7 C 30 2, 60 10, 90 5 S 150 9, 198 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      case "underline-wave":
        return (
          <svg
            className="absolute left-0 -bottom-2 w-full h-4 text-accent pointer-events-none"
            viewBox="0 0 200 14"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M2 8 Q 25 1, 50 7 T 100 7 T 150 7 T 198 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M4 11 Q 50 13, 100 10 T 196 11"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
        );
      case "circle":
        return (
          <svg
            className="absolute -left-2 -right-2 -top-1 -bottom-1 w-[calc(100%+1rem)] h-[calc(100%+0.5rem)] text-accent pointer-events-none"
            viewBox="0 0 220 50"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M30 8 C 80 2, 160 1, 200 12 C 218 22, 210 40, 150 44 C 90 48, 20 46, 8 32 C 0 18, 12 10, 30 8 Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );
    }
  };

  const isTop = position === "top";

  return (
    <span className="relative inline-block group cursor-help font-editorial">
      <span className="relative z-10">{children}</span>
      {renderHighlight()}

      {/* Tooltip */}
      <span
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${
          isTop ? "bottom-full mb-6" : "top-full mt-6"
        } opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20`}
      >
        <span className="relative block whitespace-nowrap">
          <span className="block text-xs md:text-sm tracking-wide text-accent font-editorial italic px-2">
            {tooltip}
          </span>
          {/* Arrow from text toward word */}
          <svg
            className={`absolute left-1/2 -translate-x-1/2 ${
              isTop ? "top-full" : "bottom-full rotate-180"
            } w-8 h-6 text-accent`}
            viewBox="0 0 32 24"
            fill="none"
          >
            <path
              d="M16 2 C 12 8, 18 14, 14 20"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M14 20 L 10 16 M 14 20 L 18 17"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
      </span>
    </span>
  );
};

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center pt-28 pb-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10 animate-fade-up font-extrabold">
            CREATIVITY WITH A FIXED POINT
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight leading-[1.3] mb-14 animate-fade-up-delay-1">
            Pendolo is a boutique studio combining{" "}
            <HighlightWord
              variant="scribble"
              tooltip="Pixels arranged on purpose."
              position="top"
            >
              design
            </HighlightWord>{" "}
            foundations with technical precision.{" "}
            <HighlightWord
              variant="circle"
              tooltip="A logo, and the soul behind it."
              position="bottom"
            >
              Brand identity
            </HighlightWord>
            ,{" "}
            <HighlightWord
              variant="underline-wave"
              tooltip="Websites that don't make people sigh."
              position="top"
            >
              web design
            </HighlightWord>
            , and development for businesses that value clarity.
          </h1>
          <Link
            to="/work"
            className="link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity animate-fade-up-delay-2"
          >
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
