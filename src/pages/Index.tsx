import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GymTimingBanner from "@/components/GymTimingBanner";

import AboutSection from "@/components/AboutSection";
import VideoTourSection from "@/components/VideoTourSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProgramsSection from "@/components/ProgramsSection";
import FreeTrialBanner from "@/components/FreeTrialBanner";
import TrainersSection from "@/components/TrainersSection";
import GallerySection from "@/components/GallerySection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScheduleSection from "@/components/ScheduleSection";
import EquipmentSection from "@/components/EquipmentSection";
import NutritionSection from "@/components/NutritionSection";

import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <GymTimingBanner />

      <AboutSection />
      <VideoTourSection />
      <WhyChooseUs />
      <ProgramsSection />
      <FreeTrialBanner />
      <TrainersSection />
      <GallerySection />
      <PricingSection />
      <TestimonialsSection />
      <ScheduleSection />
      <EquipmentSection />
      <NutritionSection />

      <FAQSection />
      <CTASection />

      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
