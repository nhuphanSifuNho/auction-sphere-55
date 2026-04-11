import { mockCategories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminCategories = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">Manage Categories</h1>
      <Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Add Category</Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockCategories.map(cat => (
        <div key={cat.id} className="bg-card rounded-xl border p-5 shadow-card hover:-translate-y-0.5 transition-all group">
          <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <Badge variant="outline">{cat.commissionRate}% commission</Badge>
            <span className="text-xs text-muted-foreground">{cat.itemCount} items</span>
          </div>
          <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5 mr-1" />Edit</Button>
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => toast.error("Delete demo")}><Trash2 className="h-3.5 w-3.5 mr-1" />Delete</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminCategories;
