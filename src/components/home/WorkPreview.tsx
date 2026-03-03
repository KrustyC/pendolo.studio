import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Meridian Cultural Centre",
    category: "Brand · Web Design · Development",
    description: "Complete identity and digital presence for a cultural venue bridging Italian and British arts programming.",
    color: "bg-secondary",
  },
  {
    title: "Terraverde Organic",
    category: "Brand · E-commerce",
    description: "Brand identity and online store for a family-run organic producer expanding across European markets.",
    color: "bg-muted",
  },
  {
    title: "Lumen Foundation",
    category: "Web Design · Development",
    description: "Clear, accessible website for a non-profit supporting digital literacy initiatives in underserved communities.",
    color: "bg-card",
  },
];

const WorkPreview = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Recent projects
          </h2>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Link to="/work" key={project.title} className="block group">
              <div className="grid md:grid-cols-12 gap-6 items-center py-8 border-t border-border">
                <div className="md:col-span-1">
                  <span className="text-sm text-muted-foreground font-body">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={`md:col-span-4 ${project.color} aspect-[16/10] rounded-sm`} />
                <div className="md:col-span-7 md:pl-6">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide group"
          >
            View all work
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkPreview;
