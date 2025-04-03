
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import PatientsPage from "./pages/PatientsPage";
import ConsultationsPage from "./pages/ConsultationsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import NotFound from "./pages/NotFound";
import { PatientsProvider } from "./hooks/usePatients";
import { ConsultationsProvider } from "./hooks/useConsultations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PatientsProvider>
      <ConsultationsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="patients" element={<PatientsPage />} />
              <Route path="consultations" element={<ConsultationsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </ConsultationsProvider>
    </PatientsProvider>
  </QueryClientProvider>
);

export default App;
