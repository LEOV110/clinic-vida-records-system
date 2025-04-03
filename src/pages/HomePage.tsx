
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Patient } from "@/types/patient";
import { usePatients } from "@/hooks/usePatients";
import { useConsultations } from "@/hooks/useConsultations";

const COLORS = ['#0087e6', '#FF6384', '#FFCE56'];

export default function HomePage() {
  const { patients } = usePatients();
  const { consultations } = useConsultations();
  const [genderData, setGenderData] = useState<Array<{ name: string; value: number }>>([]);
  
  useEffect(() => {
    if (patients.length > 0) {
      const maleCount = patients.filter(p => p.gender === "Masculino").length;
      const femaleCount = patients.filter(p => p.gender === "Femenino").length;
      const otherCount = patients.filter(p => p.gender === "Otro").length;
      
      setGenderData([
        { name: "Masculino", value: maleCount },
        { name: "Femenino", value: femaleCount },
        { name: "Otro", value: otherCount }
      ]);
    }
  }, [patients]);

  const stats = [
    { title: "Total Pacientes", value: patients.length, icon: "👥" },
    { title: "Consultas Próximas", value: consultations.length, icon: "📅" },
    { title: "Consultas de Hoy", value: consultations.filter(c => 
      new Date(c.consultationDate).toDateString() === new Date().toDateString()
    ).length, icon: "🕒" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido a Clínica Vida</h1>
          <p className="text-muted-foreground">
            Sistema de gestión de historial clínico
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="text-2xl">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Distribución de Pacientes por Género</CardTitle>
            <CardDescription>
              Resumen estadístico de los pacientes registrados
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {genderData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No hay datos para mostrar</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.slice(0, 3).map((consultation, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="rounded-full h-8 w-8 bg-primary flex items-center justify-center text-white">
                    📋
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {consultation.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(consultation.consultationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {consultations.length === 0 && (
                <p className="text-muted-foreground text-sm">No hay actividad reciente</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
