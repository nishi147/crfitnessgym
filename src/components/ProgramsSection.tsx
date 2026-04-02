import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import strengthImg from "@/assets/program-strength.jpg";
import cardioImg from "@/assets/program-cardio.jpg";
import bodyImg from "@/assets/program-bodybuilding.jpg";
import yogaImg from "@/assets/program-yoga.jpg";


const programs = [
  { title: "Strength Training", desc: "Build raw power with compound lifts and progressive overload.", image: strengthImg },
  { title: "Cardio & HIIT", desc: "Torch calories and boost endurance with high-intensity intervals.", image: cardioImg },
  { title: "Bodybuilding", desc: "Sculpt your physique with hypertrophy-focused training.", image: bodyImg },
  { title: "Yoga & Mobility", desc: "Improve flexibility, recovery, and mental clarity.", image: yogaImg },
];

const ProgramsSection = () => {
  return (
    <SectionWrapper id="programs" className="bg-gradient-dark-reverse relative overflow-hidden">
      {/* Spinning ring decoration */}
      <motion.div
        className="absolute -right-20 top-20 w-40 h-40 rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -left-10 bottom-20 w-28 h-28 rounded-full border border-neon-blue/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Our Programs</p>
          <h2 className="text-4xl md:text-6xl font-heading">
            FIND YOUR <span className="text-gradient-primary">PROGRAM</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden aspect-[3/4] sm:aspect-[3/4] group cursor-pointer"
            >
              <motion.img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {/* Living pulse ring */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-primary/40"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-heading mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProgramsSection;
