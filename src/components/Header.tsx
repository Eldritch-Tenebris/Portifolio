import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-portfolio-dark/90 backdrop-blur-sm py-4 shadow-lg" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold gradient-text">
          Eldritch Tenebris
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['sobre', 'projetos', 'habilidades', 'contato'].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="text-foreground/80 hover:text-foreground hover:bg-transparent"
              onClick={() => scrollToSection(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Button>
          ))}
        </nav>
        
        <Button className="md:hidden" variant="ghost">
          Menu
        </Button>
      </div>
    </header>
  );
};

export default Header;
