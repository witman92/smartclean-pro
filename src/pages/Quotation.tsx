import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientHeader } from "@/components/layout/ClientHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Building2,
  Store,
  Factory,
  Warehouse,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  FileCheck,
  Calendar,
  Clock,
  MapPin,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const serviceTypes = [
  { id: "oficina", label: "Oficina", icon: Building2, description: "Espacios de trabajo" },
  { id: "retail", label: "Retail", icon: Store, description: "Tiendas y locales" },
  { id: "industrial", label: "Industrial", icon: Factory, description: "Plantas y fábricas" },
  { id: "bodega", label: "Bodega", icon: Warehouse, description: "Almacenamiento" },
];

const frequencies = [
  { id: "diario", label: "Diario", description: "Lunes a Viernes" },
  { id: "semanal", label: "Semanal", description: "1-2 veces/semana" },
  { id: "quincenal", label: "Quincenal", description: "Cada 2 semanas" },
  { id: "puntual", label: "Puntual", description: "Servicio único" },
];

const schedules = [
  { id: "manana", label: "Mañana", time: "08:00 - 12:00" },
  { id: "tarde", label: "Tarde", time: "14:00 - 18:00" },
  { id: "noche", label: "Noche", time: "20:00 - 00:00" },
];

const calculatePrice = (type: string, m2: number, frequency: string): number => {
  const baseRates: Record<string, number> = {
    oficina: 1200,
    retail: 1100,
    industrial: 900,
    bodega: 800,
  };

  const frequencyMultipliers: Record<string, number> = {
    diario: 0.7,
    semanal: 0.85,
    quincenal: 0.95,
    puntual: 1.2,
  };

  const base = baseRates[type] || 1000;
  const multiplier = frequencyMultipliers[frequency] || 1;

  return Math.round(m2 * base * multiplier);
};

export default function Quotation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: "",
    squareMeters: "",
    frequency: "",
    schedule: "",
    rut: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleNext = () => {
    if (step === 1 && (!formData.serviceType || !formData.squareMeters)) {
      toast({
        title: "Campos requeridos",
        description: "Por favor selecciona el tipo de servicio e indica los m²",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!formData.frequency || !formData.schedule)) {
      toast({
        title: "Campos requeridos",
        description: "Por favor selecciona la frecuencia y horario",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else {
      setStep(step - 1);
    }
  };

  const validateRUT = (rut: string): boolean => {
    const cleanRut = rut.replace(/[.-]/g, "").toUpperCase();
    if (cleanRut.length < 8) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!formData.rut || !formData.companyName || !formData.email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    if (!validateRUT(formData.rut)) {
      toast({
        title: "RUT inválido",
        description: "Por favor ingresa un RUT válido",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowResult(true);
    
    toast({
      title: "¡Cotización Generada!",
      description: "Hemos validado tu información fiscal correctamente.",
    });
  };

  const handleConfirm = () => {
    navigate("/dashboard");
  };

  const price = calculatePrice(
    formData.serviceType,
    parseInt(formData.squareMeters) || 0,
    formData.frequency
  );

  const priceWithIVA = Math.round(price * 1.19);

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />

      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                    s < step || showResult
                      ? "bg-secondary text-secondary-foreground"
                      : s === step && !showResult
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {s < step || showResult ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "w-12 md:w-20 h-1 mx-2 rounded",
                      s < step || showResult ? "bg-secondary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {!showResult ? (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  {step === 1 && "¿Qué tipo de espacio necesitas limpiar?"}
                  {step === 2 && "¿Con qué frecuencia necesitas el servicio?"}
                  {step === 3 && "Validación Fiscal"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Selecciona el tipo y tamaño de tu espacio"}
                  {step === 2 && "Elige la frecuencia y horario preferido"}
                  {step === 3 && "Ingresa los datos de tu empresa para la facturación"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() =>
                              setFormData({ ...formData, serviceType: type.id })
                            }
                            className={cn(
                              "p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                              formData.serviceType === type.id
                                ? "border-primary bg-primary/5 shadow-md"
                                : "border-border"
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-8 w-8 mb-2",
                                formData.serviceType === type.id
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              )}
                            />
                            <p className="font-semibold">{type.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {type.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="squareMeters">
                        Metros cuadrados (m²) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="squareMeters"
                        type="number"
                        placeholder="Ej: 150"
                        value={formData.squareMeters}
                        onChange={(e) =>
                          setFormData({ ...formData, squareMeters: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-3">
                      <Label>Frecuencia del Servicio</Label>
                      <RadioGroup
                        value={formData.frequency}
                        onValueChange={(value) =>
                          setFormData({ ...formData, frequency: value })
                        }
                        className="grid grid-cols-2 gap-3"
                      >
                        {frequencies.map((freq) => (
                          <Label
                            key={freq.id}
                            htmlFor={freq.id}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50",
                              formData.frequency === freq.id
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            )}
                          >
                            <RadioGroupItem value={freq.id} id={freq.id} />
                            <div>
                              <p className="font-medium">{freq.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {freq.description}
                              </p>
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Horario Preferido</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {schedules.map((sched) => (
                          <button
                            key={sched.id}
                            onClick={() =>
                              setFormData({ ...formData, schedule: sched.id })
                            }
                            className={cn(
                              "p-3 rounded-xl border-2 text-center transition-all hover:border-primary/50",
                              formData.schedule === sched.id
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            )}
                          >
                            <Clock
                              className={cn(
                                "h-5 w-5 mx-auto mb-1",
                                formData.schedule === sched.id
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              )}
                            />
                            <p className="font-medium text-sm">{sched.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {sched.time}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Información Segura</p>
                          <p className="text-xs text-muted-foreground">
                            Tus datos serán validados con el SII para emitir Factura Electrónica
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rut">
                          RUT Empresa <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="rut"
                          placeholder="Ej: 76.543.210-K"
                          value={formData.rut}
                          onChange={(e) =>
                            setFormData({ ...formData, rut: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName">
                          Razón Social <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="Nombre de la empresa"
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="contacto@empresa.cl"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            placeholder="+56 9 1234 5678"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección del Servicio</Label>
                        <Input
                          id="address"
                          placeholder="Av. Principal 123, Santiago"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  {step > 1 ? (
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Atrás
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button onClick={handleNext}>
                      Siguiente
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Validando...
                        </>
                      ) : (
                        <>
                          Generar Cotización
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Result Card */
            <Card className="animate-scale-in overflow-hidden">
              <div className="bg-secondary p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-foreground/20 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-secondary-foreground">
                  ¡Cotización Lista!
                </h2>
                <p className="text-secondary-foreground/80 text-sm mt-1">
                  RUT validado correctamente
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium capitalize">{formData.serviceType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Área:</span>
                    <span className="font-medium">{formData.squareMeters} m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Frecuencia:</span>
                    <span className="font-medium capitalize">{formData.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Horario:</span>
                    <span className="font-medium capitalize">{formData.schedule}</span>
                  </div>
                </div>

                <hr />

                {/* Pricing */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${price.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">IVA (19%)</span>
                    <span className="font-medium">${(priceWithIVA - price).toLocaleString("es-CL")} CLP</span>
                  </div>
                  <hr className="mb-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${priceWithIVA.toLocaleString("es-CL")} CLP
                    </span>
                  </div>
                </div>

                {/* Fiscal Notice */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <FileCheck className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Precio Final + IVA</p>
                    <p className="text-xs text-muted-foreground">
                      Recibirá Factura Electrónica Automática válida ante el SII
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button onClick={handleConfirm} size="lg" className="w-full">
                    Confirmar Contratación
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Modificar Cotización
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
