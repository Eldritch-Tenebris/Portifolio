import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sobre" className="min-h-screen flex items-center py-20 pt-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span>Desenvolvedor Web</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Olá, eu sou <span className="gradient-text">Eldritch Tenebris</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Desenvolvedor Full Stack especializado em transformar ideias em soluções digitais inovadoras.
              Com domínio em React, TypeScript e arquitetura de software, crio aplicações que combinam performance excepcional com experiências únicas para o usuário.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={scrollToContact}>
                Entre em contato
              </Button>
              
              <Button size="lg" variant="outline" className="gradient-border" asChild>
                <a href="https://github.com/Eldritch-Tenebris" target="_blank" rel="noopener noreferrer">
                  Ver GitHub
                </a>
              </Button>
            </div>
          </div>
          
          <div className="highlight-section flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-br from-portfolio-purple/30 to-portfolio-blue/30 flex items-center justify-center animate-pulse-glow">
              <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-portfolio-purple to-portfolio-blue opacity-10 blur-2xl"></div>
              <img 
                src="/Eldritch-Tenebris.jpg"
                alt="Foto de Eldritch Tenebris"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
