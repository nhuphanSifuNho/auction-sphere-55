import React, { createContext, useContext, useState, useCallback } from "react";
import type { UserRole, Notification } from "@/types";
import { mockUsers, mockNotifications } from "@/data/mockData";

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: typeof mockUsers[0] | null;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  watchlist: string[];
  toggleWatchlist: (auctionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("USER");
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [watchlist, setWatchlist] = useState<string[]>(["a1", "a6", "a10"]);

  const currentUser = role === "VISITOR" ? null : 
    role === "USER" ? mockUsers[0] : 
    role === "AUCTION_ADMIN" ? mockUsers[2] : mockUsers[3];

  const unreadCount = notifications.filter(n => !n.read && n.userId === (currentUser?.id ?? "")).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const toggleWatchlist = useCallback((auctionId: string) => {
    setWatchlist(prev => prev.includes(auctionId) ? prev.filter(id => id !== auctionId) : [...prev, auctionId]);
  }, []);

  return (
    <AppContext.Provider value={{ role, setRole, currentUser, notifications, unreadCount, markAsRead, markAllRead, watchlist, toggleWatchlist }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
