
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { toast } = useToast();
  const [clinicName, setClinicName] = useState("Clínica Vida");
  const [email, setEmail] = useState("admin@clinicavida.com");
  const [phone, setPhone] = useState("+34 912345678");
  const [showNotifications, setShowNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const handleProfileSave = () => {
    toast({
      title: "Perfil actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    });
  };

  const handlePreferencesSave = () => {
    toast({
      title: "Preferencias actualizadas",
      description: "Las preferencias han sido actualizadas exitosamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administre la configuración de su cuenta y preferencias del sistema
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Clínica</CardTitle>
              <CardDescription>
                Actualice la información de contacto y detalles de la clínica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinic-name">Nombre de la Clínica</Label>
                <Input 
                  id="clinic-name" 
                  value={clinicName} 
                  onChange={e => setClinicName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleProfileSave}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>
                Personalice su experiencia con la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificaciones</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificaciones de nuevas consultas y actualizaciones
                  </p>
                </div>
                <Switch 
                  id="notifications"
                  checked={showNotifications}
                  onCheckedChange={setShowNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Modo Oscuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Activar el tema oscuro en la aplicación
                  </p>
                </div>
                <Switch 
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSave">Auto-guardado</Label>
                  <p className="text-sm text-muted-foreground">
                    Guardar automáticamente los cambios en formularios
                  </p>
                </div>
                <Switch 
                  id="autoSave"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handlePreferencesSave}>Guardar Preferencias</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                Gestione la seguridad de su cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Cambiar Contraseña</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistema</CardTitle>
              <CardDescription>
                Configuración avanzada del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Exportar Datos</Label>
                <p className="text-sm text-muted-foreground">
                  Descargue una copia de todos los datos de pacientes y consultas
                </p>
                <Button variant="outline" className="mt-2">
                  Exportar Datos
                </Button>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <Label>Importar Datos</Label>
                <p className="text-sm text-muted-foreground">
                  Importe datos de pacientes y consultas desde un archivo
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Input id="import-file" type="file" />
                  <Button>Importar</Button>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <Label className="text-destructive">Zona de Peligro</Label>
                <p className="text-sm text-muted-foreground">
                  Eliminar todos los datos del sistema. Esta acción no se puede deshacer.
                </p>
                <Button variant="destructive" className="mt-2">
                  Eliminar Todos los Datos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
