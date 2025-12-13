import { Link, useLocation } from "react-router-dom";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ClientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/cotizar", label: "Cotizar" },
    { href: "/dashboard", label: "Mi Panel" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">SmartClean</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Chile B2B</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "text-sm",
                  location.pathname === item.href && "bg-primary/10 text-primary"
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/partner">
            <Button variant="outline" size="sm">
              Soy Partner
            </Button>
          </Link>
          <Link to="/cotizar">
            <Button variant="accent" size="sm">
              Cotizar Ahora
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.href && "bg-primary/10 text-primary"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <hr className="my-2" />
            <Link to="/partner" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Soy Partner
              </Button>
            </Link>
            <Link to="/cotizar" onClick={() => setIsMenuOpen(false)}>
              <Button variant="accent" className="w-full">
                Cotizar Ahora
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
