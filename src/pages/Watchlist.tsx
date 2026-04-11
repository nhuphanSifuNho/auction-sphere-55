import { useApp } from "@/contexts/AppContext";
import { mockAuctions, getItem } from "@/data/mockData";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { watchlist } = useApp();
  const watchedAuctions = mockAuctions.filter(a => watchlist.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Watchlist</h1>

      {watchedAuctions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchedAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 border-2 border-dashed rounded-xl">
          <Heart className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="font-semibold text-foreground">Your watchlist is empty</h3>
          <p className="text-sm text-muted-foreground mt-1">Browse auctions and add items you're interested in</p>
          <Link to="/"><Button className="mt-4">Browse Auctions</Button></Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
