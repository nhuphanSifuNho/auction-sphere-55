import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import {
  LayoutDashboard, ShoppingBag, Gavel, Package, Heart, CreditCard, BarChart3,
  Activity, User, PlusCircle, Tag, Inbox, FileBarChart, Users, Shield, Grid3X3,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
  badgeColor?: "primary" | "amber";
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const getNavGroups = (role: UserRole, watchlistCount: number): NavGroup[] => {
  if (role === "VISITOR") {
    return [{ title: "BROWSE", items: [
      { label: "Auction Listings", path: "/", icon: ShoppingBag },
      { label: "Categories", path: "/categories", icon: Grid3X3 },
    ]}];
  }
  if (role === "USER") {
    return [
      { title: "MAIN", items: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Browse Auctions", path: "/", icon: ShoppingBag },
      ]},
      { title: "BUYER", items: [
        { label: "My Bids", path: "/my-bids", icon: Gavel, badge: 3 },
        { label: "Watchlist", path: "/watchlist", icon: Heart, badge: watchlistCount },
        { label: "Transactions", path: "/transactions", icon: CreditCard },
      ]},
      { title: "SELLER", items: [
        { label: "My Listings", path: "/my-listings", icon: Package },
        { label: "Seller Statistics", path: "/seller-stats", icon: BarChart3 },
      ]},
      { title: "ACCOUNT", items: [
        { label: "Notifications", path: "/notifications", icon: Bell },
        { label: "Activity Log", path: "/activity", icon: Activity },
        { label: "Profile Settings", path: "/profile", icon: User },
        { label: "Top-up Balance", path: "/topup", icon: PlusCircle },
      ]},
    ];
  }

  const groups: NavGroup[] = [
    { title: "ADMIN", items: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { label: "Manage Auctions", path: "/admin/auctions", icon: Gavel },
      { label: "Manage Categories", path: "/admin/categories", icon: Tag },
    ]},
    { title: "REQUESTS", items: [
      { label: "Top-up Requests", path: "/admin/topup-requests", icon: Inbox, badge: 2, badgeColor: "amber" },
    ]},
    { title: "REPORTS", items: [
      { label: "Reports & Analytics", path: "/admin/reports", icon: FileBarChart },
    ]},
    { title: "ACCOUNT", items: [
      { label: "Activity Log", path: "/admin/activity", icon: Activity },
    ]},
  ];

  if (role === "SYSTEM_ADMIN") {
    groups.splice(1, 0, { title: "SYSTEM", items: [
      { label: "Manage Users", path: "/admin/users", icon: Users },
      { label: "System Activity Log", path: "/admin/system-log", icon: Shield },
    ]});
  }

  return groups;
};

export const AppSidebar = () => {
  const { role, watchlist, currentUser } = useApp();
  const location = useLocation();
  const navGroups = getNavGroups(role, watchlist.length);

  const roleBadgeLabel = role === "USER" ? "Buyer/Seller" : role === "AUCTION_ADMIN" ? "Auction Admin" : role === "SYSTEM_ADMIN" ? "Sys Admin" : "Visitor";

  return (
    <aside
      className="shrink-0 flex flex-col overflow-y-auto"
      style={{
        width: "var(--sidebar-width)",
        background: "hsl(var(--sidebar-background))",
        height: "calc(100vh - var(--topbar-height))",
      }}
    >
      {/* User info card */}
      {currentUser && (
        <div className="m-3 p-3.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {currentUser.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white truncate">{currentUser.name}</div>
              <Badge className="mt-0.5 text-[10px] h-[18px] bg-primary/20 text-primary border-0 font-medium">
                {roleBadgeLabel}
              </Badge>
            </div>
          </div>
          {role === "USER" && (
            <div className="mt-2.5 text-[11px] font-medium" style={{ color: "hsl(var(--accent))" }}>
              Balance: ${currentUser.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-4 space-y-5">
        {navGroups.map(group => (
          <div key={group.title}>
            <div
              className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em]"
              style={{ color: "hsl(235 12% 40%)" }}
            >
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-[9px] rounded-lg text-[13px] font-medium transition-all duration-100",
                      isActive
                        ? "text-white border-l-[3px] border-primary"
                        : "border-l-[3px] border-transparent hover:text-white/80"
                    )}
                    style={
                      isActive
                        ? { background: "rgba(99,102,241,0.12)" }
                        : undefined
                    }
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget.style.background = "rgba(255,255,255,0.05)");
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget.style.background = "");
                    }}
                  >
                    <item.icon className="h-4 w-4 shrink-0" style={{ color: isActive ? "white" : "hsl(var(--sidebar-foreground))" }} />
                    <span className="flex-1" style={{ color: isActive ? "white" : "hsl(var(--sidebar-foreground))" }}>{item.label}</span>
                    {item.badge != null && item.badge > 0 && (
                      <span className={cn(
                        "h-[18px] min-w-[18px] px-1.5 rounded-full text-[10px] font-semibold flex items-center justify-center",
                        item.badgeColor === "amber"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-primary/20 text-primary"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-3 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="text-[10px] font-medium" style={{ color: "hsl(235 12% 35%)" }}>v2.1.0</div>
      </div>
    </aside>
  );
};
