import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import WorkPreview from "@/components/home/WorkPreview";
import ProcessPreview from "@/components/home/ProcessPreview";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <WorkPreview />
      <ProcessPreview />
      <CallToAction />
    </main>
  );
};

export default Index;
