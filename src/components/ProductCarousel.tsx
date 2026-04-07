import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselSlide {
  name: string;
  image: string;
  desc: string;
}

export const ProductCarousel = ({ items, title }: { items: CarouselSlide[]; title: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const next = useCallback(() => { setDirection(1); setCurrent((p) => (p + 1) % items.length); }, [items.length]);
  const prevSlide = useCallback(() => { setDirection(-1); setCurrent((p) => (p - 1 + items.length) % items.length); }, [items.length]);
  const goTo = useCallback((i: number) => { setDirection(i > current ? 1 : -1); setCurrent(i); setResetKey((k) => k + 1); }, [current]);
  const handleNext = useCallback(() => { next(); setResetKey((k) => k + 1); }, [next]);
  const handlePrev = useCallback(() => { prevSlide(); setResetKey((k) => k + 1); }, [prevSlide]);

  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [next, resetKey]);

  const item = items[current];
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
  };

  return (
    <div ref={ref}>
      {title && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-10">
          <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{title}</h2>
        </motion.div>
      )}

      <div className="max-w-2xl mx-auto relative">
        <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:border-accent transition-colors z-10" aria-label="Anterior">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:border-accent transition-colors z-10" aria-label="Próximo">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" transition={{ duration: 0.45, ease: "easeOut" }} className="bg-card rounded-sm border border-border overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="p-6 text-center">
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">{item.name}</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>

        <div className="flex gap-2 justify-center mt-6">
          {items.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-accent w-6" : "bg-border hover:bg-muted-foreground"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Marquee = ({ images, alt }: { images: string[]; alt: string }) => {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <motion.div className="flex gap-4" animate={{ x: [0, -(images.length * 308)] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
        {doubled.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] h-[200px] rounded-sm overflow-hidden">
            <img src={img} alt={`${alt} ${(i % images.length) + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
