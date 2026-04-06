import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ProductCarousel, Marquee } from "@/components/ProductCarousel";

import macicoCumaruChampagne from "@/assets/piso-macico-cumaru-champagne.webp";
import macicoCumaruFerro from "@/assets/piso-macico-cumaru-ferro.webp";
import macicoGarapeira from "@/assets/piso-macico-garapeira.webp";
import macicoPeroba from "@/assets/piso-macico-peroba.webp";
import macicoSucupira from "@/assets/piso-macico-sucupira.webp";
import macicoTauari from "@/assets/piso-macico-tauari.webp";
import engCarvalhoPrime from "@/assets/piso-eng-carvalho-prime.webp";
import engTauariPrime from "@/assets/piso-eng-tauari-prime.webp";
import engCabreuvaDourada from "@/assets/piso-eng-cabreuva-dourada.webp";
import projeto1 from "@/assets/piso-projeto-1.webp";
import projeto2 from "@/assets/piso-projeto-2.webp";
import projeto3 from "@/assets/piso-projeto-3.webp";
import projeto4 from "@/assets/piso-projeto-4.webp";
import projeto5 from "@/assets/piso-projeto-5.webp";
import projeto6 from "@/assets/piso-projeto-6.webp";
import projeto7 from "@/assets/piso-projeto-7.webp";
import projeto8 from "@/assets/piso-projeto-8.webp";
import projeto9 from "@/assets/piso-projeto-9.webp";
import projeto10 from "@/assets/piso-projeto-10.webp";

const pisosMacicos = [
  { name: "Cumaru Champagne", image: macicoCumaruChampagne, desc: "Tonalidade dourada clara com veios suaves. Resistência excepcional e beleza luminosa." },
  { name: "Cumaru Ferro", image: macicoCumaruFerro, desc: "Tom profundo e alta densidade, ideal para alto tráfego com presença marcante e sofisticação." },
  { name: "Garapeira", image: macicoGarapeira, desc: "Tonalidade dourada uniforme com veios sutis, unindo leveza visual e durabilidade com elegância." },
  { name: "Peroba", image: macicoPeroba, desc: "Com fibras entrelaçadas e coloração rica, unindo estética marcante com padrões únicos." },
  { name: "Sucupira", image: macicoSucupira, desc: "Tom marrom-chocolate com veios expressivos, trazendo personalidade e requinte aos espaços." },
  { name: "Tauari", image: macicoTauari, desc: "Tonalidade clara e uniforme com veios suaves, criando ambientes leves, modernos e sofisticados." },
];

const pisosEstruturados = [
  { name: "Carvalho Prime Escovado", image: engCarvalhoPrime, desc: "Elegância americana com textura escovada que realça os veios naturais, unindo harmonia clássica e atemporal." },
  { name: "Tauari Prime", image: engTauariPrime, desc: "Tonalidade clara e uniforme com veios suaves, criando ambientes leves, modernos e sofisticados." },
  { name: "Cabreúva Dourada", image: engCabreuvaDourada, desc: "Cor dourada quente e delicada, chama atenção pela suavidade e detalhes premium para ambientes sofisticados." },
];

const projetos = [projeto1, projeto2, projeto3, projeto4, projeto5, projeto6, projeto7, projeto8, projeto9, projeto10];

const PisosAssoalhos = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projetosRef = useRef(null);
  const projetosInView = useInView(projetosRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-20" />
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductCarousel items={pisosMacicos} title="Pisos Maciços" />
        </div>
      </section>
      <section className="py-14 lg:py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductCarousel items={pisosEstruturados} title="Pisos Estruturados" />
        </div>
      </section>
      <section className="py-14 lg:py-20" ref={projetosRef}>
        <div className="container mx-auto px-4 lg:px-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={projetosInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
            <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Projetos e o Poder da <span className="text-accent italic">Madeira Nobre</span>
            </h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto">Ambientes transformados pela elegância dos pisos BMN.</p>
          </motion.div>
        </div>
        <Marquee images={projetos} alt="Projeto piso" />
      </section>
      <section className="py-14 lg:py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <a href="/#produtos" className="px-8 py-4 bg-accent text-accent-foreground font-sans font-semibold text-sm uppercase tracking-widest hover:bg-gold-light transition-all duration-300 rounded-sm inline-block">VOLTAR AO CATÁLOGO</a>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PisosAssoalhos;
