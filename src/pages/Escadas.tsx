import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Marquee } from "@/components/ProductCarousel";

import ep1 from "@/assets/escada-1.webp";
import ep2 from "@/assets/escada-2.webp";
import ep3 from "@/assets/escada-3.webp";
import ep4 from "@/assets/escada-4.webp";
import ep5 from "@/assets/escada-5.webp";
import ep6 from "@/assets/escada-6.webp";
import ep7 from "@/assets/escada-7.webp";
import ep8 from "@/assets/escada-8.webp";
import ep9 from "@/assets/escada-9.webp";
import ep10 from "@/assets/escada-10.webp";

const projetos = [ep1, ep2, ep3, ep4, ep5, ep6, ep7, ep8, ep9, ep10];

const Escadas = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-20" />
      <section className="py-14 lg:py-20" ref={ref}>
        <div className="container mx-auto px-4 lg:px-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
            <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Escadas <span className="text-accent italic">BMN</span>
            </h1>
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground mb-2">
              Cada degrau pode dizer muito sobre o seu estilo.
            </h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
              Escadas em madeiras nobres que unem segurança, durabilidade e elegância aos seus ambientes.
            </p>
          </motion.div>
        </div>
        <Marquee images={projetos} alt="Projeto escada" />
      </section>
      <section className="py-14 lg:py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <button onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }); }, 300); }} className="px-8 py-4 bg-accent text-accent-foreground font-sans font-semibold text-sm uppercase tracking-widest hover:bg-gold-light transition-all duration-300 rounded-sm inline-block">VOLTAR AO CATÁLOGO</button>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Escadas;
