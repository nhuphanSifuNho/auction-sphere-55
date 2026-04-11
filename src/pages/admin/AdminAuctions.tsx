import { mockAuctions, getItem, getUser, mockCategories } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const statusTabs = ["All", "ACTIVE", "ENDED", "SOLD", "UNSOLD", "CANCELLED"] as const;
const statusColors: Record<string, string> = {
  ACTIVE: "bg-success/10 text-success", ENDED: "bg-muted text-muted-foreground",
  SOLD: "bg-primary/10 text-primary", UNSOLD: "bg-destructive/10 text-destructive",
  CANCELLED: "bg-destructive/10 text-destructive",
};

const AdminAuctions = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const auctions = mockAuctions.filter(a => activeTab === "All" || a.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Manage Auctions</h1>

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
            <th className="p-4 font-medium text-muted-foreground">Seller</th>
            <th className="p-4 font-medium text-muted-foreground">Category</th>
            <th className="p-4 font-medium text-muted-foreground">Current Bid</th>
            <th className="p-4 font-medium text-muted-foreground">Bids</th>
            <th className="p-4 font-medium text-muted-foreground">Status</th>
            <th className="p-4 font-medium text-muted-foreground">End Date</th>
            <th className="p-4 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {auctions.map(a => {
              const item = getItem(a.itemId);
              const seller = item ? getUser(item.sellerId) : null;
              const cat = item ? mockCategories.find(c => c.id === item.categoryId) : null;
              return (
                <tr key={a.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{item?.title}</td>
                  <td className="p-4 text-muted-foreground">{seller?.name}</td>
                  <td className="p-4 text-muted-foreground">{cat?.name}</td>
                  <td className="p-4 font-semibold">${a.currentHighestBid.toFixed(2)}</td>
                  <td className="p-4">{a.bids.length}</td>
                  <td className="p-4"><Badge className={statusColors[a.status]}>{a.status}</Badge></td>
                  <td className="p-4 text-muted-foreground">{new Date(a.endDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    {a.status === "ENDED" ? (
                      <Button size="sm" variant="outline" onClick={() => toast.success("Auction processed")}>Process</Button>
                    ) : (
                      <Button size="sm" variant="ghost">Edit</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAuctions;
