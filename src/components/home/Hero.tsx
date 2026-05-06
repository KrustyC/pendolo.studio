import { CSSProperties, ReactNode } from "react";
import HeroPendulum3d from "@/components/home/HeroPendulum3d";

type HighlightVariant = "scribble" | "underline-wave" | "circle";

/** Matches `ServicesPreview` sticky block backgrounds */
const SERVICE_ACCENT = {
  brand: "#9484D2",
  webDesign: "#43CCBC",
  webDev: "#0D0D0D",
} as const;

type ServiceAccentKey = keyof typeof SERVICE_ACCENT;

const HandDrawnRing = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg
    className={`pointer-events-none ${className ?? ""}`}
    style={style}
    viewBox="0 0 200 52"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden
  >
    <path
      d="M14 26 C 20 10, 48 5, 98 7 C 152 9, 186 14, 190 26 C 194 40, 158 48, 98 46 C 38 44, 10 36, 14 26 Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.88}
    />
    <path
      d="M22 28 C 30 14, 58 10, 100 11 C 142 12, 176 18, 182 30 C 186 38, 150 44, 100 42 C 50 40, 16 34, 22 28 Z"
      stroke="currentColor"
      strokeWidth="0.85"
      strokeLinecap="round"
      opacity={0.5}
    />
    <path
      d="M18 24 C 26 8, 52 4, 102 6 C 148 8, 184 16, 188 28"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      opacity={0.35}
    />
  </svg>
);

const HandDrawnUnderline = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg
    className={`pointer-events-none ${className ?? ""}`}
    style={style}
    viewBox="0 0 200 14"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden
  >
    <path
      d="M3 9 C 22 5, 38 11, 55 7 S 88 10, 102 6 S 128 11, 145 7 S 172 10, 197 6"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 11 C 28 8, 48 12, 72 9 S 110 12, 132 8 S 165 11, 195 8"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      opacity={0.45}
    />
    <path
      d="M8 7 L 24 9 L 40 6 L 58 9 L 78 5 L 98 8 L 118 5 L 138 9 L 158 6 L 178 9 L 192 7"
      stroke="currentColor"
      strokeWidth="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.3}
    />
  </svg>
);

const HandDrawnScribbleLine = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg
    className={`pointer-events-none ${className ?? ""}`}
    style={style}
    viewBox="0 0 200 12"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden
  >
    <path
      d="M2 7 C 18 3, 34 9, 52 5 S 88 9, 104 5 S 140 10, 158 4 S 182 9, 198 5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M4 9 C 32 6, 56 11, 80 7 S 124 10, 150 6 S 178 10, 196 7"
      stroke="currentColor"
      strokeWidth="0.65"
      strokeLinecap="round"
      opacity={0.4}
    />
  </svg>
);

/** Curved hand-drawn arrow; rotate via wrapper to point where needed */
const HandDrawnCurveArrow = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <svg
    className={`shrink-0 ${className ?? ""}`}
    style={style}
    viewBox="0 0 64 48"
    fill="none"
    aria-hidden
  >
    <path
      d="M6 42 C 18 16, 38 6, 58 10"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M9 40 C 21 18, 40 8, 56 12"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      opacity={0.4}
    />
    <path
      d="M50 4 L58 10 L54 18"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M52 6 L57 10 L54 15"
      stroke="currentColor"
      strokeWidth="0.55"
      strokeLinecap="round"
      opacity={0.4}
    />
  </svg>
);

interface HighlightWordProps {
  children: ReactNode;
  variant: HighlightVariant;
  /** Stroke color for the hand-drawn mark only; text stays black */
  accentHex: string;
}

const highlightSerif = { fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: "italic" as const };

const HighlightWord = ({ children, variant, accentHex }: HighlightWordProps) => {
  const ink = { color: accentHex } as const;

  const textStyle: CSSProperties | undefined = variant === "circle" ? highlightSerif : undefined;
  const textClass =
    variant === "circle"
      ? ""
      : variant === "underline-wave"
        ? "font-sans font-normal not-italic"
        : "font-sans font-semibold not-italic";

  const renderHighlight = () => {
    switch (variant) {
      case "scribble":
        return (
          <HandDrawnScribbleLine
            className="absolute left-0 -bottom-1 w-full h-3.5 md:h-4"
            style={ink}
          />
        );
      case "underline-wave":
        return (
          <HandDrawnUnderline
            className="absolute left-0 -bottom-1 w-full h-4 md:h-[1.1rem]"
            style={ink}
          />
        );
      case "circle":
        return (
          <HandDrawnRing
            className="absolute -left-2 -right-3 -top-2 -bottom-2 w-[calc(100%+1.25rem)] h-[calc(100%+1rem)] md:h-[calc(100%+0.85rem)]"
            style={ink}
          />
        );
    }
  };

  return (
    <span className={`relative inline-block text-[#0D0D0D] ${textClass}`} style={textStyle}>
      <span className="relative z-10">{children}</span>
      {renderHighlight()}
    </span>
  );
};

