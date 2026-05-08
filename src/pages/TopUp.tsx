import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { PlusCircle, Wallet } from "lucide-react";

const TopUp = () => {
  const { currentUser } = useApp();
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!currentUser) return null;

  const handleSubmit = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 10 || val > 5000) {
      toast.error("Amount must be between $10.00 and $5,000.00");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Top-up request of $${val.toFixed(2)} submitted for approval`);
      setAmount("");
    }, 1000);
  };

  const newBalance = parseFloat(amount) > 0 ? currentUser.balance + parseFloat(amount) : currentUser.balance;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Top-up Balance</h1>

      <div className="bg-card border rounded-lg p-5">
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">Current Balance</span>
        </div>
        <p className="text-3xl font-bold text-foreground">
          ${currentUser.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="bg-card rounded-xl border p-5 shadow-card space-y-4">
        <h2 className="text-lg font-semibold">Request Top-up</h2>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              className="w-full h-10 pl-7 pr-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter amount (10 - 5000)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min={10}
              max={5000}
            />
          </div>
          <p className="text-xs text-muted-foreground">Min: $10.00 · Max: $5,000.00</p>
        </div>

        {parseFloat(amount) > 0 && (
          <div className="p-3 rounded-lg bg-secondary space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current balance</span>
              <span>${currentUser.balance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Top-up amount</span>
              <span className="text-success">+${parseFloat(amount).toFixed(2)}</span>
            </div>
            <div className="border-t pt-1 flex justify-between text-sm font-semibold">
              <span>New balance</span>
              <span>${newBalance.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
          <PlusCircle className="h-4 w-4 mr-2" />
          {submitting ? "Submitting…" : "Submit Top-up Request"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Top-up requests require admin approval before your balance is updated.
        </p>
      </div>
    </div>
  );
};

export default TopUp;
