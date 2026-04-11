import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { Bell, Gavel, Trophy, CreditCard, PlusCircle, XCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { NotificationType } from "@/types";

const typeIcons: Record<NotificationType, { icon: typeof Bell; color: string }> = {
  OUTBID: { icon: Gavel, color: "text-destructive" },
  AUCTION_WON: { icon: Trophy, color: "text-success" },
  PAYMENT_PROCESSED: { icon: CreditCard, color: "text-success" },
  TOPUP_APPROVED: { icon: PlusCircle, color: "text-success" },
  TOPUP_REJECTED: { icon: XCircle, color: "text-destructive" },
  AUCTION_ENDING: { icon: Clock, color: "text-warning" },
  ITEM_MODERATED: { icon: Shield, color: "text-primary" },
};

const tabs = ["All", "Unread", "Bids", "Auctions", "Payments"] as const;

const Notifications = () => {
  const { currentUser, notifications, markAsRead, markAllRead } = useApp();
  const [activeTab, setActiveTab] = useState<string>("All");
  if (!currentUser) return null;

  const filtered = notifications
    .filter(n => n.userId === currentUser.id)
    .filter(n => {
      if (activeTab === "All") return true;
      if (activeTab === "Unread") return !n.read;
      if (activeTab === "Bids") return n.type === "OUTBID";
      if (activeTab === "Auctions") return ["AUCTION_WON", "AUCTION_ENDING"].includes(n.type);
      if (activeTab === "Payments") return ["PAYMENT_PROCESSED", "TOPUP_APPROVED", "TOPUP_REJECTED"].includes(n.type);
      return true;
    });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all as read</Button>
      </div>

      <div className="flex gap-1 bg-secondary p-1 rounded-lg w-fit">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-colors", activeTab === tab ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(n => {
          const { icon: Icon, color } = typeIcons[n.type] || { icon: Bell, color: "text-muted-foreground" };
          return (
            <div key={n.id} onClick={() => markAsRead(n.id)}
              className={cn("flex items-start gap-3 p-4 rounded-xl bg-card border shadow-card cursor-pointer transition-colors hover:bg-muted/50",
                !n.read && "border-l-2 border-l-primary bg-primary/5")}>
              <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", color)} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.read && <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No notifications</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
