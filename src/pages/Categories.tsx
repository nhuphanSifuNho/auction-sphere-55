import { mockCategories, mockAuctions, getItem } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Grid3X3 } from "lucide-react";

const Categories = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse auctions by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCategories.map(cat => {
          const activeCount = mockAuctions.filter(a => {
            const item = getItem(a.itemId);
            return a.status === "ACTIVE" && item?.categoryId === cat.id;
          }).length;

          return (
            <Link key={cat.id} to={`/?category=${cat.id}`}>
              <div className="bg-card rounded-xl border p-5 shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Grid3X3 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="outline">{cat.commissionRate}% commission</Badge>
                  <span className="text-xs text-muted-foreground">{activeCount} active</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
