import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tabs = ["Personal Information", "Balance & Payments"] as const;

const Profile = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<string>("Personal Information");
  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn("w-full text-left px-4 py-2 rounded-lg text-sm transition-colors",
                activeTab === tab ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted")}>
              {tab}
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          {activeTab === "Personal Information" && (
            <div className="bg-card rounded-xl border p-6 shadow-card space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">{currentUser.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Photo</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: currentUser.name },
                  { label: "Username", value: currentUser.username, disabled: true },
                  { label: "Email", value: currentUser.email },
                  { label: "Phone", value: currentUser.phone || "" },
                ].map(f => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{f.label}</label>
                    <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm disabled:opacity-50" defaultValue={f.value} disabled={f.disabled} />
                  </div>
                ))}
              </div>
              <Button onClick={() => toast.success("Profile updated")}>Save Changes</Button>
            </div>
          )}

          {activeTab === "Balance & Payments" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
                <p className="text-sm opacity-80">Current Balance</p>
                <p className="text-3xl font-bold mt-1">${currentUser.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
              <Button onClick={() => toast.success("Top-up request submitted")}>Request Top-up</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
