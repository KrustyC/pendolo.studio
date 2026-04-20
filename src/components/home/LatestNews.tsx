import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Artwork = {
  bg: string;
  fg: string;
  shape: "bolt" | "diamond" | "blob" | "bolt-soft";
  shapeColor: string;
  title: string;
};

const articles: {
  ep: string;
  artwork: Artwork;
  title: string;
  date: string;
}[] = [
  {
    ep: "EP192",
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
  },
  {
    ep: "EP191",
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
  },
  {
    ep: "EP190",
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
  },
  {
    ep: "EP189",
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
  },
  {
    ep: "EP188",
    artwork: {
      bg: "#1F8F6A",
      fg: "#0D0D0D",
      shape: "bolt-soft",
      shapeColor: "#BFE0DE",
      title: "The\nSpark",
    },
    title: "The Spark: Mistakes, Lessons and the Magic of Showing Up",
    date: "18 December 2025",
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

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-32 md:py-44">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground">
            Podcast
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
        className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pl-6 lg:pl-12 pr-6 lg:pr-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {articles.map((article) => (
          <Link
            to="/blog"
            key={article.ep}
            className="group shrink-0 w-[78vw] sm:w-[420px] md:w-[440px] snap-start"
          >
            {/* Artwork tile */}
            <div className="relative w-full aspect-square overflow-hidden">
              {/* Top cream band with EP number + eyes */}
              <div className="absolute top-0 left-0 right-0 h-[18%] bg-[#F5F0E6] z-10 flex items-center justify-between px-6">
                <span
                  className="text-sm md:text-base tracking-tight"
                  style={{ color: "#0D0D0D" }}
                >
                  EP — {article.ep.replace("EP", "")}
                </span>
                <div className="flex items-center gap-1">
                  <span className="block w-3 h-3 rounded-full border-[2px] border-[#0D0D0D]" />
                  <span className="block w-3 h-3 rounded-full border-[2px] border-[#0D0D0D]" />
                </div>
              </div>

              {/* Artwork body */}
              <div
                className="absolute inset-0 pt-[18%]"
                style={{ backgroundColor: article.artwork.bg }}
              >
                <div className="relative w-full h-full">
                  <Shape artwork={article.artwork} />
                  <div
                    className="absolute top-6 left-6 text-3xl md:text-5xl font-medium leading-[0.95] whitespace-pre-line tracking-tight"
                    style={{ color: article.artwork.fg }}
                  >
                    {article.artwork.title}
                  </div>
                </div>
              </div>
            </div>

            {/* Episode pill */}
            <div className="mt-6">
              <span className="inline-block text-xs tracking-wide px-4 py-1.5 rounded-full border border-foreground/40 text-foreground">
                {article.ep}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-5 text-xl md:text-2xl font-light tracking-tight leading-snug text-foreground group-hover:underline underline-offset-4">
              {article.title}
            </h3>

            {/* Date */}
            <p className="mt-4 text-sm text-muted-foreground">{article.date}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
