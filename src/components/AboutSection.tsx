import { useCallback } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight } from "lucide-react";

import studioPhoto from "@/assets/gallery-studio-2.jpg";
import gymFloorPhoto from "@/assets/gallery-gym-floor.jpg";
import billiardsPhoto from "@/assets/gallery-billiards.jpg";
import receptionPhoto from "@/assets/gallery-reception.jpg";

const galleryImages = [
  { src: receptionPhoto, alt: "Reception Area" },
  { src: studioPhoto, alt: "Yoga Studio" },
  { src: gymFloorPhoto, alt: "Gym Floor" },
  { src: billiardsPhoto, alt: "Billiards Area" },
];

const AboutSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <SectionWrapper id="about" className="bg-gradient-dark-reverse">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Our Story</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading mb-5">
              MORE THAN A <span className="text-gradient-primary">GYM</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              Founded with a vision to create the ultimate fitness experience, CR Fitness has been transforming lives
              for over 12 years. Our state-of-the-art facility combines cutting-edge equipment with expert coaching
              to help you achieve results you never thought possible.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We believe fitness is a lifestyle, not a destination. From first-timers to competitive athletes,
              CR Fitness is your home for growth, strength, and community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mt-4 lg:mt-0 group"
          >
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {galleryImages.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full object-cover aspect-square"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Next Button - Visible in right > only */}
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm z-10 hover:bg-primary transition-colors focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute inset-0 rounded-lg border border-primary/20 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-lg border border-primary/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;

