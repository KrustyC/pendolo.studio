import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import brandCircle from "../../brand.svg";
import webDesignCircle from "../../web design.svg";
import webDevCircle from "../../web dev.svg";

const Contact = () => {
  const { toast } = useToast();
  const inputBaseClass =
    "bg-transparent border-0 outline-none text-white placeholder:text-white/50 placeholder:font-sans font-rock-salt leading-none h-[1.1em] pb-0 flex-shrink transition-colors";
  const chipBaseClass =
    "group relative inline-flex items-center justify-center bg-transparent px-2 py-1 text-white transition-colors duration-150";
  const chipTextClass = "relative z-10 font-light tracking-tight leading-[1.05] transition-[font-weight] duration-150";
  const chipCircleClass = "pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] max-w-none";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: [] as string[],
    industry: "",
    budget: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you. We'll be in touch within two working days.",
    });
    setFormData({ name: "", email: "", company: "", service: [], industry: "", budget: "", description: "" });
  };

  return (
    <main className="section-dark min-h-svh flex items-center py-20 md:py-24">
      <div className="container mx-auto w-full px-3 md:px-4 lg:px-6">
        <div className="max-w-5xl mx-auto animate-fade-up">
          <form onSubmit={handleSubmit} className="mx-auto w-fit max-w-full space-y-4">
            {/* Conversational form layout inspired by reference */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
                <span className="inline-block w-[13.5rem] md:w-[16rem] text-right">Hello, my name is</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  maxLength={100}
                  placeholder="Your Name"
                  className={`${inputBaseClass} min-w-[160px] ${formData.name ? "text-[#F25C3D]" : ""}`}
                />
              </div>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
                <span className="inline-block w-[13.5rem] md:w-[16rem] text-right">and my email is</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  required
                  maxLength={255}
                  placeholder="Email Address"
                  className={`${inputBaseClass} min-w-[200px] ${formData.email ? "text-[#F25C3D]" : ""}`}
                />
              </div>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
                <span className="inline-block w-[13.5rem] md:w-[16rem] text-right">I represent</span>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                  maxLength={100}
                  placeholder="Company"
                  className={`${inputBaseClass} min-w-[140px] ${formData.company ? "text-[#F25C3D]" : ""}`}
                />
                <span>.</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
                <span className="inline-block w-[13.5rem] md:w-[16rem] text-right">We are looking for</span>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  {[
                    { label: "Brand Design", value: "brand", circle: brandCircle },
                    { label: "Web Design", value: "web-design", circle: webDesignCircle },
                    { label: "Web Development", value: "web-dev", circle: webDevCircle },
                  ].map((service) => (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          service: p.service.includes(service.value)
                            ? p.service.filter((v) => v !== service.value)
                            : [...p.service, service.value],
                        }))
                      }
                      className={chipBaseClass}
                      aria-pressed={formData.service.includes(service.value)}
                    >
                      {formData.service.includes(service.value) ? (
                        <img
                          src={service.circle}
                          alt=""
                          aria-hidden="true"
                          className={chipCircleClass}
                        />
                      ) : null}
                      <span className="relative z-10 grid">
                        <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold tracking-tight leading-[1.05]">
                          {service.label}
                        </span>
                        <span
                          className={`${chipTextClass} col-start-1 row-start-1 ${
                            formData.service.includes(service.value) ? "font-semibold" : "group-hover:font-semibold"
                          }`}
                        >
                          {service.label}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Budget */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
              <span className="inline-block w-[13.5rem] md:w-[16rem] text-right whitespace-nowrap">Our budget is around</span>
              <div className="flex min-w-[16rem] flex-1 flex-wrap items-center gap-3">
                {[
                  { label: "Under £5,000", value: "<5k", circle: brandCircle },
                  { label: "£5,000 - £10,000", value: "5-10k", circle: webDesignCircle },
                  { label: "£10,000+", value: "10k+", circle: webDevCircle },
                ].map((range) => (
                  <button
                    key={range.value}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, budget: range.value }))}
                    className={chipBaseClass}
                    aria-pressed={formData.budget === range.value}
                  >
                    {formData.budget === range.value ? (
                      <img src={range.circle} alt="" aria-hidden="true" className={chipCircleClass} />
                    ) : null}
                    <span className="relative z-10 grid">
                      <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold tracking-tight leading-[1.05]">
                        {range.label}
                      </span>
                      <span
                        className={`${chipTextClass} col-start-1 row-start-1 ${
                          formData.budget === range.value ? "font-semibold" : "group-hover:font-semibold"
                        }`}
                      >
                        {range.label}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
              <button type="submit" className="cta-submit">
                Send an enquiry
              </button>
              <a
                href="mailto:hello@pendolo.studio"
                className="text-sm text-white underline underline-offset-4 hover:text-white transition-colors"
              >
                or send us an email
              </a>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
};

export default Contact;
