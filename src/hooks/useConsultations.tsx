
import { useState, useEffect, createContext, useContext } from "react";
import { Consultation } from "@/types/consultation";

interface ConsultationsContextType {
  consultations: Consultation[];
  addConsultation: (consultation: Consultation) => void;
  updateConsultation: (consultation: Consultation) => void;
  deleteConsultation: (id: string) => void;
  getConsultationById: (id: string) => Consultation | undefined;
}

const ConsultationsContext = createContext<ConsultationsContextType | undefined>(undefined);

// Initial demo data
const initialConsultations: Consultation[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "María García",
    consultationDate: new Date().toISOString(),
    specialty: "Cardiología",
    notes: "Control de hipertensión arterial",
    document: ""
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Juan Rodríguez",
    consultationDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    specialty: "Endocrinología",
    notes: "Revisión de nivel de glucosa",
    document: ""
  }
];

export const ConsultationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    const savedConsultations = localStorage.getItem("consultations");
    return savedConsultations ? JSON.parse(savedConsultations) : initialConsultations;
  });

  useEffect(() => {
    localStorage.setItem("consultations", JSON.stringify(consultations));
  }, [consultations]);

  const addConsultation = (consultation: Consultation) => {
    setConsultations((prevConsultations) => [...prevConsultations, consultation]);
  };

  const updateConsultation = (updatedConsultation: Consultation) => {
    setConsultations((prevConsultations) => 
      prevConsultations.map(consultation => 
        consultation.id === updatedConsultation.id ? updatedConsultation : consultation
      )
    );
  };

  const deleteConsultation = (id: string) => {
    setConsultations((prevConsultations) => 
      prevConsultations.filter(consultation => consultation.id !== id)
    );
  };

  const getConsultationById = (id: string) => {
    return consultations.find(consultation => consultation.id === id);
  };

  return (
    <ConsultationsContext.Provider value={{ 
      consultations, 
      addConsultation, 
      updateConsultation, 
      deleteConsultation, 
      getConsultationById 
    }}>
      {children}
    </ConsultationsContext.Provider>
  );
};

export const useConsultations = () => {
  const context = useContext(ConsultationsContext);
  if (context === undefined) {
    throw new Error("useConsultations must be used within a ConsultationsProvider");
  }
  return context;
};
