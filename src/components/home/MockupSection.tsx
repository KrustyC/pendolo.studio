import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import mockupWebsite from "@/assets/mockup-website.jpg";

/** Scroll distance so the expand + parallax can breathe (sticky keeps the scene in view). */
const SCROLL_TRACK_VH = 220;

/** Same surface as `Hero` — keeps the handoff from hero → mockup visually continuous. */
const HERO_BG = "bg-[#F25C3D]";

const MockupSection = () => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;

  useEffect(() => {
    const read = () =>
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const p = useTransform(scrollYProgress, (v) => Math.max(0, Math.min(1, v)));

  const widthPx = useTransform(p, (t) => {
    const { w, h } = viewportRef.current;
    const portraitW = Math.min(260, Math.max(168, w * 0.42));
    return portraitW + t * (w - portraitW);
  });

  const heightPx = useTransform(p, (t) => {
    const { w, h } = viewportRef.current;
    const portraitW = Math.min(260, Math.max(168, w * 0.42));
    const portraitH = portraitW * (4 / 3);
    return portraitH + t * (h - portraitH);
  });

  const frameLift = useTransform(p, (t) => (1 - t) * 72);
  const imageParallax = useTransform(p, (t) => (t - 0.5) * -56);

  /** Fade in “What we do” only once the mockup is nearly full-bleed (end of scroll range). */
  const headlineOpacity = useTransform(p, [0.78, 0.96], [0, 1], { clamp: true });
  const headlineY = useTransform(p, [0.78, 0.96], [18, 0], { clamp: true });

  if (reducedMotion) {
    return (
      <section className={HERO_BG}>
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={mockupWebsite}
            alt="Pendolo studio website displayed on a MacBook Pro against a dark studio backdrop"
            loading="lazy"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative ${HERO_BG}`}
      style={{ minHeight: `${SCROLL_TRACK_VH}vh` }}
      aria-label="Featured project mockup"
    >
      <div
        className={`sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden ${HERO_BG}`}
      >
        <motion.div
          className="relative z-0 origin-center overflow-hidden will-change-[width,height,transform]"
          style={{
            width: widthPx,
            height: heightPx,
            y: frameLift,
            boxShadow: "0 28px 72px rgba(13, 13, 13, 0.12), 0 2px 8px rgba(13, 13, 13, 0.06)",
          }}
        >
          <motion.img
            src={mockupWebsite}
            alt="Pendolo studio website displayed on a MacBook Pro against a dark studio backdrop"
            loading="lazy"
            width={1920}
            height={1080}
            draggable={false}
            className="pointer-events-none absolute inset-x-0 top-[-9%] h-[118%] w-full object-cover object-center"
            style={{ y: imageParallax }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
          style={{ opacity: headlineOpacity, y: headlineY }}
        >
          <div className="max-w-5xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)] md:text-5xl lg:text-6xl">
              What we do
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MockupSection;
