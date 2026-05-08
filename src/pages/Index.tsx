import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { mockAuctions, mockCategories, getItem, getCategory } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCountdown } from "@/hooks/useCountdown";
import { X } from "lucide-react";
import type { Auction, ItemCondition } from "@/types";

const conditions: (ItemCondition | "ALL")[] = ["ALL", "NEW", "USED", "REFURBISHED"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Ending Soon", value: "ending" },
  { label: "Price: Low-High", value: "price-asc" },
  { label: "Price: High-Low", value: "price-desc" },
  { label: "Most Bids", value: "bids" },
];

const AuctionRow = ({ auction }: { auction: Auction }) => {
  const item = getItem(auction.itemId);
  const category = item ? getCategory(item.categoryId) : null;
  const { days, hours, minutes, expired } = useCountdown(auction.endDate);
  if (!item) return null;
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={`/auction/${auction.id}`} className="hover:text-primary">{item.title}</Link>
      </TableCell>
      <TableCell>{category?.name ?? "—"}</TableCell>
      <TableCell><Badge variant="secondary">{item.condition}</Badge></TableCell>
      <TableCell className="text-right font-semibold">${auction.currentHighestBid.toFixed(2)}</TableCell>
      <TableCell className="text-right">{auction.bids.length}</TableCell>
      <TableCell>{expired ? "Ended" : `${days}d ${hours}h ${minutes}m`}</TableCell>
      <TableCell className="text-right">
        <Button size="sm" asChild><Link to={`/auction/${auction.id}`}>View</Link></Button>
      </TableCell>
    </TableRow>
  );
};

const AuctionListings = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState<ItemCondition | "ALL">("ALL");
  const [sortBy, setSortBy] = useState("newest");

  const activeAuctions = useMemo(() => {
    let filtered = mockAuctions.filter(a => a.status === "ACTIVE");
    if (categoryFilter !== "all") {
      filtered = filtered.filter(a => {
        const item = getItem(a.itemId);
        return item?.categoryId === categoryFilter;
      });
    }
    if (conditionFilter !== "ALL") {
      filtered = filtered.filter(a => getItem(a.itemId)?.condition === conditionFilter);
    }
    if (sortBy === "ending") filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    if (sortBy === "price-asc") filtered.sort((a, b) => a.currentHighestBid - b.currentHighestBid);
    if (sortBy === "price-desc") filtered.sort((a, b) => b.currentHighestBid - a.currentHighestBid);
    if (sortBy === "bids") filtered.sort((a, b) => b.bids.length - a.bids.length);
    return filtered;
  }, [categoryFilter, conditionFilter, sortBy]);

  const hasFilters = categoryFilter !== "all" || conditionFilter !== "ALL";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Active Auctions</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse items currently up for bid</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border">
        <select
          className="h-9 px-3 rounded-md border bg-background text-sm"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {mockCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select
          className="h-9 px-3 rounded-md border bg-background text-sm"
          value={conditionFilter}
          onChange={e => setConditionFilter(e.target.value as ItemCondition | "ALL")}
        >
          {conditions.map(c => <option key={c} value={c}>{c === "ALL" ? "All Conditions" : c}</option>)}
        </select>

        <select
          className="h-9 px-3 rounded-md border bg-background text-sm ml-auto"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => { setCategoryFilter("all"); setConditionFilter("ALL"); }}>
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground">Showing {activeAuctions.length} auctions</p>

      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead className="text-right">Current Bid</TableHead>
              <TableHead className="text-right">Bids</TableHead>
              <TableHead>Ends In</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeAuctions.length > 0 ? (
              activeAuctions.map(a => <AuctionRow key={a.id} auction={a} />)
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No auctions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AuctionListings;
