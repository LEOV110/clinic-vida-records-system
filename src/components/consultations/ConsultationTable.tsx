
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash, MoreHorizontal, FileText } from "lucide-react";
import { useConsultations } from "@/hooks/useConsultations";
import ConsultationForm from "./ConsultationForm";
import ConsultationView from "./ConsultationView";

export default function ConsultationTable() {
  const { consultations, deleteConsultation } = useConsultations();
  const { toast } = useToast();
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    if (selectedConsultation) {
      deleteConsultation(selectedConsultation);
      toast({
        title: "Consulta eliminada",
        description: "La consulta ha sido eliminada exitosamente.",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const consultation = selectedConsultation 
    ? consultations.find(c => c.id === selectedConsultation) 
    : undefined;

  // Helper function to determine if a consultation is upcoming, today, or past
  const getConsultationStatus = (dateStr: string) => {
    const consultDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (consultDate < today) {
      return { label: "Pasada", variant: "outline" as const };
    } else if (consultDate.toDateString() === today.toDateString()) {
      return { label: "Hoy", variant: "default" as const };
    } else {
      return { label: "Próxima", variant: "secondary" as const };
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Fecha y Hora</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Documentos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay consultas programadas
                </TableCell>
              </TableRow>
            ) : (
              consultations.map((consultation) => {
                const status = getConsultationStatus(consultation.consultationDate);
                
                return (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">{consultation.patientName}</TableCell>
                    <TableCell>
                      {new Date(consultation.consultationDate).toLocaleString()}
                    </TableCell>
                    <TableCell>{consultation.specialty}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      {consultation.document ? (
                        <a 
                          href={consultation.document} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center text-primary hover:underline"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Ver
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Ninguno</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedConsultation(consultation.id);
                            setIsViewOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedConsultation(consultation.id);
                            setIsEditOpen(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive" 
                            onClick={() => {
                              setSelectedConsultation(consultation.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Consulta</DialogTitle>
          </DialogHeader>
          {consultation && <ConsultationView consultation={consultation} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Consulta</DialogTitle>
          </DialogHeader>
          {consultation && (
            <ConsultationForm 
              consultation={consultation} 
              onClose={() => setIsEditOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de eliminar esta consulta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La consulta será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
