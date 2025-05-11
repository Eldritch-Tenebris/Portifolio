import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Github, Download, Linkedin, Send, Loader2 } from "lucide-react";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1371228460604985394/3QLliLyZYHnnAONqKVkY2ul11zbLepM8w89h-F6CyNWKQd4cGeCTJX4D61GepIvIdo3D";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    image: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // Limite de 5MB
      setFormData(prev => ({ ...prev, image: file }));
    } else {
      toast({
        title: "Erro no upload",
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { name, email, subject, message } = formData;
      if (!name || !email || !message) {
        toast({
          title: "Erro no formulário",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        content: "<@1226297864796246016>", // Adiciona menção ao usuário
        embeds: [{
          title: "💌 Nova Mensagem do Portfólio",
          description: subject ? `**Assunto:** ${subject}` : "Mensagem enviada através do formulário de contato",
          color: 0x6D28D9, // Cor roxa que combina com o tema do site
          fields: [
            {
              name: "👤 Nome",
              value: name,
              inline: true
            },
            {
              name: "📧 Email",
              value: email,
              inline: true
            },
            {
              name: "📝 Mensagem",
              value: message
            }
          ],
          image: formData.image ? {
            url: "attachment://image.jpg" // Nome do arquivo anexado
          } : undefined,
          footer: {
            text: "Portfolio - Eldritch Tenebris",
            icon_url: "/Eldritch-Tenebris.jpg" // Usando sua imagem do perfil
          },
          timestamp: new Date().toISOString()
        }]
      };

      const formDataPayload = new FormData();
      formDataPayload.append("payload_json", JSON.stringify(payload));
      if (formData.image) {
        formDataPayload.append("file", formData.image, "image.jpg");
      }

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: formDataPayload
      });

      if (response.ok) {
        toast({
          title: "✨ Mensagem enviada com sucesso!",
          description: "Obrigado pelo contato. Responderei em breve.",
        });
        setFormData({ name: "", email: "", subject: "", message: "", image: null });
      } else {
        throw new Error("Falha ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente ou quer conversar? Preencha o formulário abaixo e entrarei em contato o mais rápido possível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <CardContent className="space-y-6 p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <span>Nome</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Seu nome completo"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      minLength={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <span>Email</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="seu.email@exemplo.com"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Assunto
                  </label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Ex: Proposta de Projeto"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                    value={formData.subject} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                    <span>Mensagem</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Descreva seu projeto ou proposta..."
                    className="min-h-[150px] transition-all focus:ring-2 focus:ring-primary/20"
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    minLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium flex items-center gap-2">
                    <span>Imagem de Referência</span>
                    <span className="text-xs text-muted-foreground">(Opcional - máx. 5MB)</span>
                  </label>
                  <Input 
                    id="image" 
                    name="image" 
                    type="file" 
                    accept="image/*"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                    onChange={handleImageChange}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting} 
                  className="w-full group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center space-y-8">
            <div className="highlight-section rounded-lg p-8 bg-gradient-to-br from-portfolio-purple/10 to-portfolio-blue/10 border border-border/50">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="rounded-full bg-primary/20 p-3 shadow-glow">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email Principal</p>
                    <a href="mailto:eldritch.tenebris1@gmail.com" className="font-medium hover:text-primary transition-colors">
                      eldritch.tenebris1@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="rounded-full bg-primary/20 p-3 shadow-glow">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Perfil GitHub</p>
                    <a 
                      href="https://github.com/Eldritch-Tenebris" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium hover:text-primary transition-colors"
                    >
                      github.com/Eldritch-Tenebris
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="rounded-full bg-primary/20 p-3 shadow-glow">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/in/eldritch-tenebris/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium hover:text-primary transition-colors"
                    >
                      linkedin.com/in/eldritch-tenebris
                    </a>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/50 pt-6">
                  <p className="text-sm text-muted-foreground">
                    Disponível para conversas sobre:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
                      Desenvolvimento Web Frontend
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
                      Projetos React/Next.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
                      Oportunidades de Trabalho
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-portfolio-purple/20 to-portfolio-blue/20 rounded-lg p-8 border border-border/50">
              <h3 className="text-xl font-bold mb-2">Vamos trabalhar juntos!</h3>
              <p className="text-muted-foreground mb-6">
                Estou atualmente disponível para projetos freelance e oportunidades de trabalho.
              </p>
              <div className="flex gap-4">
                <Button variant="default" asChild>
                  <a href="https://github.com/Eldritch-Tenebris" target="_blank" rel="noopener noreferrer">
                    Ver GitHub
                  </a>
                </Button>
                <Button variant="outline" className="gradient-border" asChild>
                  <a href="/Eldritch-Tenebris.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;