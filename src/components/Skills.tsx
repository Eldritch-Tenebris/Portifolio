
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SkillCategory = {
  name: string;
  skills: {
    name: string;
    level: number;
  }[];
};

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "PostgreSQL", level: 60 },
      { name: "GraphQL", level: 55 },
    ],
  },
  {
    name: "Ferramentas & DevOps",
    skills: [
      { name: "Git/GitHub", level: 85 },
      { name: "Docker", level: 60 },
      { name: "CI/CD", level: 65 },
      { name: "AWS", level: 50 },
      { name: "Testes Automatizados", level: 70 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="habilidades" className="py-20 bg-portfolio-dark/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estas são as tecnologias e ferramentas com as quais tenho experiência.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.name} className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6 gradient-text">{category.name}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" 
                        style={{
                          backgroundImage: `linear-gradient(to right, hsl(var(--primary)) ${skill.level}%, transparent ${skill.level}%)`,
                          backgroundColor: 'hsl(var(--muted))'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
