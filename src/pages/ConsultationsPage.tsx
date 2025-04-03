
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import ConsultationForm from "@/components/consultations/ConsultationForm";
import ConsultationCalendar from "@/components/consultations/ConsultationCalendar";
import ConsultationTable from "@/components/consultations/ConsultationTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConsultationsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consultas</h1>
          <p className="text-muted-foreground">
            Programe y gestione consultas médicas
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Calendar className="mr-2 h-4 w-4" />
          Nueva Consulta
        </Button>
      </div>

      {showForm ? (
        <ConsultationForm onClose={() => setShowForm(false)} />
      ) : (
        <Tabs defaultValue="table">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="table">Lista</TabsTrigger>
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="table" className="mt-4">
            <ConsultationTable />
          </TabsContent>
          <TabsContent value="calendar" className="mt-4">
            <ConsultationCalendar />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
