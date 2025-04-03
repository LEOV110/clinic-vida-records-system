
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Búsqueda iniciada",
      description: `Buscando: "${searchQuery}"`,
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Mensaje enviado",
      description: "Su mensaje ha sido enviado al soporte técnico.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ayuda</h1>
        <p className="text-muted-foreground">
          Centro de ayuda y soporte técnico
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input 
                  type="search" 
                  placeholder="Buscar ayuda..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-56"
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Cómo registro un nuevo paciente?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Para registrar un nuevo paciente, vaya a la sección "Pacientes" y haga clic en el botón "Nuevo Paciente". Complete el formulario con la información personal y médica del paciente y guarde los cambios.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    También puede subir una foto del paciente para facilitar su identificación.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo programo una consulta médica?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Para programar una consulta, vaya a la sección "Consultas" y haga clic en "Nueva Consulta". Seleccione el paciente, la fecha y hora, la especialidad y añada cualquier nota relevante.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Las consultas programadas aparecerán tanto en la vista de lista como en el calendario.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Cómo puedo generar informes?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Los informes se generan automáticamente en la sección "Informes" basados en los datos de pacientes y consultas registrados en el sistema.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Puede ver estadísticas sobre la distribución de pacientes por género, condiciones médicas y consultas por mes y especialidad.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Cómo puedo exportar los datos de los pacientes?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Para exportar datos, vaya a "Configuración" y seleccione la pestaña "Sistema". Allí encontrará la opción para exportar todos los datos en formato CSV o JSON.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Esta función es útil para realizar copias de seguridad o para migrar datos a otros sistemas.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>¿Es segura la información de los pacientes?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Sí, toda la información de los pacientes está protegida por medidas de seguridad avanzadas. El acceso está restringido a usuarios autorizados y los datos se almacenan de forma segura.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Puede gestionar la configuración de seguridad en la sección "Configuración" bajo la pestaña "Seguridad".
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contacto de Soporte</CardTitle>
              <CardDescription>
                Contáctenos si necesita ayuda adicional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email:</label>
                <p className="text-sm text-muted-foreground">soporte@clinicavida.com</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Teléfono:</label>
                <p className="text-sm text-muted-foreground">+34 900 123 456</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Horario:</label>
                <p className="text-sm text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
              </div>
              <Button className="w-full" onClick={handleContactSupport}>
                Enviar Mensaje
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recursos</CardTitle>
              <CardDescription>
                Documentación y tutoriales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="#" className="block text-primary hover:underline py-2">
                🎓 Tutorial de inicio rápido
              </a>
              <a href="#" className="block text-primary hover:underline py-2">
                📄 Manual de usuario
              </a>
              <a href="#" className="block text-primary hover:underline py-2">
                🎬 Videos tutoriales
              </a>
              <a href="#" className="block text-primary hover:underline py-2">
                📱 Descarga la app móvil
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
