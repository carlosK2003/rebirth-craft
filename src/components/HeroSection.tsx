import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import logoBmn from "@/assets/logo-bmn.png";
import slide1 from "@/assets/hero-slide-1.webp";
import slide2 from "@/assets/hero-slide-2.webp";
import slide3 from "@/assets/hero-slide-3.webp";
import slide4 from "@/assets/hero-slide-4.webp";
import slide5 from "@/assets/hero-slide-5.webp";
import slide6 from "@/assets/hero-slide-6.webp";
import slide7 from "@/assets/hero-slide-7.webp";
import slide8 from "@/assets/hero-slide-8.webp";
import slide9 from "@/assets/hero-slide-9.webp";
import slide10 from "@/assets/hero-slide-10.webp";
import dSlide1 from "@/assets/hero-desktop-1.webp";
import dSlide2 from "@/assets/hero-desktop-2.webp";
import dSlide3 from "@/assets/hero-desktop-3.webp";
import dSlide4 from "@/assets/hero-desktop-4.webp";
import dSlide5 from "@/assets/hero-desktop-5.webp";
import dSlide6 from "@/assets/hero-desktop-6.webp";
import dSlide7 from "@/assets/hero-desktop-7.webp";
import dSlide8 from "@/assets/hero-desktop-8.webp";
import dSlide9 from "@/assets/hero-desktop-9.webp";
import dSlide10 from "@/assets/hero-desktop-10.webp";

const mobileSlides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10];
const desktopSlides = [dSlide1, dSlide2, dSlide3, dSlide4, dSlide5, dSlide6, dSlide7, dSlide8, dSlide9, dSlide10];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % mobileSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const sectionHeight = sectionRef.current.offsetHeight;
        if (scrollY <= sectionHeight) {
          setParallaxY(scrollY * 0.5);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mobile/Tablet slideshow (hidden on desktop) */}
      <div className="absolute inset-0 lg:hidden will-change-transform" style={{ transform: `translateY(${parallaxY}px)`, height: '120%', top: '-10%' }}>
        {mobileSlides.map((src, i) => (
          <img
            key={`mobile-${i}`}
            src={src}
            alt={`BMN ambiente ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Desktop slideshow (hidden on mobile/tablet) */}
      <div className="absolute inset-0 hidden lg:block">
        {desktopSlides.map((src, i) => (
          <img
            key={`desktop-${i}`}
            src={src}
            alt={`BMN ambiente desktop ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
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
