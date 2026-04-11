import { mockTopUpRequests, getUser } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  PENDING: "bg-warning/10 text-warning",
  APPROVED: "bg-success/10 text-success",
  REJECTED: "bg-destructive/10 text-destructive",
};

const tabs = ["All", "PENDING", "APPROVED", "REJECTED"] as const;

const AdminTopUpRequests = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [requests, setRequests] = useState(mockTopUpRequests);

  const filtered = requests.filter(r => activeTab === "All" || r.status === activeTab);

  const handleAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    const user = getUser(requests.find(r => r.id === id)?.userId || "");
    toast.success(`Top-up ${action.toLowerCase()} for ${user?.name}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Top-up Requests</h1>

      <div className="flex gap-1 bg-secondary p-1 rounded-lg w-fit">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-colors", activeTab === tab ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}>
            {tab === "All" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-4 font-medium text-muted-foreground">User</th>
            <th className="p-4 font-medium text-muted-foreground">Amount</th>
            <th className="p-4 font-medium text-muted-foreground">Current Balance</th>
            <th className="p-4 font-medium text-muted-foreground">Requested</th>
            <th className="p-4 font-medium text-muted-foreground">Status</th>
            <th className="p-4 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(req => {
              const user = getUser(req.userId);
              return (
                <tr key={req.id} className={cn("border-b last:border-0", req.status === "PENDING" && "bg-warning/5")}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-primary/10 text-primary">{user?.name[0]}</AvatarFallback></Avatar>
                      <span className="font-medium">{user?.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-success">${req.amount.toFixed(2)}</td>
                  <td className="p-4">${req.currentBalance.toFixed(2)}</td>
                  <td className="p-4 text-muted-foreground">{new Date(req.requestedAt).toLocaleString()}</td>
                  <td className="p-4"><Badge className={statusColors[req.status]}>{req.status}</Badge></td>
                  <td className="p-4">
                    {req.status === "PENDING" ? (
                      <div className="flex gap-2">
                        <Button size="sm" className="h-7 bg-success hover:bg-success/90 text-success-foreground" onClick={() => handleAction(req.id, "APPROVED")}>Approve</Button>
                        <Button size="sm" variant="ghost" className="h-7 text-destructive" onClick={() => handleAction(req.id, "REJECTED")}>Reject</Button>
                      </div>
                    ) : <span className="text-xs text-muted-foreground">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTopUpRequests;
