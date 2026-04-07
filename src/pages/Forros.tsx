import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ProductCarousel, Marquee } from "@/components/ProductCarousel";

import forroTauari from "@/assets/forro-tauari.jpg";
import forroCumaru from "@/assets/forro-cumaru.jpg";
import fp1 from "@/assets/forro-projeto-1.webp";
import fp2 from "@/assets/forro-projeto-2.webp";
import fp3 from "@/assets/forro-projeto-3.webp";
import fp4 from "@/assets/forro-projeto-4.webp";
import fp5 from "@/assets/forro-projeto-5.webp";
import fp6 from "@/assets/forro-projeto-6.webp";
import fp7 from "@/assets/forro-projeto-7.webp";
import fp8 from "@/assets/forro-projeto-8.webp";
import fp9 from "@/assets/forro-projeto-9.webp";
import fp10 from "@/assets/forro-projeto-10.webp";

const forroSpecies = [
  { name: "Tauari", image: forroTauari, desc: "Cor clara e uniforme, conforto térmico e acústico." },
];

const projetos = [fp1, fp2, fp3, fp4, fp5, fp6, fp7, fp8, fp9, fp10];

const Forros = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projetosRef = useRef(null);
  const projetosInView = useInView(projetosRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-20" />
      <section className="py-14 lg:py-20 bg-card" ref={projetosRef}>
        <div className="container mx-auto px-4 lg:px-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={projetosInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
            <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Projetos e o Poder da <span className="text-accent italic">Madeira Nobre</span>
            </h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto">Tetos que ganham vida e personalidade com forros de madeira nobre BMN.</p>
          </motion.div>
        </div>
        <Marquee images={projetos} alt="Projeto forro" />
      </section>
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <a href="/#produtos" className="px-8 py-4 bg-accent text-accent-foreground font-sans font-semibold text-sm uppercase tracking-widest hover:bg-gold-light transition-all duration-300 rounded-sm inline-block">VOLTAR AO CATÁLOGO</a>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Forros;
