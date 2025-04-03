
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="container mx-auto animate-fade">
          <Outlet />
        </div>
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
}
