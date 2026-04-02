import { motion } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";

// First batch (5 original photos)
import gymFloorImg from "@/assets/gallery-gym-floor.jpg";
import washroomImg from "@/assets/gallery-washroom.jpg";
import changingRoomImg from "@/assets/gallery-changing-room.jpg";
import yogaStudioImg from "@/assets/gallery-yoga-studio.jpg";
import cardioImg from "@/assets/gallery-cardio.jpg";

// Second batch (5 new photos)
import exteriorImg1 from "@/assets/gallery-exterior-1.jpg";
import spinBikesImg from "@/assets/gallery-spin-bikes.jpg";
import exteriorImg2 from "@/assets/gallery-exterior-2.jpg";
import billiardsImg from "@/assets/gallery-billiards.jpg";
import studio2Img from "@/assets/gallery-studio-2.jpg";

const images = [
  { src: gymFloorImg,    alt: "CR Fitness main gym floor with machines" },
  { src: cardioImg,      alt: "CR Fitness cardio area with treadmills" },
  { src: spinBikesImg,   alt: "CR Fitness spin bikes area" },
  { src: billiardsImg,   alt: "CR Fitness billiards & recreation area" },
  { src: yogaStudioImg,  alt: "CR Fitness yoga and dance studio" },
  { src: studio2Img,     alt: "CR Fitness studio with circular lights" },
  { src: changingRoomImg,alt: "CR Fitness changing room with lockers" },
  { src: washroomImg,    alt: "CR Fitness washroom facilities" },
  { src: exteriorImg1,   alt: "CR Fitness building exterior" },
  { src: exteriorImg2,   alt: "CR Fitness building exterior front view" },
];

/* ─── Mobile carousel ─────────────────────────────────────── */
const MobileCarousel = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full select-none">
      {/* Slide */}
      <div
        className="overflow-hidden rounded-xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="min-w-full aspect-[4/3]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
        aria-label="Next image"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-center text-sm text-white/40 mt-2">
        {current + 1} / {images.length}
      </p>
    </div>
  );
};

/* ─── Desktop masonry grid ────────────────────────────────── */
const DesktopGrid = () => (
  <div className="grid grid-cols-3 gap-3 auto-rows-[200px]">
    {images.map((img, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.07 }}
        className={`overflow-hidden rounded-lg group cursor-pointer ${
          i === 0 ? "col-span-2 row-span-2" : ""
        } ${i === 5 ? "col-span-2" : ""}`}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </motion.div>
    ))}
  </div>
);

/* ─── Section ─────────────────────────────────────────────── */
const GallerySection = () => {
  return (
    <SectionWrapper className="bg-gradient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Our Facility</p>
          <h2 className="text-4xl md:text-6xl font-heading">
            WORKOUT <span className="text-gradient-primary">GALLERY</span>
          </h2>
          <p className="text-white/50 mt-3 text-sm md:hidden">Swipe to explore</p>
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop: masonry grid */}
        <div className="hidden md:block">
          <DesktopGrid />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default GallerySection;
