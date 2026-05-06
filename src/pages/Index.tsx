import Hero from "@/components/home/Hero";
import MockupSection from "@/components/home/MockupSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import WorkPreview from "@/components/home/WorkPreview";
import LatestNews from "@/components/home/LatestNews";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <main>
      <Hero />
      <MockupSection />
      <ServicesPreview />
      <WorkPreview />
      <LatestNews />
      <CallToAction />
    </main>
  );
};

export default Index;
