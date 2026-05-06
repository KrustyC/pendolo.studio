import { Link } from "react-router-dom";
import freeSticker from "@/assets/sticker-its-free.png";

const CallToAction = ({
  sectionClassName,
  containerClassName,
}: {
  sectionClassName?: string;
  /** Override inner horizontal padding (e.g. match global footer snug layout). */
  containerClassName?: string;
}) => {
  return (
    <section className={`${sectionClassName ?? "bg-background"} py-16 md:py-20`}>
      <div className={containerClassName ?? "container mx-auto px-6 lg:px-12"}>
        <div className="relative overflow-visible rounded-2xl bg-[#43CCBC] px-6 py-8 md:rounded-3xl md:px-12 md:py-10">
          <h2 className="max-w-3xl text-balance text-left text-2xl font-light leading-snug tracking-tight text-[#0D0D0D] sm:text-3xl md:text-4xl lg:text-[2.35rem]">
            If you still have your doubts but are curious to know us, set up a free call.
          </h2>

          <div className="mt-6 flex justify-start md:mt-7">
            <Link to="/contact" className="cta-marketing">
              Book an Intro Call
            </Link>
          </div>

          {/* "It's Free!" sticker - top right */}
          <img
            src={freeSticker}
            alt="It's free"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -top-8 right-3 w-20 rotate-[14deg] select-none drop-shadow-[0_6px_16px_rgba(13,13,13,0.2)] md:-top-10 md:right-6 md:w-24 lg:w-28"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
