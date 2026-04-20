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
