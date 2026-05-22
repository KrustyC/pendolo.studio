import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Pixels per second — drift to the left (must be obvious but calm). */
const AUTO_SCROLL_SPEED = 48;

type Artwork = {
  bg: string;
  fg: string;
  shape: "bolt" | "diamond" | "blob" | "bolt-soft";
  shapeColor: string;
  title: string;
};

const articles: {
  ep: string;
  /** Topic chips under the tile (replaces episode number in UI). */
  subjects: string[];
  artwork: Artwork;
  title: string;
  date: string;
  readTime: string;
  /** Distinct frame proportions so tiles aren’t locked to one height (natural rhythm in the row). */
  aspectClass: string;
}[] = [
  {
    ep: "EP192",
    subjects: ["Podcast", "Creativity", "Interview"],
    aspectClass: "aspect-[3/2]",
    artwork: {
      bg: "#E8B6F0",
      fg: "#0D0D0D",
      shape: "bolt",
      shapeColor: "#1F8F6A",
      title: "The\nSpark",
    },
    title:
      "The Spark: Chris Wilson on Confidence, Chaos and Keeping Your Creativity Alive",
    date: "15 January 2026",
    readTime: "7 min read",
  },
  {
    ep: "EP191",
    subjects: ["Interview", "Wellbeing", "Story"],
    aspectClass: "aspect-square",
    artwork: {
      bg: "#F25C3D",
      fg: "#0D0D0D",
      shape: "diamond",
      shapeColor: "#E8B6F0",
      title: "Chris\nWilson",
    },
    title:
      "From Trauma to Triumph with Chris Wilson: Creativity, Resilience & the Courage to Keep Going",
    date: "12 January 2026",
    readTime: "6 min read",
  },
  {
    ep: "EP190",
    subjects: ["Podcast", "Culture", "Studio"],
    aspectClass: "aspect-[5/4]",
    artwork: {
      bg: "#BFE0DE",
      fg: "#0D0D0D",
      shape: "bolt",
      shapeColor: "#F2C744",
      title: "The\nSpark",
    },
    title:
      "The Spark: Joy Nazzari on Fish and Chips, Street Art Dreams and Friday Studio Nostalgia",
    date: "8 January 2026",
    readTime: "8 min read",
  },
  {
    ep: "EP189",
    subjects: ["Leadership", "Agency life", "People"],
    aspectClass: "aspect-[3/4]",
    artwork: {
      bg: "#F2C744",
      fg: "#0D0D0D",
      shape: "blob",
      shapeColor: "#F25C3D",
      title: "Joy\nNazzari",
    },
    title:
      "Building Belonging: Joy Nazzari on 20 Years of DNCO, Saying No and Staying Sane",
    date: "5 January 2026",
    readTime: "5 min read",
  },
  {
    ep: "EP188",
    subjects: ["Podcast", "Process", "Lessons"],
    aspectClass: "aspect-[2/1]",
    artwork: {
      bg: "#1F8F6A",
      fg: "#0D0D0D",
      shape: "bolt-soft",
      shapeColor: "#BFE0DE",
      title: "The\nSpark",
    },
    title: "The Spark: Mistakes, Lessons and the Magic of Showing Up",
    date: "18 December 2025",
    readTime: "4 min read",
  },
];

const Shape = ({ artwork }: { artwork: Artwork }) => {
  const { shape, shapeColor } = artwork;
  if (shape === "bolt") {
    return (
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M120 20 L60 110 L100 110 L80 190 L150 90 L110 90 Z"
          fill={shapeColor}
        />
      </svg>
    );
  }
  if (shape === "bolt-soft") {
    return (
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M130 30 L70 115 L105 115 L85 180 L150 100 L115 100 Z"
          fill={shapeColor}
        />
      </svg>
    );
  }
  if (shape === "diamond") {
    return (
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <rect
          x="55"
          y="55"
          width="110"
          height="110"
          transform="rotate(45 110 110)"
          fill={shapeColor}
        />
      </svg>
    );
  }
  // blob (4-petal flower)
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      <g fill={shapeColor}>
        <circle cx="100" cy="60" r="45" />
        <circle cx="100" cy="150" r="45" />
        <circle cx="55" cy="105" r="45" />
        <circle cx="145" cy="105" r="45" />
        <rect x="55" y="60" width="90" height="90" />
      </g>
    </svg>
  );
};

const LatestNews = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pauseAutoRef = useRef(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();
    let alive = true;

    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;

      if (!document.hidden && !pauseAutoRef.current) {
        const track = el.firstElementChild as HTMLElement | null;
        const stripB = track?.children[1] as HTMLElement | undefined;
        /** One full cycle = first strip + gap before duplicate (see JSX: two flex strips in a row). */
        const loopWidth = stripB?.offsetLeft ?? 0;

        if (loopWidth > 0 && el.scrollWidth > el.clientWidth + 2) {
          el.scrollLeft += AUTO_SCROLL_SPEED * dt;
          if (el.scrollLeft >= loopWidth - 0.5) {
            el.scrollLeft -= loopWidth;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  const articleCard = (article: (typeof articles)[number], keySuffix: string) => (
    <Link
      to="/blog"
      key={`${article.ep}-${keySuffix}`}
      className="group w-[78vw] shrink-0 sm:w-[420px] md:w-[440px]"
    >
      {/* Artwork tile — aspect per card so vertical rhythm matches real editorial feeds */}
      <div className={`relative w-full overflow-hidden ${article.aspectClass}`}>
        <div className="absolute inset-0" style={{ backgroundColor: article.artwork.bg }}>
          <div className="relative h-full w-full">
            <Shape artwork={article.artwork} />
            <div
              className="absolute left-6 top-6 text-3xl font-medium leading-[0.95] tracking-tight whitespace-pre-line md:text-5xl"
              style={{ color: article.artwork.fg }}
            >
              {article.artwork.title}
            </div>
          </div>
        </div>
      </div>

      {/* Subject chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {article.subjects.map((label, idx) => (
          <span
            key={`${article.ep}-${idx}-${label}`}
            className="inline-flex items-center rounded-full border border-foreground/25 bg-transparent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="mt-5 text-xl font-light leading-snug tracking-tight text-foreground underline-offset-4 group-hover:underline md:text-2xl">
        {article.title}
      </h3>

      {/* Date + reading time */}
      <p className="mt-4 text-sm text-foreground">
        {article.date} · {article.readTime}
      </p>
    </Link>
  );

  return (
    <section className="bg-background py-32 md:py-44">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
            A few of our thoughts
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={() => {
          pauseAutoRef.current = true;
        }}
        onMouseLeave={() => {
          pauseAutoRef.current = false;
        }}
        className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden pl-6 pr-6 [scrollbar-width:none] [-ms-overflow-style:none] lg:pl-12 lg:pr-12 [&::-webkit-scrollbar]:hidden"
      >
        {/*
          Critical: `min-w-0` + non-flex scroller so this box stays viewport-wide.
          If the row is the flex container itself, it grows with content and never scrolls.
        */}
        <div className="inline-flex items-start gap-6 md:gap-8">
          <div className="flex shrink-0 items-start gap-6 md:gap-8">
            {articles.map((article) => articleCard(article, "a"))}
          </div>
          <div className="flex shrink-0 items-start gap-6 md:gap-8">
            {articles.map((article) => articleCard(article, "b"))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
