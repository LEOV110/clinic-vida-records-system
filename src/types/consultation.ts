
export interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  consultationDate: string;
  specialty: string;
  notes: string;
  document?: string;
}
