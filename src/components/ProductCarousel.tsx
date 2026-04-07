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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const speedPx = 1.2; // px per frame (~60fps → ~72px/s)
  const halfWidth = useRef(0);

  useLayoutEffect(() => {
    if (trackRef.current) {
      halfWidth.current = trackRef.current.scrollWidth / 2;
    }
  }, [images]);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (!isDragging.current) {
        offsetRef.current -= speedPx;
      }
      if (halfWidth.current > 0 && Math.abs(offsetRef.current) >= halfWidth.current) {
        offsetRef.current += halfWidth.current;
      }
      if (offsetRef.current > 0 && halfWidth.current > 0) {
        offsetRef.current -= halfWidth.current;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    offsetRef.current = dragStartOffset.current + (e.clientX - dragStartX.current);
  };
  const onPointerUp = () => {
    isDragging.current = false;
  };

  const doubled = [...images, ...images];
  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ transform: "translateX(0px)" }}>
        {doubled.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] h-[200px] rounded-sm overflow-hidden">
            <img src={img} alt={`${alt} ${(i % images.length) + 1}`} className="w-full h-full object-cover pointer-events-none" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
};
