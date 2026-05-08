import { useApp } from "@/contexts/AppContext";
import { mockAuctions, getItem } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Watchlist = () => {
  const { watchlist, toggleWatchlist } = useApp();
  const watchedAuctions = mockAuctions.filter(a => watchlist.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Watchlist</h1>

      {watchedAuctions.length > 0 ? (
        <div className="bg-card border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Current Bid</TableHead>
                <TableHead className="text-right">Bids</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchedAuctions.map(a => {
                const item = getItem(a.itemId);
                return (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">
                      <Link to={`/auction/${a.id}`} className="hover:text-primary">{item?.title}</Link>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{a.status}</Badge></TableCell>
                    <TableCell className="text-right font-semibold">${a.currentHighestBid.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{a.bids.length}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" asChild><Link to={`/auction/${a.id}`}>View</Link></Button>
                      <Button size="sm" variant="outline" onClick={() => toggleWatchlist(a.id)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 border rounded-lg bg-card">
          <Heart className="h-10 w-10 text-muted-foreground/40 mb-4" />
          <h3 className="font-semibold text-foreground">Your watchlist is empty</h3>
          <p className="text-sm text-muted-foreground mt-1">Browse auctions and add items you're interested in</p>
          <Link to="/"><Button className="mt-4">Browse Auctions</Button></Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
