import mockupWebsite from "@/assets/mockup-website.jpg";

const MockupSection = () => {
  return (
    <section className="py-8 md:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0D0D0D]">
          <img
            src={mockupWebsite}
            alt="Pendolo studio website displayed on a MacBook Pro against a dark studio backdrop"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MockupSection;
