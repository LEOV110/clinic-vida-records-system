
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { usePatients } from "@/hooks/usePatients";
import { useConsultations } from "@/hooks/useConsultations";
import { useState, useEffect } from "react";

const COLORS = ['#0087e6', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function ReportsPage() {
  const { patients } = usePatients();
  const { consultations } = useConsultations();

  const [specialtyData, setSpecialtyData] = useState<Array<{ name: string; value: number }>>([]);
  const [monthlyData, setMonthlyData] = useState<Array<{ name: string; consultations: number }>>([]);

  useEffect(() => {
    // Prepare specialty data
    if (consultations.length > 0) {
      const specialtyCounts: Record<string, number> = {};
      
      consultations.forEach(consultation => {
        specialtyCounts[consultation.specialty] = (specialtyCounts[consultation.specialty] || 0) + 1;
      });

      const data = Object.keys(specialtyCounts).map(specialty => ({
        name: specialty,
        value: specialtyCounts[specialty]
      }));

      setSpecialtyData(data);
    }

    // Prepare monthly data
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthlyCounts = Array(12).fill(0);

    consultations.forEach(consultation => {
      const date = new Date(consultation.consultationDate);
      const month = date.getMonth();
      monthlyCounts[month]++;
    });

    const data = months.map((month, index) => ({
      name: month,
      consultations: monthlyCounts[index]
    }));

    setMonthlyData(data);
  }, [consultations]);

  // Count patients by gender
  const maleCount = patients.filter(p => p.gender === "Masculino").length;
  const femaleCount = patients.filter(p => p.gender === "Femenino").length;
  const otherCount = patients.filter(p => p.gender === "Otro").length;
  
  // Count patients by condition
  const diabetesCount = patients.filter(p => p.conditions.includes("Diabetes")).length;
  const hypertensionCount = patients.filter(p => p.conditions.includes("Hipertensión")).length;
  const otherConditionsCount = patients.filter(p => p.conditions.includes("Otros")).length;

  const genderData = [
    { name: "Masculino", value: maleCount },
    { name: "Femenino", value: femaleCount },
    { name: "Otro", value: otherCount }
  ].filter(item => item.value > 0);

  const conditionData = [
    { name: "Diabetes", value: diabetesCount },
    { name: "Hipertensión", value: hypertensionCount },
    { name: "Otros", value: otherConditionsCount }
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Informes</h1>
        <p className="text-muted-foreground">
          Estadísticas y análisis de pacientes y consultas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pacientes con Diabetes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{diabetesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pacientes con Hipertensión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hypertensionCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribución por Género</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {genderData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
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
                <p className="text-muted-foreground">No hay datos disponibles</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Condiciones Médicas</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {conditionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conditionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {conditionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No hay datos disponibles</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Consultas por Mes</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="consultations" name="Consultas" fill="#0087e6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No hay datos disponibles</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Consultas por Especialidad</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          {specialtyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={specialtyData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Consultas" fill="#0087e6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No hay datos disponibles</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
