import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mockAuctions, mockCategories, getItem, getUser, getBidsForAuction } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { useCountdown } from "@/hooks/useCountdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Heart, Star, Clock, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-success text-success-foreground",
  ENDED: "bg-muted text-muted-foreground",
  SOLD: "bg-primary text-primary-foreground",
  UNSOLD: "bg-destructive text-destructive-foreground",
  CANCELLED: "bg-destructive/80 text-destructive-foreground",
};

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { role, watchlist, toggleWatchlist } = useApp();
  const [bidAmount, setBidAmount] = useState("");
  const [bidding, setBidding] = useState(false);

  const auction = mockAuctions.find(a => a.id === id);
  if (!auction) return <div className="p-8 text-center">Auction not found</div>;

  const item = getItem(auction.itemId);
  const seller = item ? getUser(item.sellerId) : null;
  const category = item ? mockCategories.find(c => c.id === item.categoryId) : null;
  const bids = getBidsForAuction(auction.id);
  const isWatched = watchlist.includes(auction.id);
  const { days, hours, minutes, seconds, expired } = useCountdown(auction.endDate);
  const minBid = auction.currentHighestBid + 10;
  const reserveMet = item?.reservePrice ? auction.currentHighestBid >= item.reservePrice : true;

  const handleBid = () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount < minBid) {
      toast.error(`Minimum bid is $${minBid.toFixed(2)}`);
      return;
    }
    setBidding(true);
    setTimeout(() => {
      setBidding(false);
      toast.success(`Bid of $${amount.toFixed(2)} placed successfully!`);
      setBidAmount("");
    }, 1500);
  };

  if (!item) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Auctions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="h-80 bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
              <Camera className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <div className="flex gap-2 p-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center">
                  <Camera className="h-5 w-5 text-muted-foreground/30" />
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="description" className="bg-card rounded-xl border p-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="seller">Seller Info</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
            </TabsContent>
            <TabsContent value="condition" className="mt-4">
              <Badge variant="outline" className="mb-2">{item.condition}</Badge>
              <p className="text-sm text-muted-foreground">This item is listed in {item.condition.toLowerCase()} condition.</p>
            </TabsContent>
            <TabsContent value="seller" className="mt-4">
              {seller && (
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">{seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{seller.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {seller.rating && <span className="flex items-center gap-0.5"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{seller.rating}</span>}
                      <span>·</span>
                      <span>{seller.salesCount} sales</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Member since {new Date(seller.joinedAt).getFullYear()}</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-xl border p-5 shadow-card space-y-4 lg:sticky lg:top-20">
            {category && (
              <p className="text-xs text-muted-foreground">
                <Link to="/" className="hover:text-primary">Home</Link> › {category.name}
              </p>
            )}
            <h1 className="text-xl font-bold text-foreground">{item.title}</h1>
            <Badge className={cn("text-xs", statusColors[auction.status])}>{auction.status}</Badge>

            {auction.status === "ACTIVE" && (
              <div className="bg-primary rounded-2xl p-4 text-primary-foreground text-center">
                <p className="text-xs opacity-80 mb-2">Time Remaining</p>
                <div className="flex justify-center gap-3">
                  {[{v: days, l: "Days"}, {v: hours, l: "Hrs"}, {v: minutes, l: "Min"}, {v: seconds, l: "Sec"}].map(t => (
                    <div key={t.l} className="text-center">
                      <div className="text-2xl font-bold">{String(t.v).padStart(2, "0")}</div>
                      <div className="text-[10px] opacity-70">{t.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Current Highest Bid</p>
              <p className="text-3xl font-bold text-primary">
                ${auction.currentHighestBid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{bids.length} bids</span>
                {item.reservePrice && (
                  <span className={cn("flex items-center gap-1", reserveMet ? "text-success" : "text-warning")}>
                    {reserveMet ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    {reserveMet ? "Reserve met" : "Reserve not met"}
                  </span>
                )}
              </div>
            </div>

            {auction.status === "ACTIVE" && (
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <input
                    type="number"
                    className="w-full h-10 pl-7 pr-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                    placeholder={`Min: $${minBid.toFixed(2)}`}
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    disabled={role === "VISITOR"}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum bid: ${minBid.toFixed(2)}</p>
                <Button className="w-full" disabled={role === "VISITOR" || bidding} onClick={handleBid}>
                  {bidding ? "Placing bid…" : role === "VISITOR" ? "Login to Bid" : "Place Bid"}
                </Button>
                {role === "VISITOR" && <p className="text-xs text-center text-muted-foreground">Create an account to place bids</p>}
              </div>
            )}

            {role !== "VISITOR" && (
              <Button variant="ghost" className="w-full" onClick={() => toggleWatchlist(auction.id)}>
                <Heart className={cn("h-4 w-4 mr-2", isWatched ? "fill-destructive text-destructive" : "")} />
                {isWatched ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Bid History */}
      <div className="bg-card rounded-xl border p-5 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Bid History</h2>
        {bids.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium text-muted-foreground">Bidder</th>
                  <th className="pb-2 font-medium text-muted-foreground">Amount</th>
                  <th className="pb-2 font-medium text-muted-foreground">Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, i) => {
                  const bidder = getUser(bid.bidderId);
                  const username = bidder?.username || "unknown";
                  const masked = username.length > 2 ? username[0] + "***" + username[username.length - 1] : username;
                  return (
                    <tr key={bid.id} className={cn("border-b last:border-0", i === 0 && "bg-primary/5")}>
                      <td className="py-2.5">
                        <span className="text-foreground">{masked}</span>
                        {i === 0 && <Badge className="ml-2 bg-success text-success-foreground text-[10px]">Leader</Badge>}
                      </td>
                      <td className="py-2.5 font-semibold text-foreground">${bid.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                      <td className="py-2.5 text-muted-foreground">{new Date(bid.createdAt).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No bids yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default AuctionDetail;
