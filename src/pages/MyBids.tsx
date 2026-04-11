import { mockBids, mockAuctions, getItem } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, Gavel } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const statusTabs = ["All", "Winning", "Outbid", "Won", "Lost"] as const;

const MyBids = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<string>("All");
  if (!currentUser) return null;

  const userBids = mockBids
    .filter(b => b.bidderId === currentUser.id)
    .map(bid => {
      const auction = mockAuctions.find(a => a.id === bid.auctionId);
      const item = auction ? getItem(auction.itemId) : null;
      const isHighest = auction ? bid.amount === auction.currentHighestBid : false;
      let status: string;
      if (auction?.status === "SOLD" && auction.winnerId === currentUser.id) status = "Won";
      else if (auction?.status === "SOLD" || auction?.status === "ENDED" || auction?.status === "UNSOLD") status = "Lost";
      else if (isHighest) status = "Winning";
      else status = "Outbid";
      return { bid, auction, item, status };
    })
    .filter(b => activeTab === "All" || b.status === activeTab);

  const statusColor: Record<string, string> = {
    Winning: "bg-success/10 text-success",
    Outbid: "bg-destructive/10 text-destructive",
    Won: "bg-primary/10 text-primary",
    Lost: "bg-muted text-muted-foreground",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Bids</h1>
        <Button variant="ghost" size="sm"><Download className="h-4 w-4 mr-1.5" />Export CSV</Button>
      </div>

      <div className="flex gap-1 bg-secondary p-1 rounded-lg w-fit">
        {statusTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", activeTab === tab ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {tab}
          </button>
        ))}
      </div>

      {userBids.length > 0 ? (
        <div className="bg-card rounded-xl border shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-4 font-medium text-muted-foreground">Item</th>
                <th className="p-4 font-medium text-muted-foreground">My Bid</th>
                <th className="p-4 font-medium text-muted-foreground">Current Highest</th>
                <th className="p-4 font-medium text-muted-foreground">Status</th>
                <th className="p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userBids.map(({ bid, auction, item, status }) => (
                <tr key={bid.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4">
                    <Link to={`/auction/${auction?.id}`} className="font-medium text-foreground hover:text-primary">
                      {item?.title || "Unknown"}
                    </Link>
                  </td>
                  <td className="p-4 font-semibold">${bid.amount.toFixed(2)}</td>
                  <td className="p-4">${auction?.currentHighestBid.toFixed(2)}</td>
                  <td className="p-4"><Badge className={statusColor[status]}>{status}</Badge></td>
                  <td className="p-4">
                    <Link to={`/auction/${auction?.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 border-2 border-dashed rounded-xl">
          <Gavel className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="font-semibold text-foreground">No bids found</h3>
          <p className="text-sm text-muted-foreground">Start bidding on auctions to see them here</p>
        </div>
      )}
    </div>
  );
};

export default MyBids;
