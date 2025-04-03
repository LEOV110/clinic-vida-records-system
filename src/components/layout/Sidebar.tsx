
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart4, 
  Settings, 
  HelpCircle, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
};

const NavItem = ({ to, icon: Icon, label, isCollapsed, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Inicio" },
    { to: "/patients", icon: Users, label: "Pacientes" },
    { to: "/consultations", icon: Calendar, label: "Consultas" },
    { to: "/reports", icon: BarChart4, label: "Informes" },
    { to: "/settings", icon: Settings, label: "Configuración" },
    { to: "/help", icon: HelpCircle, label: "Ayuda" }
  ];

  return (
    <aside 
      className={cn(
        "flex flex-col bg-sidebar h-screen transition-all duration-300 border-r border-sidebar-border",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h1 className="text-lg font-semibold text-sidebar-foreground">
            Clínica Vida
          </h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {isCollapsed ? <Menu /> : <X />}
        </Button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            isActive={location.pathname === item.to}
          />
        ))}
      </nav>
    </aside>
  );
}
