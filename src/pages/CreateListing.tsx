import { useState } from "react";
import { mockCategories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const durations = [
  { label: "1 day", days: 1 }, { label: "3 days", days: 3 },
  { label: "5 days", days: 5 }, { label: "7 days", days: 7 },
];

const CreateListing = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(7);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!title || !description || !category || !condition || !startingPrice) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Listing created successfully!");
      navigate("/my-listings");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Create New Listing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Item Details */}
          <div className="bg-card rounded-xl border p-5 shadow-card space-y-4">
            <h2 className="text-lg font-semibold">Item Details</h2>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title <span className="text-destructive">*</span></label>
              <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter item title" value={title} onChange={e => setTitle(e.target.value)} maxLength={100} />
              <p className="text-xs text-muted-foreground text-right">{title.length}/100</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description <span className="text-destructive">*</span></label>
              <textarea className="w-full h-32 px-3 py-2 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Describe your item in detail" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category <span className="text-destructive">*</span></label>
                <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select category</option>
                  {mockCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Condition <span className="text-destructive">*</span></label>
                <div className="flex gap-2">
                  {["NEW", "USED", "REFURBISHED"].map(c => (
                    <button key={c} onClick={() => setCondition(c)}
                      className={cn("flex-1 py-2 rounded-lg border text-xs font-medium transition-colors",
                        condition === c ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                      {c.charAt(0) + c.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-card rounded-xl border p-5 shadow-card space-y-4">
            <h2 className="text-lg font-semibold">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Starting Price <span className="text-destructive">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <input type="number" className="w-full h-10 pl-7 pr-3 rounded-lg border bg-background text-sm" placeholder="0.00" value={startingPrice} onChange={e => setStartingPrice(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Reserve Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <input type="number" className="w-full h-10 pl-7 pr-3 rounded-lg border bg-background text-sm" placeholder="Optional" value={reservePrice} onChange={e => setReservePrice(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-card rounded-xl border p-5 shadow-card space-y-4">
            <h2 className="text-lg font-semibold">Auction Duration</h2>
            <div className="flex gap-2">
              {durations.map(d => (
                <button key={d.days} onClick={() => setSelectedDuration(d.days)}
                  className={cn("px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                    selectedDuration === d.days ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-card rounded-xl border p-5 shadow-card space-y-4">
            <h2 className="text-lg font-semibold">Images</h2>
            <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drop images here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Max 5 images</p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 bg-card rounded-lg border p-5 space-y-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Preview</p>
            {category && <Badge variant="secondary" className="text-xs">{mockCategories.find(c => c.id === category)?.name}</Badge>}
            <h3 className="text-sm font-semibold">{title || "Item Title"}</h3>
            <p className="text-xl font-bold text-primary">${startingPrice || "0.00"}</p>
            <p className="text-xs text-muted-foreground">Starting price</p>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="sticky bottom-0 bg-card border-t p-4 -mx-6 -mb-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={() => navigate("/my-listings")}>Cancel</Button>
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Creating…" : "Create Listing"}
        </Button>
      </div>
    </div>
  );
};

export default CreateListing;
