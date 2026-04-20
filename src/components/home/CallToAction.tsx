import { Link } from "react-router-dom";
import phoneSticker from "@/assets/phone-sticker.png";

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
            width={768}
            height={1024}
            className="hidden md:block absolute -left-6 lg:-left-10 top-1/2 -translate-y-1/2 w-40 lg:w-52 rotate-[-8deg] pointer-events-none select-none"
          />

          {/* "It's Free!" sticker - top right */}
          <div className="absolute -top-6 right-6 md:-top-8 md:right-10 rotate-[12deg] pointer-events-none">
            <svg viewBox="0 0 120 120" className="w-20 md:w-28 h-20 md:h-28">
              <path
                d="M60 4 L68 14 L80 8 L82 22 L96 22 L92 36 L106 42 L96 52 L108 62 L94 68 L102 82 L88 84 L88 98 L74 92 L68 106 L58 96 L46 108 L42 94 L28 96 L30 82 L16 78 L24 66 L12 58 L24 50 L14 38 L28 36 L26 22 L40 24 L44 10 L54 16 Z"
                fill="#F5F0DC"
                stroke="#0D0D0D"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <text
                x="60"
                y="58"
                textAnchor="middle"
                fill="#0D0D0D"
                style={{
                  fontFamily: "'Caveat', 'Patrick Hand', cursive",
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                IT'S
              </text>
              <text
                x="60"
                y="78"
                textAnchor="middle"
                fill="#0D0D0D"
                style={{
                  fontFamily: "'Caveat', 'Patrick Hand', cursive",
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                FREE!
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
