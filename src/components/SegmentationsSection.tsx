import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import grupoBmnLogo from "@/assets/grupo-bmn-logo.png";
import maderattoLogo from "@/assets/maderatto-logo.png";
import grupoBmnBg from "@/assets/grupo-bmn-bg.webp";

const SegmentationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="segmentacoes" className="py-14 lg:py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Grupo BMN | <span className="text-accent italic">Do Projeto à Execução</span>
          </h2>
        </motion.div>

        {/* Hero-style background with logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full rounded-sm overflow-hidden mb-14"
        >
          <div className="relative w-full aspect-[14/9] md:aspect-[18/9]">
            <img
              src={grupoBmnBg}
              alt="Projeto arquitetônico com madeira nobre BMN"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-wood-dark/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 md:gap-10 px-6">
              <img
                src={grupoBmnLogo}
                alt="BMN – Brasil Madeiras Nobre"
                className="w-40 md:w-56 lg:w-64 object-contain drop-shadow-lg"
              />
              <img
                src={maderattoLogo}
                alt="Maderatto Pisos & Revestimentos"
                className="w-36 md:w-48 lg:w-56 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Visible text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl mx-auto text-left -mt-4"
        >
          <p className="text-muted-foreground font-sans leading-relaxed mb-6">
            No <span className="font-bold" style={{ color: "#BF9540" }}>Grupo BMN</span>, cada etapa é conduzida com precisão. A execução fica sob responsabilidade da <span className="font-bold" style={{ color: "#BF9540" }}>Maderatto Pisos e Revestimentos</span>, especializada em obras e instalações em madeira, garantindo que a matéria-prima nobre seja aplicada com o mesmo nível de excelência com que foi selecionada.
          </p>
          <p className="text-muted-foreground font-sans leading-relaxed mb-10">
            O resultado é uma operação integrada, onde conceito, material e execução se conectam de forma fluida e consistente.
          </p>

          {/* Reveal button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-accent font-sans text-sm font-medium uppercase tracking-wider hover:text-accent/80 transition-colors duration-300 group"
          >
            <span>{expanded ? "Ocultar detalhes" : "Revelar mais sobre o Grupo BMN"}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>

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
                <div className="pt-10 text-left max-w-2xl mx-auto space-y-10">
                  {/* Integração */}
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">Integração de Alto Padrão</h3>
                    <ul className="space-y-2 text-muted-foreground font-sans text-sm leading-relaxed">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />Curadoria refinada de madeiras pela BMN</li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />Execução conduzida com rigor técnico pela Maderatto Pisos e Revestimentos</li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />Integração plena entre fornecimento e aplicação</li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />Acompanhamento minucioso em todas as fases do projeto</li>
                    </ul>
                  </div>

                  {/* Diferenciais */}
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">Diferenciais</h3>
                    <ul className="space-y-2 text-muted-foreground font-sans text-sm leading-relaxed">
                      <li>✔ Precisão na aplicação de materiais nobres</li>
                      <li>✔ Acabamentos que valorizam cada detalhe do ambiente</li>
                      <li>✔ Processos integrados com alto nível de controle</li>
                      <li>✔ Execução alinhada ao conceito original do projeto</li>
                    </ul>
                  </div>

                  {/* Compromisso */}
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">Compromisso com a Excelência</h3>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
                      Cada projeto é tratado de forma singular, respeitando a identidade do ambiente e as características naturais da madeira.
                    </p>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                      A atenção aos detalhes, aliada ao domínio técnico, garante resultados que vão além da funcionalidade — entregando sofisticação, harmonia e longevidade.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SegmentationsSection;
