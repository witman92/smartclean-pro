import { useState } from "react";
import { ClientHeader } from "@/components/layout/ClientHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Calendar,
  Star,
  User,
  FileText,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  Building2,
  ChevronRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockServices = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00 - 12:00",
    type: "Oficina",
    status: "completado",
    partnerName: "María González",
    partnerRating: 4.9,
    invoiceNumber: "FE-2024-00125",
  },
  {
    id: 2,
    date: "2024-01-22",
    time: "09:00 - 12:00",
    type: "Oficina",
    status: "completado",
    partnerName: "María González",
    partnerRating: 4.9,
    invoiceNumber: "FE-2024-00132",
  },
  {
    id: 3,
    date: "2024-01-29",
    time: "09:00 - 12:00",
    type: "Oficina",
    status: "programado",
    partnerName: "María González",
    partnerRating: 4.9,
    invoiceNumber: null,
  },
];

const mockInvoices = [
  { id: 1, number: "FE-2024-00125", date: "2024-01-15", amount: 178500, status: "pagada" },
  { id: 2, number: "FE-2024-00132", date: "2024-01-22", amount: 178500, status: "pagada" },
];

export default function ClientDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"servicios" | "facturas">("servicios");

  const handleDownloadInvoice = (invoiceNumber: string) => {
    toast({
      title: "Descargando Factura",
      description: `Factura ${invoiceNumber} descargada correctamente`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completado":
        return <Badge className="bg-secondary text-secondary-foreground">Completado</Badge>;
      case "programado":
        return <Badge className="bg-primary text-primary-foreground">Programado</Badge>;
      case "pagada":
        return <Badge className="bg-secondary text-secondary-foreground">Pagada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />

      <div className="container py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Bienvenido, TechCorp SpA
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus servicios de limpieza y documentos fiscales
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Servicios</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-muted-foreground">Satisfacción</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Facturas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">150</p>
                  <p className="text-xs text-muted-foreground">m² Cubiertos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setActiveTab("servicios")}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "servicios"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Historial de Servicios
              </button>
              <button
                onClick={() => setActiveTab("facturas")}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "facturas"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Facturas Electrónicas
              </button>
            </div>

            {/* Services Tab */}
            {activeTab === "servicios" && (
              <div className="space-y-4">
                {mockServices.map((service) => (
                  <Card key={service.id} className="animate-fade-up">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{service.type}</p>
                              {getStatusBadge(service.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(service.date).toLocaleDateString("es-CL")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {service.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        {service.invoiceNumber && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(service.invoiceNumber!)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Factura
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === "facturas" && (
              <div className="space-y-4">
                {mockInvoices.map((invoice) => (
                  <Card key={invoice.id} className="animate-fade-up">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{invoice.number}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(invoice.date).toLocaleDateString("es-CL")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ${invoice.amount.toLocaleString("es-CL")}
                          </p>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadInvoice(invoice.number)}
                        >
                          <Download className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="text-center py-4">
                  <Button variant="outline">
                    Descargar Todas las Facturas
                    <Download className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Partner Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Partner Asignado</CardTitle>
                <CardDescription>Tu profesional de confianza</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">María González</p>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">4.9</span>
                      <span className="text-muted-foreground">(127 servicios)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>Background Check Verificado</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>Capacitación Completada</span>
                  </div>
                </div>
                <hr className="my-4" />
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contactar
                </Button>
              </CardContent>
            </Card>

            {/* Next Service */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Próximo Servicio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Lun, 29 de Enero</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">09:00 - 12:00</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="default">
                  Ver Detalles
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
