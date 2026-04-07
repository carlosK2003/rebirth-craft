import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Ana Paula Ferreira", role: "Designer de Interiores", text: "Já fiz diversos projetos em parceria com a BMN e sempre indico aos meus clientes. Desde o primeiro momento eles auxiliam e entregam o prometido, além de que, o resultado final sempre fica impressionante, rendendo diversos elogios." },
  { name: "Carlos Eduardo Silva", role: "Proprietário Residencial", text: "Conheci a BMN após visitar a casa de um amigo e perguntar quem havia feito o piso de sua casa, me impressionei com a qualidade e brilho. Quis inclusive o mesmo piso de madeira Cumaru na minha casa. Faz 3 anos já e continuo feliz com o resultado e entrega." },
  { name: "Ricardo Mendes", role: "Arquiteto, Curitiba", text: "A qualidade das madeiras da BMN me surpreendeu. O piso de Ipê que instalamos no projeto superou todas as expectativas do cliente. Acabamento de ótima qualidade." },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setResetKey((k) => k + 1);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleNext = useCallback(() => { next(); setResetKey((k) => k + 1); }, [next]);
  const handlePrev = useCallback(() => { prev(); setResetKey((k) => k + 1); }, [prev]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, resetKey]);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
  };

  return (
    <section className="py-14 lg:py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que dizem nossos <span className="text-accent italic">clientes</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:border-accent transition-colors z-10" aria-label="Anterior">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:border-accent transition-colors z-10" aria-label="Próximo">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="bg-background rounded-sm p-8 md:p-10 border border-border text-center"
          >
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="font-sans text-muted-foreground leading-relaxed mb-8 text-base italic">"{t.text}"</p>
            <p className="font-serif font-semibold text-foreground text-lg">{t.name}</p>
            <p className="font-sans text-xs text-muted-foreground mt-1">{t.role}</p>
          </motion.div>

          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-accent w-6" : "bg-border hover:bg-muted-foreground"}`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