const caveatStyle = { fontFamily: '"Caveat", cursive' } as const;

type ArrowSide = "left" | "right";

interface ScatteredNote {
  text: string;
  accent: ServiceAccentKey;
  /** Absolute positioning classes within the scatter container */
  position: string;
  /** Rotation applied to the note (degrees) */
  rotate: number;
  /** Arrow sits to the left or right of the note */
  arrowSide: ArrowSide;
  /** Arrow rotation (degrees) — base drawing points up-right from its bottom-left */
  arrowRotate: number;
}

const SCATTERED_NOTES: ScatteredNote[] = [
  {
    text: "A logo, and the soul behind it.",
    accent: "brand",
    position: "top-2 left-[4%] md:left-[6%]",
    rotate: -6,
    arrowSide: "right",
    arrowRotate: -18,
  },
  {
    text: "Websites that don't make people sigh.",
    accent: "webDesign",
    position: "top-[5.5rem] md:top-[6rem] right-[4%] md:right-[10%]",
    rotate: 4,
    arrowSide: "left",
    arrowRotate: 24,
  },
  {
    text: "Fast, clear code — built to last.",
    accent: "webDev",
    position: "bottom-0 left-[30%] md:left-[38%]",
    rotate: -3,
    arrowSide: "left",
    arrowRotate: -52,
  },
];

const Hero = () => {
  return (
    <section className="relative flex min-h-svh flex-col justify-end bg-[#F25C3D] px-6 pb-14 pt-32 text-[#0D0D0D] md:px-8 md:pb-20 md:pt-36 lg:px-12">
      <HeroPendulum3d />
      <div className="container relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="animate-fade-up-delay-1 ml-auto w-full max-w-[46rem] text-right">
          <h1 className="font-sans text-3xl font-light not-italic leading-[1.35] tracking-tight text-[#0D0D0D] md:text-[2.65rem] lg:text-[3.15rem]">
              <HighlightWord variant="circle" accentHex={SERVICE_ACCENT.brand}>
                Branding
              </HighlightWord>
              {", "}
              <HighlightWord variant="underline-wave" accentHex={SERVICE_ACCENT.webDesign}>
                web design
              </HighlightWord>
              {", and "}
              <HighlightWord variant="scribble" accentHex={SERVICE_ACCENT.webDev}>
                development
              </HighlightWord>
              {" for businesses that value a different point of view."}
          </h1>
        </div>

          {/* Scattered annotations — hidden on hero to match layout reference (pendulum + headline only) */}
          <div className="relative mt-10 hidden h-[13rem] md:h-[14rem]">
            {SCATTERED_NOTES.map((n) => {
              const hex = SERVICE_ACCENT[n.accent];
              const arrow = (
                <HandDrawnCurveArrow
                  className="w-10 h-8 md:w-12 md:h-10"
                  style={{
                    color: hex,
                    transform: `rotate(${n.arrowRotate}deg)`,
                  }}
                />
              );
              return (
                <div
                  key={n.text}
                  className={`absolute ${n.position} max-w-[14rem] md:max-w-[15rem]`}
                  style={{ transform: `rotate(${n.rotate}deg)` }}
                >
                  <div
                    className={`flex items-end gap-1.5 ${
                      n.arrowSide === "left" ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {arrow}
                    <p
                      className="text-lg md:text-xl leading-snug text-[#0D0D0D]"
                      style={caveatStyle}
                    >
                      {n.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile fallback — stacked, no rotation */}
          <ul className="mt-8 space-y-4 sm:hidden">
            {SCATTERED_NOTES.map((n) => {
              const hex = SERVICE_ACCENT[n.accent];
              return (
                <li key={n.text} className="flex items-start gap-2">
                  <HandDrawnCurveArrow
                    className="w-8 h-7 mt-1"
                    style={{ color: hex, transform: "rotate(-15deg)" }}
                  />
                  <p
                    className="text-lg leading-snug text-[#0D0D0D] max-w-[16rem]"
                    style={caveatStyle}
                  >
                    {n.text}
                  </p>
                </li>
              );
            })}
          </ul>
      </div>
    </section>
  );
};

export default Hero;
