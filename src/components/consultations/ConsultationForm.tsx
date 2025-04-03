
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useConsultations } from "@/hooks/useConsultations";
import { usePatients } from "@/hooks/usePatients";
import { Consultation } from "@/types/consultation";

const formSchema = z.object({
  patientId: z.string().min(1, { message: "Debe seleccionar un paciente" }),
  consultationDate: z.string().min(1, { message: "La fecha y hora son requeridas" }),
  specialty: z.string().min(1, { message: "La especialidad es requerida" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ConsultationFormProps {
  consultation?: Consultation;
  onClose: () => void;
}

export default function ConsultationForm({ consultation, onClose }: ConsultationFormProps) {
  const { toast } = useToast();
  const { addConsultation, updateConsultation } = useConsultations();
  const { patients } = usePatients();
  const [documentPreview, setDocumentPreview] = useState<string | null>(consultation?.document || null);
  const [fileType, setFileType] = useState<string>(
    consultation?.document?.includes("application/pdf") ? "pdf" : "image"
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: consultation ? {
      patientId: consultation.patientId,
      consultationDate: consultation.consultationDate.substring(0, 16), // format for datetime-local input
      specialty: consultation.specialty,
      notes: consultation.notes,
    } : {
      consultationDate: new Date().toISOString().substring(0, 16), // default to current date/time
    }
  });

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDocumentPreview(event.target?.result as string);
        setFileType(file.type.includes("pdf") ? "pdf" : "image");
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    const patient = patients.find(p => p.id === data.patientId);
    
    if (!patient) {
      toast({
        title: "Error",
        description: "Paciente no encontrado",
        variant: "destructive"
      });
      return;
    }
    
    const newConsultation = {
      id: consultation?.id || Date.now().toString(),
      patientId: data.patientId,
      patientName: patient.name,
      consultationDate: data.consultationDate,
      specialty: data.specialty,
      notes: data.notes || "",
      document: documentPreview || ""
    };

    if (consultation) {
      updateConsultation(newConsultation);
      toast({
        title: "Consulta actualizada",
        description: "La consulta ha sido actualizada exitosamente.",
      });
    } else {
      addConsultation(newConsultation);
      toast({
        title: "Consulta programada",
        description: "La consulta ha sido programada exitosamente.",
      });
    }

    onClose();
  };

  return (
    <Card className="animate-fade">
      <CardHeader className="bg-muted">
        <CardTitle>{consultation ? "Editar Consulta" : "Nueva Consulta"}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Paciente</Label>
              <Select 
                onValueChange={(value) => setValue("patientId", value)} 
                defaultValue={consultation?.patientId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.length === 0 ? (
                    <SelectItem value="no-patients" disabled>
                      No hay pacientes registrados
                    </SelectItem>
                  ) : (
                    patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("patientId")} />
              {errors.patientId && <p className="text-sm text-destructive">{errors.patientId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultationDate">Fecha y Hora</Label>
              <Input 
                type="datetime-local" 
                id="consultationDate" 
                {...register("consultationDate")} 
              />
              {errors.consultationDate && <p className="text-sm text-destructive">{errors.consultationDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad</Label>
              <Select 
                onValueChange={(value) => setValue("specialty", value)} 
                defaultValue={consultation?.specialty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medicina General">Medicina General</SelectItem>
                  <SelectItem value="Cardiología">Cardiología</SelectItem>
                  <SelectItem value="Dermatología">Dermatología</SelectItem>
                  <SelectItem value="Neurología">Neurología</SelectItem>
                  <SelectItem value="Pediatría">Pediatría</SelectItem>
                  <SelectItem value="Ginecología">Ginecología</SelectItem>
                  <SelectItem value="Oftalmología">Oftalmología</SelectItem>
                  <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                  <SelectItem value="Psicología">Psicología</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register("specialty")} />
              {errors.specialty && <p className="text-sm text-destructive">{errors.specialty.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea id="notes" {...register("notes")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document">Subir Documento/Imagen</Label>
            <Input id="document" type="file" accept="image/*,application/pdf" onChange={handleDocumentChange} />
            
            {documentPreview && (
              <div className="mt-4 flex justify-center">
                {fileType === "pdf" ? (
                  <div className="p-4 border rounded-md bg-muted flex items-center">
                    <span>📄 Documento PDF</span>
                    <a
                      href={documentPreview}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-primary hover:underline"
                    >
                      Ver PDF
                    </a>
                  </div>
                ) : (
                  <img 
                    src={documentPreview} 
                    alt="Vista previa del documento" 
                    className="max-h-40 rounded-md border" 
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{consultation ? "Actualizar" : "Guardar"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
