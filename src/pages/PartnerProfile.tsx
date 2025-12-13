import { PartnerHeader } from "@/components/layout/PartnerHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  CheckCircle2,
  Shield,
  Award,
  TrendingUp,
  Calendar,
  DollarSign,
  Clock,
  ChevronRight,
  FileText,
  HelpCircle,
  Settings,
  BadgeCheck,
} from "lucide-react";

const stats = [
  { label: "Servicios Completados", value: 127, icon: Calendar },
  { label: "Ganancias del Mes", value: "$485.000", icon: DollarSign },
  { label: "Horas Trabajadas", value: "156h", icon: Clock },
  { label: "Clientes Únicos", value: 34, icon: TrendingUp },
];

const achievements = [
  { label: "Partner Estrella", unlocked: true },
  { label: "100 Servicios", unlocked: true },
  { label: "5 Estrellas", unlocked: false },
  { label: "Mejor del Mes", unlocked: false },
];

const menuItems = [
  { label: "Mis Documentos", icon: FileText },
  { label: "Configuración", icon: Settings },
  { label: "Ayuda y Soporte", icon: HelpCircle },
];

export default function PartnerProfile() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PartnerHeader />

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="h-20 gradient-hero" />
          <CardContent className="pt-0 -mt-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-card border-4 border-card flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-primary">MG</span>
              </div>
              <h2 className="text-xl font-bold mt-3">María González</h2>
              <p className="text-sm text-muted-foreground">Partner desde Marzo 2023</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1 bg-warning/10 px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="font-bold text-lg">4.8</span>
                  <span className="text-sm text-muted-foreground">/5</span>
                </div>
                <span className="text-sm text-muted-foreground">(127 reseñas)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Status */}
        <Card className="border-secondary/30 bg-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <BadgeCheck className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Estatus Legal</p>
                  <p className="text-sm text-muted-foreground">Verificado y Formalizado</p>
                </div>
              </div>
              <Badge className="bg-secondary text-secondary-foreground">
                Validado
              </Badge>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Background Check Aprobado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Documentación al Día</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Capacitación Completada</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <Icon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Tu Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Puntualidad</span>
                <span className="font-medium">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Calidad de Servicio</span>
                <span className="font-medium">96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Satisfacción Cliente</span>
                <span className="font-medium">99%</span>
              </div>
              <Progress value={99} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Logros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.label}
                  className={`p-3 rounded-lg text-center transition-all ${
                    achievement.unlocked
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Award className={`h-6 w-6 mx-auto mb-1 ${
                    achievement.unlocked ? "text-accent" : "text-muted-foreground/50"
                  }`} />
                  <p className="text-xs font-medium">{achievement.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/5">
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
