import { HeroClient } from "./HeroClient";

export const Hero = () => {
  return (
    <section
      data-pendolo-hero
      className="relative min-h-svh overflow-hidden bg-[#F25C3D] text-black"
    >
      <HeroClient />

      <div className="relative z-10 flex min-h-svh flex-col px-5 pb-24 pt-24 md:px-8 md:pb-28 md:pt-28 lg:px-12 lg:pt-32">
        <div className="mt-auto md:mb-auto flex justify-end">
          <h1 className="max-w-xl text-left text-[clamp(1.5rem,2.25vw,2.1rem)] font-normal leading-[1.07] tracking-tight md:max-w-[40rem]">
            <span className="font-light italic">Branding</span>, web design and{" "}
            <span className="font-semibold">development</span> for businesses
            that value a different point of view.
          </h1>
        </div>
      </div>
    </section>
  );
};
