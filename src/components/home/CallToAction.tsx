import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="section-accent py-32 md:py-48">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-light tracking-tight leading-[1.1] mb-14 max-w-4xl mx-auto text-white">
          Looking for something
          <br />
          different? <span className="font-editorial">iconic.</span>
        </h2>
        <Link
          to="/contact"
          className="link-underline text-xs tracking-[0.2em] uppercase text-white/80 hover:text-white transition-opacity"
        >
          Partner with us
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
