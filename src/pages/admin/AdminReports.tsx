import { StatCard } from "@/components/shared/StatCard";
import { mockAuctions, mockPayments, mockBids, mockCategories } from "@/data/mockData";
import { DollarSign, Gavel, TrendingUp, Tag, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const monthlyData = [
  { month: "Jan", revenue: 2400, auctions: 12 },
  { month: "Feb", revenue: 3800, auctions: 18 },
  { month: "Mar", revenue: 5200, auctions: 22 },
  { month: "Apr", revenue: 4100, auctions: 15 },
  { month: "May", revenue: 6800, auctions: 28 },
  { month: "Jun", revenue: 7200, auctions: 31 },
];

const AdminReports = () => {
  const totalRevenue = mockPayments.reduce((s, p) => s + p.totalAmount, 0);
  const totalCommission = mockPayments.reduce((s, p) => s + p.commissionAmount, 0);
  const soldCount = mockAuctions.filter(a => a.status === "SOLD").length;
  const successRate = mockAuctions.length > 0 ? ((soldCount / mockAuctions.length) * 100).toFixed(1) : "0";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <Button variant="outline" size="sm" onClick={() => toast.success("Report downloaded")}>
          <Download className="h-4 w-4 mr-1.5" />Download Report
        </Button>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} />
            <StatCard title="Commission" value={`$${totalCommission.toFixed(2)}`} icon={TrendingUp} />
            <StatCard title="Avg Sale Price" value={`$${soldCount > 0 ? (totalRevenue / soldCount).toFixed(2) : "0"}`} icon={Tag} />
            <StatCard title="Top Category" value="Electronics" icon={Gavel} />
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-card">
            <h3 className="font-semibold mb-4">Revenue Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="auctions" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Auctions" value={mockAuctions.length} icon={Gavel} />
            <StatCard title="Active" value={mockAuctions.filter(a => a.status === "ACTIVE").length} icon={TrendingUp} />
            <StatCard title="Sold" value={soldCount} icon={DollarSign} />
            <StatCard title="Success Rate" value={`${successRate}%`} icon={Tag} />
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-card">
            <h3 className="font-semibold mb-4">Auctions by Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="auctions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
