import { mockPayments, getItem, getUser, mockAuctions } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusColors: Record<string, string> = {
  PAID: "bg-success/10 text-success",
  PENDING: "bg-warning/10 text-warning",
  FAILED: "bg-destructive/10 text-destructive",
};

const Transactions = () => {
  const { currentUser } = useApp();
  if (!currentUser) return null;

  const purchases = mockPayments.filter(p => p.buyerId === currentUser.id);
  const sales = mockPayments.filter(p => p.sellerId === currentUser.id);

  const renderTable = (payments: typeof mockPayments, type: "purchase" | "sale") => (
    <div className="bg-card rounded-xl border shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b text-left">
          <th className="p-4 font-medium text-muted-foreground">Item</th>
          <th className="p-4 font-medium text-muted-foreground">{type === "purchase" ? "Seller" : "Buyer"}</th>
          <th className="p-4 font-medium text-muted-foreground">Amount</th>
          <th className="p-4 font-medium text-muted-foreground">Commission</th>
          <th className="p-4 font-medium text-muted-foreground">Status</th>
          <th className="p-4 font-medium text-muted-foreground">Date</th>
        </tr></thead>
        <tbody>
          {payments.map(p => {
            const auction = mockAuctions.find(a => a.id === p.auctionId);
            const item = auction ? getItem(auction.itemId) : null;
            const other = getUser(type === "purchase" ? p.sellerId : p.buyerId);
            return (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-4 font-medium">{item?.title || "Unknown"}</td>
                <td className="p-4 text-muted-foreground">{other?.name}</td>
                <td className="p-4 font-semibold">${p.totalAmount.toFixed(2)}</td>
                <td className="p-4 text-muted-foreground">${p.commissionAmount.toFixed(2)}</td>
                <td className="p-4"><Badge className={statusColors[p.status]}>{p.status}</Badge></td>
                <td className="p-4 text-muted-foreground">{new Date(p.paidAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
          {payments.length === 0 && (
            <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No transactions yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
      <Tabs defaultValue="purchases">
        <TabsList><TabsTrigger value="purchases">Purchases</TabsTrigger><TabsTrigger value="sales">Sales</TabsTrigger></TabsList>
        <TabsContent value="purchases" className="mt-4">{renderTable(purchases, "purchase")}</TabsContent>
        <TabsContent value="sales" className="mt-4">{renderTable(sales, "sale")}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;
