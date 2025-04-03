
import { Card, CardContent } from "@/components/ui/card";
import { Consultation } from "@/types/consultation";
import { usePatients } from "@/hooks/usePatients";

interface ConsultationViewProps {
  consultation: Consultation;
}

export default function ConsultationView({ consultation }: ConsultationViewProps) {
  const { getPatientById } = usePatients();
  const patient = getPatientById(consultation.patientId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg mb-2">Detalles de la Consulta</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Fecha y Hora:</dt>
                <dd>{new Date(consultation.consultationDate).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Especialidad:</dt>
                <dd>{consultation.specialty}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Notas:</dt>
                <dd className="mt-1 whitespace-pre-wrap">{consultation.notes || "No hay notas registradas"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg mb-2">Información del Paciente</h3>
            {patient ? (
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">Nombre:</dt>
                  <dd>{patient.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">Teléfono:</dt>
                  <dd>{patient.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">Email:</dt>
                  <dd>{patient.email}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Alergias:</dt>
                  <dd className="mt-1">{patient.allergies || "No registradas"}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-muted-foreground">Información del paciente no disponible</p>
            )}
          </CardContent>
        </Card>
      </div>

      {consultation.document && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg mb-2">Documento Adjunto</h3>
            {consultation.document.includes("application/pdf") ? (
              <div className="flex justify-center">
                <a 
                  href={consultation.document} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
                >
                  <span className="mr-2">📄</span>
                  Ver documento PDF
                </a>
              </div>
            ) : (
              <div className="flex justify-center">
                <img 
                  src={consultation.document} 
                  alt="Documento adjunto" 
                  className="max-h-80 rounded-md border" 
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
