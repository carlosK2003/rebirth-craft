import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ProductCarousel, Marquee } from "@/components/ProductCarousel";

import deckItauba from "@/assets/deck-itauba.webp";
import deckIpeOliva from "@/assets/deck-ipe-oliva.webp";
import deckGarapeira from "@/assets/deck-garapeira.webp";
import deckCumaruChampagne from "@/assets/deck-cumaru-champagne.webp";
import deckCumaruRosa from "@/assets/deck-cumaru-rosa.webp";
import deckIpe from "@/assets/deck-ipe.webp";
import dp1 from "@/assets/deck-projeto-1.webp";
import dp2 from "@/assets/deck-projeto-2.webp";
import dp3 from "@/assets/deck-projeto-3.webp";
import dp4 from "@/assets/deck-projeto-4.webp";
import dp5 from "@/assets/deck-projeto-5.webp";
import dp6 from "@/assets/deck-projeto-6.webp";
import dp7 from "@/assets/deck-projeto-7.webp";
import dp8 from "@/assets/deck-projeto-8.webp";
import dp9 from "@/assets/deck-projeto-9.webp";
import dp10 from "@/assets/deck-projeto-10.webp";

const deckSpecies = [
  { name: "Itaúba", image: deckItauba, desc: "Resistência natural a fungos e umidade, tom dourado-acastanhado nobre." },
  { name: "Ipê Oliva", image: deckIpeOliva, desc: "Tonalidade oliva única com altíssima durabilidade." },
  { name: "Garapeira", image: deckGarapeira, desc: "Cor amarelo-dourada vibrante com excelente resistência mecânica." },
  { name: "Cumaru Champagne", image: deckCumaruChampagne, desc: "Tom champagne claro e luminoso, uma das madeiras mais densas do mundo." },
  { name: "Cumaru Rosa", image: deckCumaruRosa, desc: "Tonalidade rosada singular com dureza excepcional." },
  { name: "Ipê", image: deckIpe, desc: "Alta resistência natural, cor castanho-escuro profundo. O clássico absoluto." },
];

const projetos = [dp1, dp2, dp3, dp4, dp5, dp6, dp7, dp8, dp9, dp10];

const Decks = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projetosRef = useRef(null);
  const projetosInView = useInView(projetosRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-20" />
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductCarousel items={deckSpecies} title="Qual deck define o seu ambiente?" />
        </div>
      </section>
      <section className="py-14 lg:py-20 bg-card" ref={projetosRef}>
        <div className="container mx-auto px-4 lg:px-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={projetosInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
            <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Projetos e o Poder da <span className="text-accent italic">Madeira Nobre</span>
            </h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto">Decks que transformam áreas externas em extensões sofisticadas do seu lar.</p>
          </motion.div>
        </div>
        <Marquee images={projetos} alt="Projeto deck" />
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

export default Decks;
