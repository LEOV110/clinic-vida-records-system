
import { Card, CardContent } from "@/components/ui/card";
import { Patient } from "@/types/patient";

interface PatientViewProps {
  patient: Patient;
}

export default function PatientView({ patient }: PatientViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {patient.image && (
          <div className="flex-shrink-0">
            <img 
              src={patient.image} 
              alt={patient.name} 
              className="w-40 h-40 object-cover rounded-md" 
            />
          </div>
        )}
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">{patient.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Información Personal</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Fecha de Nacimiento:</dt>
                    <dd>{new Date(patient.birthDate).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Género:</dt>
                    <dd>{patient.gender}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Contacto</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Teléfono:</dt>
                    <dd>{patient.phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Email:</dt>
                    <dd>{patient.email}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg mb-2">Dirección</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">Dirección:</dt>
                  <dd>{patient.address}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">Ciudad:</dt>
                  <dd>{patient.city}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">Código Postal:</dt>
                  <dd>{patient.postalCode}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">País:</dt>
                  <dd>{patient.country}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-2">Historial Médico</h3>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-muted-foreground">Alergias:</dt>
              <dd className="mt-1">{patient.allergies || "No registradas"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Condiciones Preexistentes:</dt>
              <dd className="mt-1">
                {patient.conditions && patient.conditions.length > 0 
                  ? patient.conditions.join(", ") 
                  : "No registradas"
                }
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Medicamentos Actuales:</dt>
              <dd className="mt-1">{patient.medications || "No registrados"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
