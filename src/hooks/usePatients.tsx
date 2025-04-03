
import { useState, useEffect, createContext, useContext } from "react";
import { Patient } from "@/types/patient";
import { useToast } from "@/components/ui/use-toast";

interface PatientsContextType {
  patients: Patient[];
  searchResults: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  searchPatients: (term: string) => void;
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

// Initial demo data
const initialPatients: Patient[] = [
  {
    id: "1",
    name: "María García",
    birthDate: "1985-05-12",
    gender: "Femenino",
    phone: "612345678",
    email: "maria.garcia@example.com",
    address: "Calle Principal 123",
    city: "Madrid",
    postalCode: "28001",
    country: "España",
    allergies: "Penicilina",
    conditions: ["Hipertensión"],
    medications: "Losartán 50mg",
    image: ""
  },
  {
    id: "2",
    name: "Juan Rodríguez",
    birthDate: "1976-09-23",
    gender: "Masculino",
    phone: "623456789",
    email: "juan.rodriguez@example.com",
    address: "Avenida Central 45",
    city: "Barcelona",
    postalCode: "08001",
    country: "España",
    allergies: "Ninguna",
    conditions: ["Diabetes"],
    medications: "Metformina 850mg",
    image: ""
  }
];

export const PatientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const savedPatients = localStorage.getItem("patients");
    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });
  const [searchResults, setSearchResults] = useState<Patient[]>(patients);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
    setSearchResults(patients);
  }, [patients]);

  const addPatient = (patient: Patient) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
  };

  const updatePatient = (updatedPatient: Patient) => {
    setPatients((prevPatients) => 
      prevPatients.map(patient => 
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  const deletePatient = (id: string) => {
    setPatients((prevPatients) => prevPatients.filter(patient => patient.id !== id));
  };

  const getPatientById = (id: string) => {
    return patients.find(patient => patient.id === id);
  };

  const searchPatients = (term: string) => {
    if (!term.trim()) {
      setSearchResults(patients);
      return;
    }
    
    const results = patients.filter(patient => 
      patient.name.toLowerCase().includes(term.toLowerCase()) ||
      patient.email.toLowerCase().includes(term.toLowerCase()) ||
      patient.phone.includes(term)
    );
    
    setSearchResults(results);
    
    if (results.length === 0) {
      toast({
        title: "No se encontraron resultados",
        description: `No hay pacientes que coincidan con "${term}"`,
      });
    }
  };

  return (
    <PatientsContext.Provider value={{ 
      patients, 
      searchResults, 
      addPatient, 
      updatePatient, 
      deletePatient, 
      getPatientById,
      searchPatients
    }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (context === undefined) {
    throw new Error("usePatients must be used within a PatientsProvider");
  }
  return context;
};
