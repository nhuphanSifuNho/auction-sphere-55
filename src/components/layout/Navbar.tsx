import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Bell, Search, Gavel, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { UserRole } from "@/types";

const roleLabels: Record<UserRole, string> = {
  VISITOR: "Visitor",
  USER: "John Doe",
  AUCTION_ADMIN: "Auction Admin",
  SYSTEM_ADMIN: "System Admin",
};

const roleOptions: { role: UserRole; label: string; desc: string }[] = [
  { role: "VISITOR", label: "Browse as Visitor", desc: "View-only access" },
  { role: "USER", label: "Login as User (John Doe)", desc: "Buy & sell" },
  { role: "AUCTION_ADMIN", label: "Login as Auction Admin", desc: "Manage auctions" },
  { role: "SYSTEM_ADMIN", label: "Login as System Admin", desc: "Full access" },
];

export const Navbar = () => {
  const { role, setRole, currentUser, unreadCount } = useApp();

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-card flex items-center px-4 gap-4">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <Gavel className="h-6 w-6 text-primary" />
        <span className="text-lg font-extrabold text-foreground">AuctionHub</span>
      </Link>

      <div className="flex-1 max-w-md mx-auto hidden md:flex">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="w-full h-10 pl-10 pr-12 rounded-lg border bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            placeholder="Search auctions, items, sellers…"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-card border rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {role !== "VISITOR" && (
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Badge variant="secondary" className="text-xs font-medium">
                {role === "VISITOR" ? "Visitor" : role === "USER" ? "User" : role === "AUCTION_ADMIN" ? "Admin" : "Sys Admin"}
              </Badge>
              <span className="hidden sm:inline text-sm">{roleLabels[role]}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {roleOptions.map(opt => (
              <DropdownMenuItem key={opt.role} onClick={() => setRole(opt.role)} className={role === opt.role ? "bg-primary/10" : ""}>
                <div>
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs text-muted-foreground">{opt.desc}</div>
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
