import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import aboutImg from "@/assets/about-wood.webp";
import aboutMobile1 from "@/assets/about-mobile-1.webp";
import aboutMobile2 from "@/assets/about-mobile-2.webp";
import aboutMobile3 from "@/assets/about-mobile-3.webp";
import { Shield, Leaf, Award, ChevronDown } from "lucide-react";

const features = [
  { icon: Shield, title: "Procedência Certificada", desc: "Madeiras com documentação legal e certificação de origem sustentável." },
  { icon: Leaf, title: "Sustentabilidade", desc: "Compromisso com o manejo florestal responsável e a preservação ambiental." },
  { icon: Award, title: "Qualidade Premium", desc: "Rigoroso controle de qualidade em cada peça, do corte ao acabamento final." },
];

const mobileImages = [aboutMobile1, aboutMobile2, aboutMobile3];

const keywords = ["Nobreza", "Elegância", "Sofisticação", "Requinte", "Durabilidade", "Legado"];
const keywordsWithPaixao = [...keywords, "Paixão"];

const AboutMarquee = ({ images }: { images: string[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const halfWidth = useRef(0);

  useLayoutEffect(() => {
    if (trackRef.current) {
      halfWidth.current = trackRef.current.scrollWidth / 2;
    }
  }, [images]);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (!isDragging.current) offsetRef.current -= 0.8;
      if (halfWidth.current > 0 && Math.abs(offsetRef.current) >= halfWidth.current) offsetRef.current += halfWidth.current;
      if (offsetRef.current > 0 && halfWidth.current > 0) offsetRef.current -= halfWidth.current;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
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
  const onPointerUp = () => { isDragging.current = false; };

  const doubled = [...images, ...images];
  return (
    <div
      className="md:hidden overflow-hidden rounded-sm h-[350px] cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={trackRef} className="flex h-full w-max will-change-transform" style={{ transform: "translateX(0px)" }}>
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Equipe BMN ${(i % images.length) + 1}`}
            className="h-full w-[280px] object-cover flex-shrink-0"
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();
  const activeKeywords = isMobile ? keywords : keywordsWithPaixao;

  return (
    <section id="sobre" className="py-14 lg:py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Sobre a <span className="text-accent italic">BMN</span>
          </h2>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mt-6">
            {activeKeywords.map((word, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="font-serif text-sm md:text-base tracking-[0.15em] uppercase text-accent/80">{word}</span>
                {i < activeKeywords.length - 1 && (
                  <span className="text-accent/40 text-xs">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-10 max-w-4xl mx-auto -mt-2"
        >
          <img
            src={aboutImg}
            alt="Textura de madeira nobre brasileira"
            className="hidden md:block w-full h-[400px] lg:h-[500px] object-cover rounded-sm"
            loading="lazy"
          />
          <AboutMarquee images={mobileImages} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-muted-foreground font-sans leading-relaxed mb-6 text-base">
            A BMN – Brasil Madeiras Nobre nasce da paixão pela nobreza da madeira e do compromisso em transformar a matéria-prima da natureza em expressão de elegância e sofisticação. Com sede em Curitiba - PR, dedicamo-nos à seleção criteriosa, ao beneficiamento refinado e à entrega das mais distintas espécies, revelando em cada peça a beleza autêntica do Brasil e do mundo.
          </p>
          <p className="text-muted-foreground font-sans leading-relaxed mb-6 text-base">
            Trabalhamos com madeiras nobres nacionais e importadas, escolhidas com rigor para oferecer não apenas estética marcante, mas também durabilidade excepcional — uma harmonia perfeita entre a força da natureza e o requinte atemporal.
          </p>

          {/* Reveal button */}
          <div className="text-left mb-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-accent font-sans text-sm font-medium uppercase tracking-wider hover:text-accent/80 transition-colors duration-300 group"
            >
              <span>{expanded ? "Ocultar detalhes" : "Revelar mais sobre a BMN"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Expandable content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground font-sans leading-relaxed mb-6 text-base">
                  Nossos produtos — Decks, Assoalhos, Forros, Painéis, Escadas, Portas e Peças S4S — são idealizados para arquitetos, decoradores, projetistas e revendedores que buscam transformar cada ambiente em uma verdadeira obra de arte, unindo estética, durabilidade e sofisticação em soluções que valorizam tanto espaços internos quanto externos com elegância atemporal; presentes em todo o território nacional, atendemos projetos de alto padrão com materiais premium que asseguram exclusividade, excelência e precisão em cada entrega.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 bg-background rounded-sm">
                <f.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
