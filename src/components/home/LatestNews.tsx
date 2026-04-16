import { Link } from "react-router-dom";

const articles = [
  {
    title: "From Figma to Production: A Guide for Clean Handoffs",
    category: "Design",
    date: "2025",
  },
  {
    title: "How to Build a Betterment-Level Experience on a Startup Budget",
    category: "Strategy",
    date: "2025",
  },
  {
    title: "Why Brand Consistency Still Matters in 2025",
    category: "Brand",
    date: "2025",
  },
];

const LatestNews = () => {
  return (
    <section className="py-32 md:py-44 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              LATEST NEWS
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
              From the blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="mt-8 md:mt-0 link-underline text-sm tracking-wide text-foreground/80 hover:text-foreground transition-opacity"
          >
            Read all articles
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {articles.map((article) => (
            <article key={article.title} className="group">
              <div className="aspect-[4/3] bg-secondary border border-border mb-6" />
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                {article.category} · {article.date}
              </p>
              <h3 className="text-base md:text-lg font-light tracking-tight leading-snug group-hover:text-foreground/80 transition-opacity">
                {article.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
