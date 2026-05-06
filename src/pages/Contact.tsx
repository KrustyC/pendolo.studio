import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
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
    <main className="section-dark pt-32 md:pt-44 pb-32">
      <div className="container mx-auto px-3 md:px-4 lg:px-6">
        <div className="max-w-5xl mx-auto animate-fade-up">
          <form onSubmit={handleSubmit} className="mx-auto w-fit max-w-full space-y-6">
            {/* Conversational form layout inspired by reference */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
                <span className="inline-block w-[13.5rem] md:w-[16rem] text-right">Hello, my name is</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  maxLength={100}
                  placeholder="Your Name"
                  className="bg-transparent border-b border-white/55 focus:border-white outline-none text-white placeholder:text-white pb-1 min-w-[160px] flex-shrink transition-colors"
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
                  className="bg-transparent border-b border-white/55 focus:border-white outline-none text-white placeholder:text-white pb-1 min-w-[200px] flex-shrink transition-colors"
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
                  className="bg-transparent border-b border-white/55 focus:border-white outline-none text-white placeholder:text-white pb-1 min-w-[140px] flex-shrink transition-colors"
                />
                <span>.</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
                <span className="inline-block w-[13.5rem] md:w-[16rem] text-right">We are looking for</span>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  {[
                    { label: "Brand Design", value: "brand" },
                    { label: "Web Design", value: "web-design" },
                    { label: "Web Development", value: "web-dev" },
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
                      className={
                        formData.service.includes(service.value)
                          ? "inline-flex items-center justify-center rounded-full border px-4 py-1.5 font-sans text-xs font-medium tracking-wide transition-colors border-white bg-white text-black"
                          : "inline-flex items-center justify-center rounded-full border px-4 py-1.5 font-sans text-xs font-medium tracking-wide transition-colors border-white text-white bg-transparent hover:bg-white/60 hover:border-white/60 hover:text-black"
                      }
                      aria-pressed={formData.service.includes(service.value)}
                    >
                      {service.label}
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
                  { label: "Under £5,000", value: "<5k" },
                  { label: "£5,000 - £10,000", value: "5-10k" },
                  { label: "£10,000+", value: "10k+" },
                ].map((range) => (
                  <button
                    key={range.value}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, budget: range.value }))}
                    className={
                      formData.budget === range.value
                        ? "inline-flex items-center justify-center rounded-full border px-4 py-1.5 font-sans text-xs font-medium tracking-wide transition-colors border-white bg-white text-black"
                        : "inline-flex items-center justify-center rounded-full border px-4 py-1.5 font-sans text-xs font-medium tracking-wide transition-colors border-white text-white bg-transparent hover:bg-white/60 hover:border-white/60 hover:text-black"
                    }
                    aria-pressed={formData.budget === range.value}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
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
