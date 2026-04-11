import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import {
  LayoutDashboard, ShoppingBag, Gavel, Package, Heart, CreditCard, BarChart3,
  Activity, User, PlusCircle, Tag, Inbox, FileBarChart, Users, Shield, Grid3X3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
  divider?: boolean;
}

const getNavItems = (role: UserRole, watchlistCount: number): NavItem[] => {
  if (role === "VISITOR") {
    return [
      { label: "Browse Auctions", path: "/", icon: ShoppingBag },
      { label: "Categories", path: "/categories", icon: Grid3X3 },
    ];
  }
  if (role === "USER") {
    return [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "Browse Auctions", path: "/", icon: ShoppingBag },
      { label: "My Bids", path: "/my-bids", icon: Gavel, badge: 5 },
      { label: "My Listings", path: "/my-listings", icon: Package },
      { label: "Watchlist", path: "/watchlist", icon: Heart, badge: watchlistCount },
      { label: "Transactions", path: "/transactions", icon: CreditCard },
      { label: "Seller Statistics", path: "/seller-stats", icon: BarChart3 },
      { label: "Activity Log", path: "/activity", icon: Activity },
      { label: "Profile Settings", path: "/profile", icon: User, divider: true },
      { label: "Top-up Balance", path: "/topup", icon: PlusCircle },
    ];
  }
  const adminItems: NavItem[] = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Manage Auctions", path: "/admin/auctions", icon: Gavel },
    { label: "Manage Categories", path: "/admin/categories", icon: Tag },
    { label: "Top-up Requests", path: "/admin/topup-requests", icon: Inbox, badge: 2 },
    { label: "Reports", path: "/admin/reports", icon: FileBarChart },
    { label: "Activity Log", path: "/admin/activity", icon: Activity },
  ];
  if (role === "SYSTEM_ADMIN") {
    adminItems.splice(1, 0, { label: "Manage Users", path: "/admin/users", icon: Users });
    adminItems.push({ label: "Full System Log", path: "/admin/system-log", icon: Shield });
  }
  return adminItems;
};

export const AppSidebar = () => {
  const { role, watchlist } = useApp();
  const location = useLocation();
  const navItems = getNavItems(role, watchlist.length);

  return (
    <aside className="w-60 shrink-0 border-r bg-card hidden md:flex flex-col overflow-y-auto">
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <div key={item.path}>
              {item.divider && <div className="my-2 border-b" />}
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
