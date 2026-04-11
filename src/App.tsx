import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import AuctionDetail from "./pages/AuctionDetail";
import Dashboard from "./pages/Dashboard";
import MyBids from "./pages/MyBids";
import MyListings from "./pages/MyListings";
import CreateListing from "./pages/CreateListing";
import Watchlist from "./pages/Watchlist";
import Transactions from "./pages/Transactions";
import ActivityLog from "./pages/ActivityLog";
import SellerStats from "./pages/SellerStats";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import TopUp from "./pages/TopUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAuctions from "./pages/admin/AdminAuctions";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminReports from "./pages/admin/AdminReports";
import AdminTopUpRequests from "./pages/admin/AdminTopUpRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auction/:id" element={<AuctionDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-bids" element={<MyBids />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/listings/new" element={<CreateListing />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/activity" element={<ActivityLog />} />
              <Route path="/seller-stats" element={<SellerStats />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/auctions" element={<AdminAuctions />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/topup-requests" element={<AdminTopUpRequests />} />
              <Route path="/admin/activity" element={<ActivityLog />} />
              <Route path="/admin/system-log" element={<ActivityLog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
