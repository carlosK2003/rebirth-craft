import { motion } from "framer-motion";
import logoBmn from "@/assets/logo-bmn.png";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/JnxPbjofIXY?autoplay=1&mute=1&loop=1&playlist=JnxPbjofIXY&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&start=0"
            title="BMN Video Background"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "300vw",
              height: "300vh",
              minWidth: "100%",
              minHeight: "100%",
              border: "none",
            }}
          />
        </div>
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
