import { Github, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="font-bold gradient-text text-xl animate-hover-scale">
              Eldritch Tenebris
            </span>
            <span className="text-muted-foreground">© {currentYear}</span>
          </div>
          
          <div className="text-sm text-muted-foreground animate-slide-up">
            Desenvolvedor Frontend • Especialista React • UI/UX Designer
          </div>
          
          <div className="flex items-center gap-4">
            {[
              {
                href: "https://github.com/Eldritch-Tenebris",
                icon: Github,
                label: "GitHub"
              },
              {
                href: "mailto:eldritch.tenebris1@gmail.com",
                icon: Mail,
                label: "Email"
              },
              {
                href: "https://www.linkedin.com/in/eldritch-tenebris/",
                icon: Linkedin,
                label: "LinkedIn"
              }
            ].map((social, index) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-all duration-300 hover:scale-110"
                aria-label={social.label}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
