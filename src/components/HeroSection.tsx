import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoBmn from "@/assets/logo-bmn.png";

import heroDesktop1 from "@/assets/hero-desktop-1.webp";
import heroDesktop2 from "@/assets/hero-desktop-2.webp";
import heroDesktop3 from "@/assets/hero-desktop-3.webp";
import heroDesktop4 from "@/assets/hero-desktop-4.webp";
import heroDesktop5 from "@/assets/hero-desktop-5.webp";
import heroDesktop6 from "@/assets/hero-desktop-6.webp";
import heroDesktop7 from "@/assets/hero-desktop-7.webp";
import heroDesktop8 from "@/assets/hero-desktop-8.webp";
import heroDesktop9 from "@/assets/hero-desktop-9.webp";
import heroDesktop10 from "@/assets/hero-desktop-10.webp";

const desktopImages = [
  heroDesktop1, heroDesktop2, heroDesktop3, heroDesktop4, heroDesktop5,
  heroDesktop6, heroDesktop7, heroDesktop8, heroDesktop9, heroDesktop10,
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Desktop: Cross-dissolve image slideshow */}
      <div className="absolute inset-0 hidden lg:block">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentIndex}
            src={desktopImages[currentIndex]}
            alt="BMN madeiras nobres"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Mobile/Tablet: Video loop */}
      <div className="absolute inset-0 lg:hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-dark/70 via-wood-dark/50 to-wood-dark/80" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <img
            src={logoBmn}
            alt="BMN – Brasil Madeiras Nobre logo"
            className="w-64 md:w-80 lg:w-96 mb-6 drop-shadow-2xl -mt-24"
          />
          <p className="text-cream/90 font-sans text-base md:text-lg tracking-wide mb-12 max-w-xl">
            Explore nossa variedade, onde a essência da natureza se transforma em sofisticação e elegância no seu ambiente.
          </p>
          <div className="flex justify-center mt-24">
            <button
              onClick={() => scrollTo("#produtos")}
              className="px-8 py-4 bg-accent text-accent-foreground font-sans font-semibold text-sm uppercase tracking-widest hover:bg-gold-light transition-all duration-300 rounded-sm"
            >
              EXPLORAR CATÁLOGO
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-cream/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
