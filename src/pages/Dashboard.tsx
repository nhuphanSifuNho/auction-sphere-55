import { Link } from "react-router-dom";
import { StatCard } from "@/components/shared/StatCard";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { mockAuctions, mockBids, mockNotifications, getItem } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { Gavel, Heart, Trophy, Wallet, Clock, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { currentUser, watchlist, notifications } = useApp();
  if (!currentUser) return null;

  const userBids = mockBids.filter(b => b.bidderId === currentUser.id);
  const activeBidAuctions = [...new Set(userBids.map(b => b.auctionId))]
    .map(aId => mockAuctions.find(a => a.id === aId && a.status === "ACTIVE"))
    .filter(Boolean);

  const wonAuctions = mockAuctions.filter(a => a.winnerId === currentUser.id);
  const watchedAuctions = mockAuctions.filter(a => watchlist.includes(a.id));
  const userNotifications = notifications.filter(n => n.userId === currentUser.id).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Bids" value={activeBidAuctions.length} icon={Gavel} trend="↑ 2 new today" trendUp />
        <StatCard title="Watchlist Items" value={watchlist.length} icon={Heart} subtitle="3 ending soon" />
        <StatCard title="Won Auctions" value={wonAuctions.length} icon={Trophy} subtitle="this month" />
        <StatCard title="Account Balance" value={`$${currentUser.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} icon={Wallet} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Active Bids */}
        <div className="lg:col-span-3 bg-card rounded-xl border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">My Active Bids</h2>
            <Link to="/my-bids" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium text-muted-foreground">Item</th>
                  <th className="pb-2 font-medium text-muted-foreground">Current Bid</th>
                  <th className="pb-2 font-medium text-muted-foreground">My Bid</th>
                  <th className="pb-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeBidAuctions.slice(0, 5).map(auction => {
                  if (!auction) return null;
                  const item = getItem(auction.itemId);
                  const myBid = userBids.filter(b => b.auctionId === auction.id).sort((a, b) => b.amount - a.amount)[0];
                  const isWinning = myBid && myBid.amount === auction.currentHighestBid;
                  return (
                    <tr key={auction.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-2.5">
                        <Link to={`/auction/${auction.id}`} className="font-medium text-foreground hover:text-primary">
                          {item?.title}
                        </Link>
                      </td>
                      <td className="py-2.5">${auction.currentHighestBid.toFixed(2)}</td>
                      <td className="py-2.5 font-semibold">${myBid?.amount.toFixed(2)}</td>
                      <td className="py-2.5">
                        <Badge className={isWinning ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}>
                          {isWinning ? "Winning" : "Outbid"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Watchlist */}
        <div className="lg:col-span-2 bg-card rounded-xl border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Watchlist</h2>
            <Link to="/watchlist" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {watchedAuctions.slice(0, 4).map(auction => {
              const item = getItem(auction.itemId);
              return (
                <Link key={auction.id} to={`/auction/${auction.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item?.title}</p>
                    <p className="text-xs text-muted-foreground">${auction.currentHighestBid.toFixed(2)}</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 h-7 text-xs">Bid</Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-card rounded-xl border p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Notifications</h2>
          <Link to="/notifications" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {userNotifications.map(n => (
            <div key={n.id} className={cn("flex items-start gap-3 p-3 rounded-lg", !n.read && "bg-primary/5 border-l-2 border-primary")}>
              <Bell className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
