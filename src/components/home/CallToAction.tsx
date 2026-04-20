import { Link } from "react-router-dom";
import phoneSticker from "@/assets/sticker-phone.png";
import freeSticker from "@/assets/sticker-its-free.png";

const CallToAction = () => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative bg-[#0D0D0D] rounded-[28px] md:rounded-[40px] px-6 md:px-16 py-14 md:py-20 overflow-visible">
          {/* Numbered prompts */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8 md:mb-10 text-white text-sm md:text-base">
            <span className="flex items-center gap-2.5">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white text-[#0D0D0D] flex items-center justify-center text-[10px] md:text-xs font-semibold">
                1
              </span>
              Too many options?
            </span>
            <span className="flex items-center gap-2.5">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white text-[#0D0D0D] flex items-center justify-center text-[10px] md:text-xs font-semibold">
                2
              </span>
              No idea what to pick?
            </span>
          </div>

          {/* Big display headline */}
          <h2
            className="text-center text-[22vw] md:text-[14rem] lg:text-[16rem] leading-[0.85] tracking-tight"
            style={{
              color: "#F5B6CD",
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            Call us!
          </h2>

          {/* CTA pill bottom-right */}
          <div className="flex justify-center md:justify-end mt-10 md:mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center px-7 md:px-9 py-3 md:py-3.5 rounded-full text-sm md:text-base text-[#0D0D0D] hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F5B6CD" }}
            >
              Book an Intro Call
            </Link>
          </div>

          {/* Phone sticker - left side */}
          <img
            src={phoneSticker}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="hidden md:block absolute -left-10 lg:-left-16 top-1/2 -translate-y-1/2 w-44 lg:w-60 rotate-[-10deg] pointer-events-none select-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
          />

          {/* "It's Free!" sticker - top right */}
          <img
            src={freeSticker}
            alt="It's free"
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute -top-10 right-4 md:-top-14 md:right-8 w-24 md:w-32 lg:w-36 rotate-[14deg] pointer-events-none select-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
