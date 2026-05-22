import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const projects = [
  {
    slug: "our-hut",
    title: "Our Hut",
    category: "Website · Architectural Education Charity · London",
    color: "#9484D2",
  },
  {
    slug: "rk-abogados",
    title: "RK Abogados",
    category: "Website · Branding · Law Firm · Santiago",
    color: "#43CCBC",
  },
  {
    slug: "the-scrapbookers",
    title: "The Scrapbookers",
    category: "Travel Blog",
    color: "#E8E4DD",
  },
];

const WorkPreview = () => {
  return (
    <section className="relative z-0 py-32 md:py-44 border-t border-white/10 bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Selected Projects
            </h2>
          </div>
          <Link
            to="/work"
            className="cta-marketing mt-8 md:mt-0 self-start"
          >
            View all projects
            <span className="text-sm">→</span>
          </Link>
        </div>

        <DraggableCards />
      </div>
    </section>
  );
};

export default WorkPreview;

type DragPersist = Record<number, { x: number; y: number }>;

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/** Pixels of pointer movement above which we treat the gesture as a drag, not a tap. */
const TAP_MOVE_THRESHOLD = 12;

const DraggableCards = () => {
  const [topIndex, setTopIndex] = useState(0);
  const [dragPersist, setDragPersist] = useState<DragPersist>({});
  const [dragBounds, setDragBounds] = useState({ maxX: 200, maxY: 60 });
  const navigate = useNavigate();
  const constraintsRef = useRef<HTMLDivElement>(null);
  /** After a drag on this card index, ignore the next click (same gesture / pointer release). */
  const skipClickForCardIndex = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = constraintsRef.current;
    if (!el) return;

    const measure = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      const wide = window.matchMedia("(min-width: 768px)").matches;
      const cardW = wide ? 340 : 260;
      const cardH = wide ? 440 : 340;
      setDragBounds({
        maxX: Math.max(0, Math.floor((cw - cardW) / 2)),
        maxY: Math.max(0, Math.floor((ch - cardH) / 2)),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const order = projects.map((_, i) => (i + topIndex) % projects.length);

  const bringToFront = (projectIndex: number) => {
    setTopIndex(projectIndex);
  };

  return (
    <div className="relative flex w-full flex-col items-center py-16 pb-14 select-none isolate">
      <div
        ref={constraintsRef}
        className="relative h-[400px] w-full overflow-hidden rounded-sm md:h-[500px]"
      >
        {projects.map((project, projectIndex) => {
          const stackPos = order.indexOf(projectIndex);
          const depth = projects.length - 1 - stackPos;
          const offset = (stackPos - (projects.length - 1) / 2) * 140;
          const rotation = (stackPos - (projects.length - 1) / 2) * 5;
          const zIndex = 20 - stackPos;
          const isTop = stackPos === 0;
          const extra = dragPersist[projectIndex] ?? { x: 0, y: 0 };
          const baseScale = 1 - depth * 0.04;

          return (
            <div
              key={project.slug}
              className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[260px] -translate-x-1/2 md:h-[440px] md:w-[340px]"
              style={{
                marginLeft: offset,
                zIndex,
              }}
            >
              <motion.div
                drag
                dragConstraints={{
                  left: -dragBounds.maxX,
                  right: dragBounds.maxX,
                  top: -dragBounds.maxY,
                  bottom: dragBounds.maxY,
                }}
                dragElastic={0.06}
                dragMomentum={false}
                onDragStart={() => {
                  skipClickForCardIndex.current = null;
                  bringToFront(projectIndex);
                }}
                onDrag={(_, info) => {
                  if (Math.hypot(info.offset.x, info.offset.y) >= TAP_MOVE_THRESHOLD) {
                    skipClickForCardIndex.current = projectIndex;
                  }
                }}
                onDragEnd={(_, info) => {
                  if (Math.hypot(info.offset.x, info.offset.y) >= TAP_MOVE_THRESHOLD) {
                    skipClickForCardIndex.current = projectIndex;
                  }

                  setDragPersist((prev) => {
                    const cur = prev[projectIndex] ?? { x: 0, y: 0 };
                    return {
                      ...prev,
                      [projectIndex]: {
                        x: clamp(cur.x + info.offset.x, -dragBounds.maxX, dragBounds.maxX),
                        y: clamp(cur.y + info.offset.y, -dragBounds.maxY, dragBounds.maxY),
                      },
                    };
                  });
                }}
                onClick={() => {
                  if (skipClickForCardIndex.current === projectIndex) {
                    skipClickForCardIndex.current = null;
                    return;
                  }
                  if (isTop) navigate("/work");
                  else bringToFront(projectIndex);
                }}
                initial={false}
                animate={{
                  x: extra.x,
                  y: extra.y,
                  rotate: rotation,
                  scale: baseScale,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                whileDrag={{ scale: baseScale * 0.99, cursor: "grabbing" }}
                style={{
                  backgroundColor: project.color,
                  cursor: isTop ? "grab" : "pointer",
                }}
                className="pointer-events-auto flex h-full w-full touch-none flex-col justify-between border border-black/10 p-8 shadow-sm"
              >
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-[#0D0D0D]">
                    {String(projectIndex + 1).padStart(2, "0")}
                  </p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-3 text-[#0D0D0D]">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight text-[#0D0D0D]">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-white">
        Drag to reposition · Click the front card to open (no drag)
      </p>
    </div>
  );
};
