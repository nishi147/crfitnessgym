import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VideoTourSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-zinc-950 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 uppercase">
            Experience CR Fitness
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Take a virtual tour of our state-of-the-art facility and see where champions are made.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/50 group"
        >
          {/* Subtle Glow Behind Video */}
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-50 pointer-events-none" />

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            src="/Video-315.mp4"
            loop
            muted={isMuted}
            playsInline
            onClick={togglePlay}
          />

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="text-white hover:text-red-500 transition-colors bg-white/10 p-2 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>

            <div className="w-px h-6 bg-white/20" /> {/* Separator */}

            <button
              onClick={toggleMute}
              className="text-white hover:text-red-500 transition-colors bg-white/10 p-2 rounded-full"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Big Play Button Overlay (Visible only when paused) */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer pointer-events-none"
              onClick={togglePlay}
            >
              <div className="bg-red-600/90 hover:bg-red-600 w-20 h-20 rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-transform hover:scale-110 pointer-events-auto">
                <Play className="w-10 h-10 text-white fill-current" />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTourSection;
