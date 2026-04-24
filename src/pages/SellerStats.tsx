import { useApp } from "@/contexts/AppContext";
import { StatCard } from "@/components/shared/StatCard";
import { mockAuctions, mockPayments, getItem, mockCategories } from "@/data/mockData";
import { DollarSign, Package, TrendingUp, Percent, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const monthlyRevenue = [
  { month: "Jan", revenue: 1200 }, { month: "Feb", revenue: 2100 }, { month: "Mar", revenue: 3400 },
  { month: "Apr", revenue: 2800 }, { month: "May", revenue: 4200 }, { month: "Jun", revenue: 3900 },
];

const SellerStats = () => {
  const { currentUser } = useApp();
  if (!currentUser) return null;

  const mySales = mockPayments.filter(p => p.sellerId === currentUser.id);
  const totalRevenue = mySales.reduce((s, p) => s + p.sellerPayout, 0);
  const totalCommission = mySales.reduce((s, p) => s + p.commissionAmount, 0);
  const myListings = mockAuctions.filter(a => getItem(a.itemId)?.sellerId === currentUser.id);
  const soldCount = myListings.filter(a => a.status === "SOLD").length;

  const categoryData = mockCategories.slice(0, 4).map(c => ({
    name: c.name,
    sales: Math.floor(Math.random() * 30) + 5,
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Seller Statistics</h1>
        <Button variant="ghost" size="sm" onClick={() => toast.success("Report exported")}>
          <Download className="h-4 w-4 mr-1.5" />Export
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Items Sold" value={soldCount} icon={Package} trend="↑ 12%" trendUp />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} trend="↑ 8%" trendUp />
        <StatCard title="Avg Sale Price" value={soldCount > 0 ? `$${(totalRevenue / soldCount).toFixed(2)}` : "$0"} icon={TrendingUp} />
        <StatCard title="Commission Paid" value={`$${totalCommission.toFixed(2)}`} icon={Percent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border p-5 shadow-card">
          <h3 className="font-semibold mb-4">Revenue Over Time</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyRevenue.map(r => (
                <TableRow key={r.month}>
                  <TableCell>{r.month}</TableCell>
                  <TableCell className="text-right font-medium">${r.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-card rounded-xl border p-5 shadow-card">
          <h3 className="font-semibold mb-4">Sales by Category</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData.map(c => (
                <TableRow key={c.name}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell className="text-right font-medium">{c.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SellerStats;
