
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus } from "lucide-react";
import PatientForm from "@/components/patients/PatientForm";
import PatientTable from "@/components/patients/PatientTable";
import { usePatients } from "@/hooks/usePatients";

export default function PatientsPage() {
  const { patients, searchPatients } = usePatients();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPatients(searchTerm);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground">
            Gestione la información de sus pacientes
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Paciente
        </Button>
      </div>

      {showForm ? (
        <PatientForm onClose={() => setShowForm(false)} />
      ) : (
        <>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Buscar pacientes..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit">Buscar</Button>
          </form>

          <PatientTable />
        </>
      )}
    </div>
  );
}
