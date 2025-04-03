
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { usePatients } from "@/hooks/usePatients";
import { Patient } from "@/types/patient";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  birthDate: z.string().min(1, { message: "La fecha de nacimiento es requerida" }),
  gender: z.string().min(1, { message: "El género es requerido" }),
  phone: z.string().min(1, { message: "El teléfono es requerido" }),
  email: z.string().email({ message: "Por favor, ingrese un email válido" }),
  address: z.string().min(1, { message: "La dirección es requerida" }),
  city: z.string().min(1, { message: "La ciudad es requerida" }),
  postalCode: z.string().min(1, { message: "El código postal es requerido" }),
  country: z.string().min(1, { message: "El país es requerido" }),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  hasDiabetes: z.boolean().default(false),
  hasHypertension: z.boolean().default(false),
  hasOtherConditions: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface PatientFormProps {
  patient?: Patient;
  onClose: () => void;
}

export default function PatientForm({ patient, onClose }: PatientFormProps) {
  const { toast } = useToast();
  const { addPatient, updatePatient } = usePatients();
  const [imagePreview, setImagePreview] = useState<string | null>(patient?.image || null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: patient ? {
      name: patient.name,
      birthDate: patient.birthDate,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      city: patient.city,
      postalCode: patient.postalCode,
      country: patient.country,
      allergies: patient.allergies,
      medications: patient.medications,
      hasDiabetes: patient.conditions.includes("Diabetes"),
      hasHypertension: patient.conditions.includes("Hipertensión"),
      hasOtherConditions: patient.conditions.includes("Otros"),
    } : {}
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    const conditions = [];
    if (data.hasDiabetes) conditions.push("Diabetes");
    if (data.hasHypertension) conditions.push("Hipertensión");
    if (data.hasOtherConditions) conditions.push("Otros");

    const newPatient = {
      id: patient?.id || Date.now().toString(),
      name: data.name,
      birthDate: data.birthDate,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      allergies: data.allergies || "",
      conditions: conditions,
      medications: data.medications || "",
      image: imagePreview || ""
    };

    if (patient) {
      updatePatient(newPatient);
      toast({
        title: "Paciente actualizado",
        description: "Los datos del paciente han sido actualizados exitosamente.",
      });
    } else {
      addPatient(newPatient);
      toast({
        title: "Paciente registrado",
        description: "El paciente ha sido registrado exitosamente.",
      });
    }

    onClose();
  };

  return (
    <Card className="animate-fade">
      <CardHeader className="bg-muted">
        <CardTitle>{patient ? "Editar Paciente" : "Nuevo Paciente"}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input type="date" id="birthDate" {...register("birthDate")} />
              {errors.birthDate && <p className="text-sm text-destructive">{errors.birthDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Género</Label>
              <RadioGroup 
                defaultValue={patient?.gender} 
                onValueChange={(value) => setValue("gender", value)}
              >
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Femenino" id="femenino" />
                    <Label htmlFor="femenino">Femenino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Otro" id="otro" />
                    <Label htmlFor="otro">Otro</Label>
                  </div>
                </div>
              </RadioGroup>
              <input type="hidden" {...register("gender")} />
              {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" {...register("address")} />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" {...register("city")} />
              {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Código Postal</Label>
              <Input id="postalCode" {...register("postalCode")} />
              {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select onValueChange={(value) => setValue("country", value)} defaultValue={patient?.country}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="España">España</SelectItem>
                  <SelectItem value="México">México</SelectItem>
                  <SelectItem value="Argentina">Argentina</SelectItem>
                  <SelectItem value="Colombia">Colombia</SelectItem>
                  <SelectItem value="Chile">Chile</SelectItem>
                  <SelectItem value="Perú">Perú</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register("country")} />
              {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Historial Médico</h3>
            
            <div className="space-y-2">
              <Label htmlFor="allergies">Alergias</Label>
              <Textarea id="allergies" {...register("allergies")} />
            </div>

            <div>
              <Label>Condiciones Preexistentes</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasDiabetes" 
                    checked={watch("hasDiabetes")} 
                    onCheckedChange={(checked) => setValue("hasDiabetes", checked as boolean)} 
                  />
                  <Label htmlFor="hasDiabetes">Diabetes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasHypertension" 
                    checked={watch("hasHypertension")} 
                    onCheckedChange={(checked) => setValue("hasHypertension", checked as boolean)} 
                  />
                  <Label htmlFor="hasHypertension">Hipertensión</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasOtherConditions" 
                    checked={watch("hasOtherConditions")} 
                    onCheckedChange={(checked) => setValue("hasOtherConditions", checked as boolean)} 
                  />
                  <Label htmlFor="hasOtherConditions">Otros</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Medicamentos Actuales</Label>
              <Textarea id="medications" {...register("medications")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientImage">Imagen del Paciente</Label>
              <Input id="patientImage" type="file" accept="image/*" onChange={handleImageChange} />
              
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa de la imagen" 
                    className="max-h-40 rounded-md border" 
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{patient ? "Actualizar" : "Guardar"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
