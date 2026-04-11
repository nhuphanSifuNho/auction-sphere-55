export type UserRole = "VISITOR" | "USER" | "AUCTION_ADMIN" | "SYSTEM_ADMIN";
export type AuctionStatus = "ACTIVE" | "ENDED" | "SOLD" | "UNSOLD" | "CANCELLED";
export type ItemCondition = "NEW" | "USED" | "REFURBISHED";
export type BidStatus = "WINNING" | "OUTBID" | "WON" | "LOST";
export type PaymentStatus = "PAID" | "PENDING" | "FAILED";
export type TopUpStatus = "PENDING" | "APPROVED" | "REJECTED";
export type NotificationType = "OUTBID" | "AUCTION_WON" | "PAYMENT_PROCESSED" | "TOPUP_APPROVED" | "TOPUP_REJECTED" | "AUCTION_ENDING" | "ITEM_MODERATED";
export type ActionType = "CREATE" | "UPDATE" | "DELETE" | "BID" | "LOGIN" | "LOGOUT" | "PAYMENT";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  dob?: string;
  role: UserRole;
  balance: number;
  rating: number | null;
  salesCount: number;
  joinedAt: string;
  status: "ACTIVE" | "SUSPENDED";
}

export interface Category {
  id: string;
  name: string;
  description: string;
  commissionRate: number;
  itemCount: number;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: ItemCondition;
  startingPrice: number;
  reservePrice: number | null;
  sellerId: string;
  images: string[];
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  amount: number;
  createdAt: string;
}

export interface Auction {
  id: string;
  itemId: string;
  status: AuctionStatus;
  bids: string[];
  currentHighestBid: number;
  winnerId: string | null;
  finalPrice: number | null;
  startDate: string;
  endDate: string;
}

export interface Payment {
  id: string;
  auctionId: string;
  buyerId: string;
  sellerId: string;
  totalAmount: number;
  commissionAmount: number;
  sellerPayout: number;
  status: PaymentStatus;
  paidAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
}

export interface TopUpRequest {
  id: string;
  userId: string;
  amount: number;
  currentBalance: number;
  status: TopUpStatus;
  requestedAt: string;
}

export interface ActivityLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actionType: ActionType;
  targetEntity: string;
  targetId: string;
  description: string;
  createdAt: string;
}
