import { StatCard } from "@/components/shared/StatCard";
import { getItem } from "@/data/mockData";
import { mockAuctions, mockUsers, mockBids, mockPayments, mockTopUpRequests, mockActivityLog, mockCategories } from "@/data/mockData";
import { Users, Gavel, TrendingUp, DollarSign, Inbox, CreditCard, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const pendingTopUps = mockTopUpRequests.filter(t => t.status === "PENDING").length;
  const totalRevenue = mockPayments.reduce((s, p) => s + p.totalAmount, 0);
  const todayBids = mockBids.filter(b => new Date(b.createdAt).toDateString() === new Date().toDateString()).length;

  const categoryRevenue = mockCategories.map(cat => ({
    name: cat.name,
    revenue: mockPayments.reduce((sum, p) => {
      const auction = mockAuctions.find(a => a.id === p.auctionId);
      const item = auction ? getItem(auction.itemId) : null;
      return item?.categoryId === cat.id ? sum + p.totalAmount : sum;
    }, 0),
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Admin Control Panel</h1>
            <p className="text-sm opacity-80">Manage auctions, users, and system settings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={mockUsers.length} icon={Users} />
        <StatCard title="Active Auctions" value={mockAuctions.filter(a => a.status === "ACTIVE").length} icon={Gavel} />
        <StatCard title="Today's Bids" value={todayBids} icon={TrendingUp} />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} />
        <StatCard title="Pending Top-ups" value={pendingTopUps} icon={Inbox} />
        <StatCard title="Total Payments" value={mockPayments.length} icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border p-5 shadow-card">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {mockActivityLog.slice(0, 6).map(log => (
              <div key={log.id} className="flex items-start gap-3 text-sm">
                <Badge variant="secondary" className="text-[10px] shrink-0">{log.actionType}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground truncate">{log.description}</p>
                  <p className="text-xs text-muted-foreground">{log.actorName} · {new Date(log.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5 shadow-card">
          <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
