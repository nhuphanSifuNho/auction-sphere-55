import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Bell, Search, Gavel, ChevronDown, Eye, User, Hammer, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { UserRole } from "@/types";
import { toast } from "sonner";

const roleOptions: { role: UserRole; label: string; desc: string; icon: React.ElementType }[] = [
  { role: "VISITOR", label: "Browse as Visitor", desc: "View-only access", icon: Eye },
  { role: "USER", label: "Registered User — John Doe", desc: "Buy & sell", icon: User },
  { role: "AUCTION_ADMIN", label: "Auction Administrator", desc: "Manage auctions", icon: Hammer },
  { role: "SYSTEM_ADMIN", label: "System Administrator", desc: "Full access", icon: Shield },
];

const roleDisplayName: Record<UserRole, string> = {
  VISITOR: "Visitor",
  USER: "John Doe · Buyer/Seller",
  AUCTION_ADMIN: "Auction Admin",
  SYSTEM_ADMIN: "System Admin",
};

export const Navbar = () => {
  const { role, setRole, currentUser, unreadCount } = useApp();

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    toast.success(`Switched to ${roleDisplayName[newRole]}`);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center border-b border-border bg-card" style={{ height: "var(--topbar-height)" }}>
      {/* Logo section — dark bg matching sidebar */}
      <div
        className="flex items-center gap-2.5 px-5 h-full shrink-0 border-r"
        style={{ width: "var(--sidebar-width)", background: "hsl(var(--sidebar-background))" }}
      >
        <Gavel className="h-5 w-5 text-primary" />
        <span className="text-[15px] font-extrabold text-white tracking-tight">AuctionHub</span>
      </div>

      {/* Center search */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-[480px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="w-full h-9 pl-10 pr-16 rounded-[7px] border bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            placeholder="Search auctions, items, users… (Ctrl+K)"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-card border rounded px-1.5 py-0.5 font-mono">Ctrl+K</kbd>
        </div>
      </div>

      {/* Right group */}
      <div className="flex items-center gap-3 pr-5 shrink-0">
        {role !== "VISITOR" && (
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-medium animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
          </Link>
        )}

        <div className="w-px h-6 bg-border" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs font-medium px-3">
              <span>{roleDisplayName[role]}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roleOptions.map(opt => (
              <DropdownMenuItem
                key={opt.role}
                onClick={() => handleRoleSwitch(opt.role)}
                className={`gap-3 py-2.5 ${role === opt.role ? "bg-primary/10" : ""}`}
              >
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${role === opt.role ? "border-primary" : "border-muted-foreground/30"}`}>
                  {role === opt.role && <div className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${role === opt.role ? "text-primary" : ""}`}>{opt.label}</div>
                  <div className="text-[11px] text-muted-foreground">{opt.desc}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {currentUser && (
          <Link to="/profile">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {currentUser.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </header>
  );
};
