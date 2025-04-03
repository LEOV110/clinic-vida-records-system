
import { useState } from "react";
import { format, startOfToday, isToday, isEqual, isSameMonth, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { useConsultations } from "@/hooks/useConsultations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConsultationView from "./ConsultationView";

export default function ConsultationCalendar() {
  const { consultations } = useConsultations();
  const [currentMonth, setCurrentMonth] = useState(startOfToday());
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consultation = selectedConsultation 
    ? consultations.find(c => c.id === selectedConsultation) 
    : undefined;

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create array for the days
    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    
    // Add empty days at the beginning
    const emptyDays = Array(firstDay).fill(null);
    return [...emptyDays, ...days];
  };

  const getConsultationsForDay = (date: Date) => {
    if (!date) return [];
    return consultations.filter(c => {
      const consultDate = new Date(c.consultationDate);
      return isEqual(
        new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        new Date(consultDate.getFullYear(), consultDate.getMonth(), consultDate.getDate())
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="p-2 font-semibold bg-muted rounded-md">
            {day}
          </div>
        ))}
        
        {daysInMonth().map((day, i) => {
          const dayConsultations = day ? getConsultationsForDay(day) : [];
          
          return (
            <div 
              key={i}
              className={`p-2 min-h-[100px] border rounded-md ${
                day && isToday(day) 
                  ? "bg-accent border-primary" 
                  : day && !isSameMonth(day, currentMonth) 
                    ? "bg-muted text-muted-foreground" 
                    : ""
              }`}
            >
              {day && (
                <>
                  <div className="text-right">
                    {format(day, "d")}
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayConsultations.length > 0 ? (
                      dayConsultations.map((consult) => (
                        <div 
                          key={consult.id}
                          onClick={() => {
                            setSelectedConsultation(consult.id);
                            setIsModalOpen(true);
                          }}
                          className="p-1 bg-primary/10 hover:bg-primary/20 rounded text-xs cursor-pointer"
                        >
                          <div className="font-medium truncate">{consult.patientName}</div>
                          <div className="flex justify-between items-center">
                            <span>{format(new Date(consult.consultationDate), "HH:mm")}</span>
                            <Badge variant="outline" className="h-4 text-[10px]">
                              {consult.specialty.substring(0, 3)}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : null}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Consulta</DialogTitle>
          </DialogHeader>
          {consultation && <ConsultationView consultation={consultation} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
