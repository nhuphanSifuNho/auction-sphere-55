import { useState, useMemo } from "react";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { mockAuctions, mockCategories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gavel, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItemCondition } from "@/types";

const conditions: (ItemCondition | "ALL")[] = ["ALL", "NEW", "USED", "REFURBISHED"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Ending Soon", value: "ending" },
  { label: "Price: Low-High", value: "price-asc" },
  { label: "Price: High-Low", value: "price-desc" },
  { label: "Most Bids", value: "bids" },
];

const AuctionListings = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState<ItemCondition | "ALL">("ALL");
  const [sortBy, setSortBy] = useState("newest");

  const activeAuctions = useMemo(() => {
    let filtered = mockAuctions.filter(a => a.status === "ACTIVE");
    // Simple sort
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
        <p className="text-sm text-muted-foreground mt-1">Discover unique items up for bid right now</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-xl border shadow-card">
        <select
          className="h-9 px-3 rounded-lg border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {mockCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <div className="flex gap-1">
          {conditions.map(c => (
            <button
              key={c}
              onClick={() => setConditionFilter(c)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                conditionFilter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-muted"
              )}
            >
              {c === "ALL" ? "All" : c.charAt(0) + c.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <select
          className="h-9 px-3 rounded-lg border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ml-auto"
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

      {activeAuctions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-xl">
          <Gavel className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No auctions found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or check back later</p>
          <Button variant="outline" className="mt-4" onClick={() => { setCategoryFilter("all"); setConditionFilter("ALL"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuctionListings;
