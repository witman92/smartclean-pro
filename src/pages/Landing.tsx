import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClientHeader } from "@/components/layout/ClientHeader";
import {
  Shield,
  FileCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  Building2,
  Clock,
  Star,
  Users,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Formalidad Fiscal",
    description: "Factura Electrónica automática y cumplimiento 100% con el SII.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Seguridad Verificada",
    description: "Background check completo para todos nuestros Partners.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description: "Partners evaluados con sistema de rating y capacitación continua.",
    color: "bg-accent/10 text-accent",
  },
];

const steps = [
  { number: "1", title: "Cotiza en Línea", description: "Indica el tipo de espacio y frecuencia" },
  { number: "2", title: "Confirma tu RUT", description: "Validación fiscal instantánea" },
  { number: "3", title: "Recibe tu Servicio", description: "Partner verificado en tu puerta" },
];

const stats = [
  { value: "500+", label: "Empresas Confían" },
  { value: "98%", label: "Satisfacción" },
  { value: "24h", label: "Respuesta Rápida" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Marketplace B2B de Aseo Profesional
              </span>
            </div>
            
            <h1 className="animate-fade-up text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight" style={{ animationDelay: '0.1s' }}>
              Aseo Profesional B2B con{" "}
              <span className="relative">
                Factura Electrónica
                <span className="absolute bottom-0 left-0 w-full h-2 bg-accent/40 -z-10 rounded"></span>
              </span>{" "}
              en 3 Clics
            </h1>
            
            <p className="animate-fade-up text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
              Contrata servicios de limpieza profesional para tu empresa. 
              Formalidad fiscal, seguridad verificada y calidad garantizada.
            </p>
            
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.3s' }}>
              <Link to="/cotizar">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Cotizar Ahora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Conocer Más
              </Button>
            </div>

            {/* Stats */}
            <div className="animate-fade-up mt-12 grid grid-cols-3 gap-4" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-xs md:text-sm text-primary-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir SmartClean?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los 3 pilares que nos diferencian en el mercado B2B
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="group hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Proceso Simple en 3 Pasos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desde la cotización hasta el servicio en menos de 24 horas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-border" />
            
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 shadow-glow">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/cotizar">
              <Button variant="default" size="lg">
                Comenzar Ahora
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="bg-card rounded-2xl border p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Cumplimiento Fiscal Garantizado
                </h2>
                <p className="text-muted-foreground mb-6">
                  Todas nuestras transacciones generan Factura Electrónica válida ante el SII. 
                  Simplifica tu contabilidad y mantén tu empresa en regla.
                </p>
                <ul className="space-y-3">
                  {[
                    "Factura Electrónica automática",
                    "Integración con sistemas contables",
                    "Historial de documentos descargable",
                    "Soporte fiscal especializado",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                    <FileCheck className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Factura Electrónica</p>
                    <p className="text-sm text-muted-foreground">Válida ante el SII</p>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <p className="text-3xl font-bold text-primary mb-1">100%</p>
                  <p className="text-sm text-muted-foreground">
                    De nuestras transacciones cumplen con la normativa fiscal chilena
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-hero">
        <div className="container text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
            ¿Listo para simplificar tu limpieza corporativa?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Únete a más de 500 empresas que ya confían en SmartClean Chile
          </p>
          <Link to="/cotizar">
            <Button variant="hero" size="xl" className="group">
              Solicitar Cotización Gratis
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">SmartClean Chile</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SmartClean Chile. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
