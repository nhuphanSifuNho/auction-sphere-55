import { mockActivityLog } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

const actionColors: Record<string, string> = {
  CREATE: "bg-success", UPDATE: "bg-blue-500", DELETE: "bg-destructive",
  BID: "bg-primary", LOGIN: "bg-muted-foreground", LOGOUT: "bg-muted-foreground", PAYMENT: "bg-accent",
};

const ActivityLog = () => {
  const { currentUser, role } = useApp();
  const logs = role === "SYSTEM_ADMIN" ? mockActivityLog :
    mockActivityLog.filter(l => l.actorId === currentUser?.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="relative pl-10">
              <div className={cn("absolute left-2.5 top-1.5 h-3 w-3 rounded-full", actionColors[log.actionType] || "bg-muted")} />
              <div className="bg-card rounded-xl border p-4 shadow-card">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-secondary text-foreground">{log.actionType}</span>
                  <span className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-foreground">{log.description}</p>
                <p className="text-xs text-muted-foreground mt-1">by {log.actorName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
