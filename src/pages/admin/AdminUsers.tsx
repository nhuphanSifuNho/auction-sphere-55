import { mockUsers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Pencil, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const roleColors: Record<string, string> = {
  USER: "bg-blue-100 text-blue-700",
  AUCTION_ADMIN: "bg-purple-100 text-purple-700",
  SYSTEM_ADMIN: "bg-red-100 text-red-700",
};

const AdminUsers = () => {
  const [users] = useState(mockUsers);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
        <Button size="sm"><UserPlus className="h-4 w-4 mr-1.5" />Add User</Button>
      </div>

      <div className="bg-card rounded-xl border shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left">
            <th className="p-4 font-medium text-muted-foreground">User</th>
            <th className="p-4 font-medium text-muted-foreground">Email</th>
            <th className="p-4 font-medium text-muted-foreground">Role</th>
            <th className="p-4 font-medium text-muted-foreground">Balance</th>
            <th className="p-4 font-medium text-muted-foreground">Rating</th>
            <th className="p-4 font-medium text-muted-foreground">Status</th>
            <th className="p-4 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{user.email}</td>
                <td className="p-4"><Badge className={roleColors[user.role]}>{user.role.replace("_", " ")}</Badge></td>
                <td className="p-4">${user.balance.toFixed(2)}</td>
                <td className="p-4">{user.rating ? `★ ${user.rating}` : "—"}</td>
                <td className="p-4">
                  <Badge className={user.status === "ACTIVE" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}>
                    {user.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => toast.error("Delete functionality demo")}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
