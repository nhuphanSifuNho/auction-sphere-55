import { useApp } from "@/contexts/AppContext";
import { StatCard } from "@/components/shared/StatCard";
import { mockAuctions, mockPayments, getItem, mockCategories } from "@/data/mockData";
import { DollarSign, Package, TrendingUp, Percent, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";

const COLORS = ["hsl(239,84%,67%)", "hsl(38,92%,50%)", "hsl(160,84%,39%)", "hsl(0,84%,60%)", "hsl(200,80%,50%)", "hsl(280,60%,50%)"];

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

  const categoryData = mockCategories.slice(0, 4).map(c => ({ name: c.name, value: Math.floor(Math.random() * 30) + 5 }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Seller Statistics</h1>
        <Button variant="ghost" size="sm" onClick={() => toast.success("Report exported")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Items Sold" value={soldCount} icon={Package} trend="↑ 12%" trendUp />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} trend="↑ 8%" trendUp />
        <StatCard title="Avg Sale Price" value={soldCount > 0 ? `$${(totalRevenue / soldCount).toFixed(2)}` : "$0"} icon={TrendingUp} />
        <StatCard title="Commission Paid" value={`$${totalCommission.toFixed(2)}`} icon={Percent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-card rounded-xl border p-5 shadow-card">
          <h3 className="font-semibold mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyRevenue}>
              <defs><linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(239,84%,67%)" stopOpacity={0.3}/><stop offset="95%" stopColor="hsl(239,84%,67%)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="hsl(239,84%,67%)" fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card rounded-xl border p-5 shadow-card">
          <h3 className="font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SellerStats;
