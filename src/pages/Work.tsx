import CallToAction from "@/components/home/CallToAction";

type GalleryItem = {
  /** Tailwind width classes */
  widthClass: string;
  aspectClass: string;
  /** Solid fill — no mock imagery so block layout reads clearly */
  color: string;
};

type CaseStudy = {
  tags: string[];
  titleBold: string;
  colA: string;
  colB: string;
  gallery: GalleryItem[];
};

const caseStudies: CaseStudy[] = [
  {
    tags: ["Website", "Charity", "Architectural Education"],
    titleBold: "Our Hut:",
    colA:
      "Website for an architectural education charity based in London, designed to present programmes clearly and make resources easier to access.",
    colB:
      "The build focuses on clear navigation, fast loading pages, and a flexible structure the team can maintain as projects evolve.",
    gallery: [
      { widthClass: "w-[42%] min-w-[220px] max-w-[340px]", aspectClass: "aspect-[4/5]", color: "#1a1a1a" },
      { widthClass: "w-[28%] min-w-[160px] max-w-[240px]", aspectClass: "aspect-square", color: "#E8B020" },
      { widthClass: "w-[38%] min-w-[200px] max-w-[320px]", aspectClass: "aspect-[3/4]", color: "#262626" },
      { widthClass: "w-[22%] min-w-[140px] max-w-[180px]", aspectClass: "aspect-[2/3]", color: "#43CCBC" },
      { widthClass: "w-[34%] min-w-[200px] max-w-[300px]", aspectClass: "aspect-[5/6]", color: "#141414" },
      { widthClass: "w-[26%] min-w-[160px] max-w-[220px]", aspectClass: "aspect-[3/5]", color: "#9484D2" },
    ],
  },
  {
    tags: ["Website", "Branding", "Law Firm"],
    titleBold: "RK Abogados:",
    colA:
      "Website and branding for a law firm in Santiago, shaped to communicate trust, clarity, and professionalism across every client touchpoint.",
    colB:
      "The visual system and site structure were developed together so tone, hierarchy, and usability support both reputation and day-to-day enquiries.",
    gallery: [
      { widthClass: "w-[30%] min-w-[180px] max-w-[260px]", aspectClass: "aspect-square", color: "#1F8F6A" },
      { widthClass: "w-[40%] min-w-[220px] max-w-[360px]", aspectClass: "aspect-[4/5]", color: "#222222" },
      { widthClass: "w-[24%] min-w-[150px] max-w-[200px]", aspectClass: "aspect-[2/3]", color: "#2e2e2e" },
      { widthClass: "w-[32%] min-w-[190px] max-w-[280px]", aspectClass: "aspect-[5/7]", color: "#F25C3D" },
      { widthClass: "w-[36%] min-w-[210px] max-w-[320px]", aspectClass: "aspect-[3/4]", color: "#181818" },
      { widthClass: "w-[28%] min-w-[170px] max-w-[240px]", aspectClass: "aspect-square", color: "#303030" },
    ],
  },
  {
    tags: ["Editorial", "Content", "Travel Blog"],
    titleBold: "The Scrapbookers:",
    colA:
      "A travel blog built to support storytelling through rich content, readable long-form layouts, and an editorial rhythm that feels personal.",
    colB:
      "The platform prioritises discoverability and ease of publishing, making it simple to add destinations, guides, and photo-led posts over time.",
    gallery: [
      { widthClass: "w-[38%] min-w-[220px] max-w-[340px]", aspectClass: "aspect-[4/5]", color: "#1c1c1c" },
      { widthClass: "w-[26%] min-w-[160px] max-w-[220px]", aspectClass: "aspect-[2/3]", color: "#BFE0DE" },
      { widthClass: "w-[34%] min-w-[200px] max-w-[300px]", aspectClass: "aspect-square", color: "#252525" },
      { widthClass: "w-[30%] min-w-[180px] max-w-[260px]", aspectClass: "aspect-[3/5]", color: "#2a2a2a" },
      { widthClass: "w-[22%] min-w-[140px] max-w-[190px]", aspectClass: "aspect-[2/3]", color: "#9484D2" },
    ],
  },
];

const Work = () => {
  return (
    <main className="min-h-screen bg-black text-white pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="max-w-5xl mb-20 md:mb-28">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
            Selected
            <br />
            <span className="font-semibold">case studies.</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-white leading-relaxed max-w-2xl">
            Each project follows a structured approach: understand the problem, define the strategy, design the solution, build it right.
          </p>
        </header>

        <div className="space-y-0">
          {caseStudies.map((study) => (
            <article key={study.titleBold} className="border-t border-white/10 first:border-t-0 pt-16 md:pt-24 pb-20 md:pb-28">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-start">
                <div className="xl:col-span-6">
                  <h2 className="text-2xl md:text-4xl lg:text-[2.35rem] font-light leading-snug tracking-tight text-white">
                    <span className="font-semibold">{study.titleBold}</span>
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-white/30 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="xl:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <p className="text-sm md:text-[15px] leading-[1.75] text-white">{study.colA}</p>
                  <p className="text-sm md:text-[15px] leading-[1.75] text-white">{study.colB}</p>
                </div>
              </div>

              <div
                className="mt-12 md:mt-16 flex flex-row flex-nowrap gap-3 md:gap-4 overflow-x-auto overflow-y-visible pb-2 -mx-6 px-6 lg:-mx-12 lg:px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {study.gallery.map((item, i) => (
                  <div
                    key={`${study.titleBold}-${i}`}
                    className={`shrink-0 overflow-hidden ${item.widthClass} ${item.aspectClass}`}
                  >
                    <div
                      className="h-full w-full min-h-[8rem]"
                      style={{ backgroundColor: item.color }}
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>

      <CallToAction sectionClassName="bg-black" />
    </main>
  );
};

export default Work;
