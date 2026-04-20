import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    slug: "meridian-cultural-centre",
    title: "Meridian Cultural Centre",
    category: "Brand · Web Design · Development",
    description: "Complete identity and digital presence for a cultural venue bridging Italian and British arts programming.",
    color: "#9484D2",
  },
  {
    slug: "terraverde-organic",
    title: "Terraverde Organic",
    category: "Brand · E-commerce",
    description: "Brand identity and online store for a family-run organic producer expanding across European markets.",
    color: "#43CCBC",
  },
  {
    slug: "lumen-foundation",
    title: "Lumen Foundation",
    category: "Web Design · Development",
    description: "Clear, accessible website for a non-profit supporting digital literacy initiatives in underserved communities.",
    color: "#E8E4DD",
  },
];

const WorkPreview = () => {
  return (
    <section className="py-32 md:py-44 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              WORK
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Selected Client
              <br />Projects
            </h2>
          </div>
          <Link
            to="/work"
            className="mt-8 md:mt-0 inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase border border-foreground/30 px-6 py-3 text-foreground/80 hover:text-foreground hover:border-foreground/60 transition-all duration-300 self-start"
          >
            View all projects
            <span className="text-sm">→</span>
          </Link>
        </div>

        {/* Draggable card carousel */}
        <DraggableCards />

        <div className="space-y-0">
          {projects.map((project, index) => (
            <Link to="/work" key={project.title} className="block group">
              <div className="grid md:grid-cols-12 gap-6 items-center py-8 border-t border-border">
                <div className="md:col-span-1">
                  <span className="text-xs text-muted-foreground tracking-wide">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-lg md:text-xl font-light tracking-tight group-hover:text-foreground/80 transition-opacity">
                    {project.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkPreview;

const DraggableCards = () => {
  const [topIndex, setTopIndex] = useState(0);
  const navigate = useNavigate();

  const order = projects.map((_, i) => (i + topIndex) % projects.length);

  const bringToFront = (projectIndex: number) => {
    setTopIndex(projectIndex);
  };

  return (
    <div className="relative flex justify-center items-center py-16 mb-16 select-none">
      <div className="relative w-full max-w-3xl h-[400px] md:h-[500px]">
        {projects.map((project, projectIndex) => {
          const stackPos = order.indexOf(projectIndex); // 0 = top
          const depth = projects.length - 1 - stackPos; // higher = further back
          const offset = (stackPos - (projects.length - 1) / 2) * 140;
          const rotation = (stackPos - (projects.length - 1) / 2) * 5;
          const zIndex = 100 - stackPos;
          const isTop = stackPos === 0;

          return (
            <motion.div
              key={project.slug}
              drag
              dragElastic={0.4}
              dragConstraints={{ left: -400, right: 400, top: -100, bottom: 100 }}
              dragMomentum={false}
              onDragStart={() => bringToFront(projectIndex)}
              onDragEnd={(_, info) => {
                // If dragged far, cycle the next card to the top
                if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 100) {
                  setTopIndex((prev) => (prev + 1) % projects.length);
                }
              }}
              onClick={() => {
                if (isTop) navigate("/work");
                else bringToFront(projectIndex);
              }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              initial={false}
              animate={{
                x: `calc(-50% + ${offset}px)`,
                rotate: rotation,
                scale: 1 - depth * 0.04,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{
                zIndex,
                backgroundColor: project.color,
                cursor: isTop ? "grab" : "pointer",
              }}
              className="absolute top-0 left-1/2 w-[260px] md:w-[340px] h-[340px] md:h-[440px] border border-border shadow-sm flex flex-col justify-between p-8 touch-none"
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase opacity-70 text-foreground">
                  {String(projectIndex + 1).padStart(2, "0")}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-3 opacity-70 text-foreground">
                  {project.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight text-foreground">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        Drag · Click to open
      </p>
    </div>
  );
};
