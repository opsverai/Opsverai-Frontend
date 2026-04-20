import Navbar from "@/components/landing/Navbar";
import OpsveraiHero from "@/components/landing/OpsveraiHero";
import CoreFeatures from "@/components/landing/CoreFeatures";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip pl-[max(0px,env(safe-area-inset-left))] pr-[max(0px,env(safe-area-inset-right))] [&_section]:scroll-mt-[5.25rem] sm:[&_section]:scroll-mt-[4.5rem]">
      <Navbar />
      <OpsveraiHero />
      <CoreFeatures />
      <WhyChooseUs />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
