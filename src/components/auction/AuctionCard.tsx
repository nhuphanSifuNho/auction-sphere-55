import { Link } from "react-router-dom";
import { Heart, Clock, Camera, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApp } from "@/contexts/AppContext";
import { useCountdown } from "@/hooks/useCountdown";
import { getItem, getUser, getCategory, type Auction } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { AuctionStatus, ItemCondition } from "@/types";

const statusColors: Record<AuctionStatus, string> = {
  ACTIVE: "bg-success text-success-foreground",
  ENDED: "bg-muted text-muted-foreground",
  SOLD: "bg-primary text-primary-foreground",
  UNSOLD: "bg-destructive text-destructive-foreground",
  CANCELLED: "bg-destructive/80 text-destructive-foreground",
};

const conditionColors: Record<ItemCondition, string> = {
  NEW: "bg-blue-100 text-blue-700",
  USED: "bg-amber-100 text-amber-700",
  REFURBISHED: "bg-purple-100 text-purple-700",
};

interface AuctionCardProps {
  auction: Auction;
}

export const AuctionCard = ({ auction }: AuctionCardProps) => {
  const { role, watchlist, toggleWatchlist } = useApp();
  const item = getItem(auction.itemId);
  const seller = item ? getUser(item.sellerId) : null;
  const category = item ? getCategory(item.categoryId) : null;
  const { days, hours, minutes, expired } = useCountdown(auction.endDate);
  const isWatched = watchlist.includes(auction.id);
  const isUrgent = days === 0 && hours < 1 && !expired;
  const bidCount = auction.bids.length;

  if (!item) return null;

  return (
    <div className="bg-card rounded-xl border shadow-card overflow-hidden group transition-all duration-150 hover:-translate-y-0.5 hover:shadow-dropdown">
      <Link to={`/auction/${auction.id}`}>
        <div className="relative h-40 bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
          <Camera className="h-10 w-10 text-muted-foreground/40" />
          <Badge className={cn("absolute top-2 right-2 text-[10px]", statusColors[auction.status])}>
            {auction.status}
          </Badge>
          <Badge className={cn("absolute top-2 left-2 text-[10px]", conditionColors[item.condition])}>
            {item.condition}
          </Badge>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {category.name}
          </span>
        )}
        <Link to={`/auction/${auction.id}`}>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
            {item.title}
          </h3>
        </Link>

        {seller && (
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[8px] bg-secondary">{seller.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">by {seller.username}</span>
            {seller.rating && (
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-accent text-accent" />
                {seller.rating}
              </span>
            )}
          </div>
        )}

        <div>
          <p className="text-xs text-muted-foreground">Current bid</p>
          <p className="text-xl font-bold text-primary">
            ${auction.currentHighestBid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground">{bidCount} bid{bidCount !== 1 ? "s" : ""}</p>
        </div>

        {auction.status === "ACTIVE" && (
          <div className={cn("flex items-center gap-1.5 text-xs", isUrgent ? "text-destructive font-medium" : "text-muted-foreground")}>
            <Clock className="h-3.5 w-3.5" />
            {expired ? "Ended" : `Ends in ${days}d ${hours}h ${minutes}m`}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            className="flex-1 h-9"
            disabled={role === "VISITOR"}
            asChild={role !== "VISITOR"}
          >
            {role === "VISITOR" ? (
              <span>Login to Bid</span>
            ) : (
              <Link to={`/auction/${auction.id}`}>Place Bid</Link>
            )}
          </Button>
          {role !== "VISITOR" && (
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 shrink-0"
              onClick={(e) => { e.preventDefault(); toggleWatchlist(auction.id); }}
            >
              <Heart className={cn("h-4 w-4", isWatched ? "fill-destructive text-destructive" : "")} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
