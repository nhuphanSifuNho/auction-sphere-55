import { mockAuctions, getItem, mockCategories } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { StatCard } from "@/components/shared/StatCard";
import { DollarSign, ShoppingBag, CheckCircle } from "lucide-react";

const statusTabs = ["All", "ACTIVE", "ENDED", "SOLD", "UNSOLD", "CANCELLED"] as const;
const statusColors: Record<string, string> = {
  ACTIVE: "bg-success/10 text-success", ENDED: "bg-muted text-muted-foreground",
  SOLD: "bg-primary/10 text-primary", UNSOLD: "bg-destructive/10 text-destructive",
  CANCELLED: "bg-destructive/10 text-destructive",
};

const MyListings = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<string>("All");
  if (!currentUser) return null;

  const myListings = mockAuctions
    .map(a => ({ auction: a, item: getItem(a.itemId)! }))
    .filter(({ item }) => item?.sellerId === currentUser.id)
    .filter(({ auction }) => activeTab === "All" || auction.status === activeTab);

  const totalRevenue = mockAuctions.filter(a => a.status === "SOLD" && getItem(a.itemId)?.sellerId === currentUser.id)
    .reduce((sum, a) => sum + (a.finalPrice || 0), 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
        <Link to="/listings/new"><Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create Listing</Button></Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Listed" value={myListings.length} icon={Package} />
        <StatCard title="Active" value={myListings.filter(l => l.auction.status === "ACTIVE").length} icon={ShoppingBag} />
        <StatCard title="Sold" value={myListings.filter(l => l.auction.status === "SOLD").length} icon={CheckCircle} />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} />
      </div>

      <div className="flex gap-1 bg-secondary p-1 rounded-lg w-fit overflow-x-auto">
        {statusTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors", activeTab === tab ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}>
            {tab === "All" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-4 font-medium text-muted-foreground">Item</th>
            <th className="p-4 font-medium text-muted-foreground">Category</th>
            <th className="p-4 font-medium text-muted-foreground">Starting</th>
            <th className="p-4 font-medium text-muted-foreground">Current</th>
            <th className="p-4 font-medium text-muted-foreground">Bids</th>
            <th className="p-4 font-medium text-muted-foreground">Status</th>
          </tr></thead>
          <tbody>
            {myListings.map(({ auction, item }) => (
              <tr key={auction.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4"><Link to={`/auction/${auction.id}`} className="font-medium hover:text-primary">{item.title}</Link></td>
                <td className="p-4 text-muted-foreground">{mockCategories.find(c => c.id === item.categoryId)?.name}</td>
                <td className="p-4">${item.startingPrice.toFixed(2)}</td>
                <td className="p-4 font-semibold">${auction.currentHighestBid.toFixed(2)}</td>
                <td className="p-4">{auction.bids.length}</td>
                <td className="p-4"><Badge className={statusColors[auction.status]}>{auction.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListings;
