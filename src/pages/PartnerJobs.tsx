import { useState } from "react";
import { PartnerHeader } from "@/components/layout/PartnerHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  MapPin,
  Clock,
  Building2,
  Navigation,
  CheckCircle2,
  ChevronRight,
  CalendarDays,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mockJobs = [
  {
    id: 1,
    company: "TechCorp SpA",
    address: "Av. Providencia 1234, Of. 501",
    distance: 2.3,
    time: "09:00",
    duration: "3h",
    squareMeters: 150,
    type: "Oficina",
    status: "confirmado",
  },
  {
    id: 2,
    company: "Retail Store SA",
    address: "Mall Costanera, Local 234",
    distance: 5.1,
    time: "14:00",
    duration: "2h",
    squareMeters: 80,
    type: "Retail",
    status: "pendiente",
  },
  {
    id: 3,
    company: "Bodega Central Ltda",
    address: "Ruta 5 Sur Km 15",
    distance: 12.4,
    time: "18:00",
    duration: "4h",
    squareMeters: 400,
    type: "Bodega",
    status: "pendiente",
  },
];

const todayStats = {
  totalJobs: 3,
  completedJobs: 0,
  totalEarnings: 85000,
  totalHours: 9,
};

export default function PartnerJobs() {
  const { toast } = useToast();
  const [isAvailable, setIsAvailable] = useState(true);
  const [jobs, setJobs] = useState(mockJobs);

  const handleConfirmJob = (jobId: number) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: "confirmado" } : job
    ));
    toast({
      title: "¡Servicio Confirmado!",
      description: "El cliente ha sido notificado",
    });
  };

  const handleToggleAvailability = (checked: boolean) => {
    setIsAvailable(checked);
    toast({
      title: checked ? "Disponible" : "No Disponible",
      description: checked 
        ? "Ahora recibirás nuevos trabajos" 
        : "No recibirás nuevos trabajos",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PartnerHeader />

      <div className="px-4 py-6 space-y-6">
        {/* Availability Toggle */}
        <Card className={cn(
          "transition-colors",
          isAvailable ? "border-secondary/50 bg-secondary/5" : "border-border"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  isAvailable ? "bg-secondary" : "bg-muted"
                )}>
                  <Navigation className={cn(
                    "h-5 w-5",
                    isAvailable ? "text-secondary-foreground" : "text-muted-foreground"
                  )} />
                </div>
                <div>
                  <p className="font-semibold">
                    {isAvailable ? "Disponible" : "No Disponible"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isAvailable ? "Recibiendo trabajos" : "Modo offline"}
                  </p>
                </div>
              </div>
              <Switch
                checked={isAvailable}
                onCheckedChange={handleToggleAvailability}
              />
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">{todayStats.totalJobs}</p>
              <p className="text-xs text-muted-foreground">Trabajos Hoy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-secondary">
                ${todayStats.totalEarnings.toLocaleString("es-CL")}
              </p>
              <p className="text-xs text-muted-foreground">Ganancias Est.</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Trabajos Programados
          </h2>
          <Badge variant="outline">{jobs.length} pendientes</Badge>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className={cn(
                "animate-slide-up overflow-hidden",
                job.status === "confirmado" && "border-secondary/50"
              )}
            >
              <CardContent className="p-0">
                {/* Job Header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{job.company}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="capitalize">{job.type}</span>
                          <span>•</span>
                          <span>{job.squareMeters} m²</span>
                        </div>
                      </div>
                    </div>
                    {job.status === "confirmado" ? (
                      <Badge className="bg-secondary text-secondary-foreground">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Confirmado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-accent border-accent">
                        Pendiente
                      </Badge>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium text-foreground">{job.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Maximize2 className="h-4 w-4" />
                      <span className="font-medium text-foreground">{job.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Navigation className="h-4 w-4" />
                      <span className="font-medium text-foreground">{job.distance} km</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">{job.address}</span>
                  </div>
                </div>

                {/* Action Button */}
                {job.status === "pendiente" && (
                  <div className="px-4 pb-4">
                    <Button 
                      variant="mobile-success" 
                      className="w-full"
                      onClick={() => handleConfirmJob(job.id)}
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Confirmar Servicio
                    </Button>
                  </div>
                )}

                {job.status === "confirmado" && (
                  <div className="px-4 pb-4">
                    <Button 
                      variant="mobile" 
                      className="w-full"
                    >
                      Ver Detalles
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
