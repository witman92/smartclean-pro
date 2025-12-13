import { Link, useLocation } from "react-router-dom";
import { Sparkles, User, Briefcase, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function PartnerHeader() {
  const location = useLocation();

  const navItems = [
    { href: "/partner", label: "Trabajos", icon: Briefcase },
    { href: "/partner/perfil", label: "Perfil", icon: User },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold">SmartClean Partner</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-6 w-6", isActive && "fill-primary/20")} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
