
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Link } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Moderno",
    description: "Plataforma de e-commerce completa com carrinho, pagamentos e painel de administração.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    liveUrl: "#",
    githubUrl: "https://github.com/Eldritch-Tenebris",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
  },
  {
    id: 2,
    title: "Dashboard Financeiro",
    description: "Aplicativo para gerenciamento financeiro pessoal com visualização de dados e relatórios.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    liveUrl: "#",
    githubUrl: "https://github.com/Eldritch-Tenebris",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Recharts"],
  },
  {
    id: 3,
    title: "Blog Tech",
    description: "Blog com artigos sobre tecnologia, sistema de comentários e recursos de SEO.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    liveUrl: "#",
    githubUrl: "https://github.com/Eldritch-Tenebris",
    technologies: ["Vue.js", "Firebase", "Markdown", "PWA"],
  },
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projetos" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvi. Cada projeto representa um conjunto único de desafios e soluções.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredProject === project.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              </div>
              
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                </Button>
                
                <Button size="sm" className="gap-2" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Link size={16} />
                    <span>Demo</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
