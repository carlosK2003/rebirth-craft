import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
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
            {keywords.map((word, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="font-serif text-sm md:text-base tracking-[0.15em] uppercase text-accent/80">{word}</span>
                {i < keywords.length - 1 && (
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
          className="mb-16 max-w-4xl mx-auto"
        >
          <img
            src={aboutImg}
            alt="Textura de madeira nobre brasileira"
            className="hidden md:block w-full h-[400px] lg:h-[500px] object-cover rounded-sm"
            loading="lazy"
          />
          <div className="md:hidden overflow-hidden rounded-sm h-[350px]">
            <div className="flex animate-marquee-about h-full w-max">
              {[...mobileImages, ...mobileImages].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Equipe BMN ${(i % 3) + 1}`}
                  className="h-full w-[280px] object-cover flex-shrink-0"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
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
          <div className="text-center mb-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 font-serif text-sm tracking-wide text-accent/80 hover:text-accent transition-colors duration-300 group"
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
                  Nossos produtos — Decks, Assoalhos, Forros, Painéis, Escadas e peças S4S — são idealizados para arquitetos, decoradores, projetistas e revendedores que buscam materiais que elevem o projeto a uma obra de arte. Seja em ambientes internos ou externos, cada solução da BMN é pensada para criar espaços que inspiram, acolhem e resistem ao tempo sem perder sua sofisticação natural.
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed mb-6 text-base">
                  Presentes em todo o território nacional, atendemos diretamente os mais exigentes projetos de arquitetura e construção civil em qualquer região do Brasil e fornecemos materiais premium para os principais revendedores do setor, garantindo exclusividade, qualidade e pontualidade em escala nacional.
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
