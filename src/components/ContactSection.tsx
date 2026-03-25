import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail, Instagram } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", product: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${formData.name}. Tenho interesse em ${formData.product}. ${formData.message}`
    );
    window.open(`https://wa.me/5541996249714?text=${msg}`, "_blank");
  };

  return (
    <section id="contato" className="py-14 lg:py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Entre em <span className="text-accent italic">Contato</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            Solicite seu orçamento ou tire suas dúvidas. Estamos prontos para atendê-lo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">Nome</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-sm font-sans text-sm focus:outline-none focus:border-accent transition-colors" placeholder="Seu nome completo" />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">E-mail</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-sm font-sans text-sm focus:outline-none focus:border-accent transition-colors" placeholder="seu@email.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">Telefone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-sm font-sans text-sm focus:outline-none focus:border-accent transition-colors" placeholder="(41) 99624-9714" />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">Produto</label>
                <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-sm font-sans text-sm focus:outline-none focus:border-accent transition-colors">
                  <option value="">Selecione...</option>
                  <option value="Pisos/Assoalhos">Pisos / Assoalhos</option>
                  <option value="Decks">Decks</option>
                  <option value="Forros">Forros</option>
                  <option value="Escadas">Escadas</option>
                  <option value="Madeiras S4S">Madeiras S4S</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">Mensagem</label>
              <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-sm font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Descreva seu projeto..." />
            </div>
            <button type="submit" className="w-full px-8 py-4 bg-accent text-accent-foreground font-sans font-semibold text-sm uppercase tracking-widest hover:bg-gold-light transition-all duration-300 rounded-sm inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Enviar via WhatsApp
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Informações</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">Endereço</p>
                    <p className="font-sans text-sm text-muted-foreground">R. Frederico Maurer, 421 - Hauer, Curitiba - PR, 81630-020</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">Telefone / WhatsApp</p>
                    <a href="https://wa.me/5541996249714" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-muted-foreground hover:text-accent transition-colors">(41) 99624-9714</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">E-mail</p>
                    <p className="font-sans text-sm text-muted-foreground">contato@bmnmadeiras.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Instagram className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">Instagram</p>
                    <a href="https://www.instagram.com/bmn.madeiras/" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-muted-foreground hover:text-accent transition-colors">@bmn.madeiras</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-sm overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.7!2d-49.2637!3d-25.4755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI4JzMxLjgiUyA0OcKwMTUnNDkuMyJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização BMN"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
