import type { User, Category, Item, Auction, Bid, Payment, Notification, TopUpRequest, ActivityLogEntry } from "@/types";

export const mockUsers: User[] = [
  { id: "u1", name: "John Doe", username: "johndoe", email: "john@example.com", phone: "+1234567890", dob: "1990-05-15", role: "USER", balance: 1240.00, rating: 4.7, salesCount: 23, joinedAt: "2023-03-15", status: "ACTIVE" },
  { id: "u2", name: "Sarah Chen", username: "sarahc", email: "sarah@example.com", phone: "+1987654321", dob: "1988-11-22", role: "USER", balance: 3500.00, rating: 4.9, salesCount: 67, joinedAt: "2022-11-01", status: "ACTIVE" },
  { id: "u3", name: "Mike Johnson", username: "mikej", email: "mike@example.com", role: "AUCTION_ADMIN", balance: 0, rating: null, salesCount: 0, joinedAt: "2023-01-10", status: "ACTIVE" },
  { id: "u4", name: "Admin User", username: "sysadmin", email: "admin@auctionhub.com", role: "SYSTEM_ADMIN", balance: 0, rating: null, salesCount: 0, joinedAt: "2022-01-01", status: "ACTIVE" },
  { id: "u5", name: "Emily Rogers", username: "emilyr", email: "emily@example.com", role: "USER", balance: 890.00, rating: 4.3, salesCount: 12, joinedAt: "2023-06-20", status: "ACTIVE" },
  { id: "u6", name: "David Kim", username: "davidk", email: "david@example.com", role: "USER", balance: 2100.00, rating: 4.5, salesCount: 8, joinedAt: "2023-09-05", status: "SUSPENDED" },
];

export const mockCategories: Category[] = [
  { id: "c1", name: "Electronics", description: "Gadgets and devices", commissionRate: 5.0, itemCount: 42 },
  { id: "c2", name: "Collectibles", description: "Rare and vintage items", commissionRate: 4.5, itemCount: 28 },
  { id: "c3", name: "Art", description: "Paintings, sculptures, prints", commissionRate: 6.0, itemCount: 15 },
  { id: "c4", name: "Fashion", description: "Clothing and accessories", commissionRate: 3.5, itemCount: 56 },
  { id: "c5", name: "Sports", description: "Equipment and memorabilia", commissionRate: 4.0, itemCount: 33 },
  { id: "c6", name: "Automotive", description: "Parts and vehicles", commissionRate: 3.0, itemCount: 19 },
];

export const mockItems: Item[] = [
  { id: "i1", title: "Apple MacBook Pro 16\" M3 Pro", description: "Like new condition, purchased 3 months ago. Comes with original box and charger. 36GB RAM, 1TB SSD.", categoryId: "c1", condition: "USED", startingPrice: 450.00, reservePrice: 1800.00, sellerId: "u2", images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"] },
  { id: "i2", title: "1967 Gibson Les Paul Standard", description: "Authentic vintage guitar, original hardware, incredible tone. A true collector's piece.", categoryId: "c2", condition: "USED", startingPrice: 2000.00, reservePrice: 8000.00, sellerId: "u2", images: ["https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=800&q=80"] },
  { id: "i3", title: "Rolex Submariner 2022", description: "Unworn, full kit including box and papers. Reference 126610LN.", categoryId: "c4", condition: "NEW", startingPrice: 8000.00, reservePrice: 10000.00, sellerId: "u1", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"] },
  { id: "i4", title: "Sony PlayStation 5 Bundle", description: "Console + 3 games (Spider-Man 2, God of War, Horizon), original receipt included.", categoryId: "c1", condition: "USED", startingPrice: 200.00, reservePrice: null, sellerId: "u2", images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80"] },
  { id: "i5", title: "Abstract Oil Painting \"Serenity\"", description: "Original artwork by emerging artist. 48x36 inches, stretched canvas.", categoryId: "c3", condition: "NEW", startingPrice: 150.00, reservePrice: 400.00, sellerId: "u1", images: ["https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80"] },
  { id: "i6", title: "Vintage Air Jordan 1 Chicago 1985", description: "Original 1985 pair, worn but in excellent condition. Size 10.", categoryId: "c4", condition: "USED", startingPrice: 3000.00, reservePrice: 5000.00, sellerId: "u5", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"] },
  { id: "i7", title: "Canon EOS R5 Camera Body", description: "Professional mirrorless camera, low shutter count, mint condition.", categoryId: "c1", condition: "USED", startingPrice: 1500.00, reservePrice: 2500.00, sellerId: "u5", images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"] },
  { id: "i8", title: "Signed Michael Jordan Jersey", description: "Authenticated signed Bulls #23 jersey with COA from PSA.", categoryId: "c5", condition: "NEW", startingPrice: 500.00, reservePrice: 2000.00, sellerId: "u1", images: ["https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80"] },
  { id: "i9", title: "Tesla Model S Wheel Set", description: "Set of 4 OEM 21\" wheels with tires, excellent tread remaining.", categoryId: "c6", condition: "USED", startingPrice: 800.00, reservePrice: 1500.00, sellerId: "u2", images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"] },
  { id: "i10", title: "Banksy Print \"Girl with Balloon\"", description: "Authenticated limited edition print, #45/500, framed.", categoryId: "c3", condition: "NEW", startingPrice: 1200.00, reservePrice: 3000.00, sellerId: "u5", images: ["https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80"] },
  { id: "i11", title: "DJI Mavic 3 Pro Drone", description: "Fly more combo, barely used, all original accessories.", categoryId: "c1", condition: "USED", startingPrice: 800.00, reservePrice: 1400.00, sellerId: "u1", images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80"] },
  { id: "i12", title: "Herman Miller Aeron Chair", description: "Size B, fully loaded, remastered edition. Perfect for home office.", categoryId: "c2", condition: "REFURBISHED", startingPrice: 400.00, reservePrice: 800.00, sellerId: "u2", images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80"] },
  { id: "i13", title: "Vintage Leica M6 Film Camera", description: "Classic 35mm rangefinder, CLA'd recently, excellent optics.", categoryId: "c2", condition: "USED", startingPrice: 1800.00, reservePrice: 3000.00, sellerId: "u5", images: ["https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&q=80"] },
  { id: "i14", title: "Nike Dunk Low Panda", description: "Brand new, DS, size 9.5. Comes with original box.", categoryId: "c4", condition: "NEW", startingPrice: 100.00, reservePrice: null, sellerId: "u1", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"] },
  { id: "i15", title: "Bose QuietComfort Ultra Headphones", description: "Open box, tested once. Full warranty remaining.", categoryId: "c1", condition: "REFURBISHED", startingPrice: 200.00, reservePrice: 300.00, sellerId: "u2", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"] },
  { id: "i16", title: "Peloton Bike+ with Accessories", description: "Includes bike, mat, weights, shoes. Low miles, pristine.", categoryId: "c5", condition: "USED", startingPrice: 600.00, reservePrice: 1200.00, sellerId: "u5", images: ["https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&q=80"] },
];

export const mockAuctions: Auction[] = [
  { id: "a1", itemId: "i1", status: "ACTIVE", bids: ["b1","b2","b3"], currentHighestBid: 1650.00, winnerId: null, finalPrice: null, startDate: "2025-04-01T09:00:00", endDate: "2025-04-15T18:00:00" },
  { id: "a2", itemId: "i2", status: "ACTIVE", bids: ["b4","b5"], currentHighestBid: 6200.00, winnerId: null, finalPrice: null, startDate: "2025-04-05T10:00:00", endDate: "2025-04-13T20:00:00" },
  { id: "a3", itemId: "i3", status: "SOLD", bids: ["b6","b7","b8"], currentHighestBid: 11500.00, winnerId: "u2", finalPrice: 11500.00, startDate: "2025-03-20T09:00:00", endDate: "2025-04-01T18:00:00" },
  { id: "a4", itemId: "i4", status: "ACTIVE", bids: ["b9"], currentHighestBid: 320.00, winnerId: null, finalPrice: null, startDate: "2025-04-08T12:00:00", endDate: "2025-04-14T22:00:00" },
  { id: "a5", itemId: "i5", status: "ACTIVE", bids: ["b10","b11"], currentHighestBid: 280.00, winnerId: null, finalPrice: null, startDate: "2025-04-06T09:00:00", endDate: "2025-04-12T18:00:00" },
  { id: "a6", itemId: "i6", status: "ACTIVE", bids: ["b12","b13","b14"], currentHighestBid: 4800.00, winnerId: null, finalPrice: null, startDate: "2025-04-03T10:00:00", endDate: "2025-04-16T20:00:00" },
  { id: "a7", itemId: "i7", status: "ENDED", bids: ["b15","b16"], currentHighestBid: 2100.00, winnerId: null, finalPrice: null, startDate: "2025-03-25T09:00:00", endDate: "2025-04-05T18:00:00" },
  { id: "a8", itemId: "i8", status: "ACTIVE", bids: ["b17"], currentHighestBid: 1200.00, winnerId: null, finalPrice: null, startDate: "2025-04-07T09:00:00", endDate: "2025-04-17T18:00:00" },
  { id: "a9", itemId: "i9", status: "UNSOLD", bids: [], currentHighestBid: 0, winnerId: null, finalPrice: null, startDate: "2025-03-15T09:00:00", endDate: "2025-03-25T18:00:00" },
  { id: "a10", itemId: "i10", status: "ACTIVE", bids: ["b18","b19","b20"], currentHighestBid: 2800.00, winnerId: null, finalPrice: null, startDate: "2025-04-04T10:00:00", endDate: "2025-04-14T20:00:00" },
  { id: "a11", itemId: "i11", status: "ACTIVE", bids: ["b21"], currentHighestBid: 950.00, winnerId: null, finalPrice: null, startDate: "2025-04-09T09:00:00", endDate: "2025-04-19T18:00:00" },
  { id: "a12", itemId: "i12", status: "ACTIVE", bids: ["b22","b23"], currentHighestBid: 620.00, winnerId: null, finalPrice: null, startDate: "2025-04-07T12:00:00", endDate: "2025-04-15T22:00:00" },
  { id: "a13", itemId: "i13", status: "CANCELLED", bids: [], currentHighestBid: 0, winnerId: null, finalPrice: null, startDate: "2025-04-01T09:00:00", endDate: "2025-04-10T18:00:00" },
  { id: "a14", itemId: "i14", status: "ACTIVE", bids: ["b24","b25","b26","b27"], currentHighestBid: 185.00, winnerId: null, finalPrice: null, startDate: "2025-04-10T09:00:00", endDate: "2025-04-18T18:00:00" },
  { id: "a15", itemId: "i15", status: "SOLD", bids: ["b28","b29"], currentHighestBid: 310.00, winnerId: "u1", finalPrice: 310.00, startDate: "2025-03-28T09:00:00", endDate: "2025-04-04T18:00:00" },
  { id: "a16", itemId: "i16", status: "ACTIVE", bids: ["b30"], currentHighestBid: 750.00, winnerId: null, finalPrice: null, startDate: "2025-04-08T10:00:00", endDate: "2025-04-16T20:00:00" },
];

export const mockBids: Bid[] = [
  { id: "b1", auctionId: "a1", bidderId: "u1", amount: 1650.00, createdAt: "2025-04-10T14:23:00" },
  { id: "b2", auctionId: "a1", bidderId: "u5", amount: 1500.00, createdAt: "2025-04-09T11:10:00" },
  { id: "b3", auctionId: "a1", bidderId: "u1", amount: 1200.00, createdAt: "2025-04-08T09:30:00" },
  { id: "b4", auctionId: "a2", bidderId: "u1", amount: 6200.00, createdAt: "2025-04-11T16:45:00" },
  { id: "b5", auctionId: "a2", bidderId: "u5", amount: 5500.00, createdAt: "2025-04-10T08:20:00" },
  { id: "b6", auctionId: "a3", bidderId: "u2", amount: 11500.00, createdAt: "2025-03-31T17:50:00" },
  { id: "b7", auctionId: "a3", bidderId: "u5", amount: 10000.00, createdAt: "2025-03-30T14:00:00" },
  { id: "b8", auctionId: "a3", bidderId: "u2", amount: 9500.00, createdAt: "2025-03-28T11:00:00" },
  { id: "b9", auctionId: "a4", bidderId: "u1", amount: 320.00, createdAt: "2025-04-10T10:00:00" },
  { id: "b10", auctionId: "a5", bidderId: "u2", amount: 280.00, createdAt: "2025-04-11T09:15:00" },
  { id: "b11", auctionId: "a5", bidderId: "u1", amount: 220.00, createdAt: "2025-04-09T16:00:00" },
  { id: "b12", auctionId: "a6", bidderId: "u1", amount: 4800.00, createdAt: "2025-04-11T12:00:00" },
  { id: "b13", auctionId: "a6", bidderId: "u2", amount: 4200.00, createdAt: "2025-04-10T15:30:00" },
  { id: "b14", auctionId: "a6", bidderId: "u1", amount: 3800.00, createdAt: "2025-04-08T10:00:00" },
  { id: "b15", auctionId: "a7", bidderId: "u1", amount: 2100.00, createdAt: "2025-04-04T14:00:00" },
  { id: "b16", auctionId: "a7", bidderId: "u2", amount: 1900.00, createdAt: "2025-04-03T10:00:00" },
  { id: "b17", auctionId: "a8", bidderId: "u2", amount: 1200.00, createdAt: "2025-04-09T11:00:00" },
  { id: "b18", auctionId: "a10", bidderId: "u1", amount: 2800.00, createdAt: "2025-04-11T09:00:00" },
  { id: "b19", auctionId: "a10", bidderId: "u2", amount: 2400.00, createdAt: "2025-04-10T14:00:00" },
  { id: "b20", auctionId: "a10", bidderId: "u5", amount: 2000.00, createdAt: "2025-04-08T16:00:00" },
  { id: "b21", auctionId: "a11", bidderId: "u2", amount: 950.00, createdAt: "2025-04-10T12:00:00" },
  { id: "b22", auctionId: "a12", bidderId: "u1", amount: 620.00, createdAt: "2025-04-11T10:00:00" },
  { id: "b23", auctionId: "a12", bidderId: "u5", amount: 500.00, createdAt: "2025-04-09T09:00:00" },
  { id: "b24", auctionId: "a14", bidderId: "u2", amount: 185.00, createdAt: "2025-04-11T15:00:00" },
  { id: "b25", auctionId: "a14", bidderId: "u5", amount: 160.00, createdAt: "2025-04-11T11:00:00" },
  { id: "b26", auctionId: "a14", bidderId: "u2", amount: 140.00, createdAt: "2025-04-10T17:00:00" },
  { id: "b27", auctionId: "a14", bidderId: "u1", amount: 120.00, createdAt: "2025-04-10T14:00:00" },
  { id: "b28", auctionId: "a15", bidderId: "u1", amount: 310.00, createdAt: "2025-04-03T16:00:00" },
  { id: "b29", auctionId: "a15", bidderId: "u5", amount: 260.00, createdAt: "2025-04-02T10:00:00" },
  { id: "b30", auctionId: "a16", bidderId: "u1", amount: 750.00, createdAt: "2025-04-10T09:00:00" },
];

export const mockPayments: Payment[] = [
  { id: "p1", auctionId: "a3", buyerId: "u2", sellerId: "u1", totalAmount: 11500.00, commissionAmount: 402.50, sellerPayout: 11097.50, status: "PAID", paidAt: "2025-04-02T09:00:00" },
  { id: "p2", auctionId: "a15", buyerId: "u1", sellerId: "u2", totalAmount: 310.00, commissionAmount: 15.50, sellerPayout: 294.50, status: "PAID", paidAt: "2025-04-05T09:00:00" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", userId: "u1", type: "OUTBID", title: "You've been outbid!", description: "Someone placed a higher bid on Abstract Oil Painting \"Serenity\"", read: false, createdAt: "2025-04-11T15:30:00" },
  { id: "n2", userId: "u1", type: "AUCTION_WON", title: "Congratulations! You won!", description: "You won the auction for Bose QuietComfort Ultra Headphones", read: false, createdAt: "2025-04-05T08:00:00" },
  { id: "n3", userId: "u1", type: "TOPUP_APPROVED", title: "Top-up Approved", description: "Your top-up request of $500.00 has been approved", read: true, createdAt: "2025-04-01T10:00:00" },
  { id: "n4", userId: "u1", type: "AUCTION_ENDING", title: "Auction ending soon!", description: "MacBook Pro 16\" auction ends in less than 24 hours", read: false, createdAt: "2025-04-11T09:00:00" },
  { id: "n5", userId: "u1", type: "PAYMENT_PROCESSED", title: "Payment Processed", description: "Payment of $310.00 for Bose headphones has been completed", read: true, createdAt: "2025-04-05T09:00:00" },
  { id: "n6", userId: "u2", type: "OUTBID", title: "You've been outbid!", description: "Someone outbid you on MacBook Pro 16\"", read: false, createdAt: "2025-04-10T14:30:00" },
];

export const mockTopUpRequests: TopUpRequest[] = [
  { id: "t1", userId: "u1", amount: 500.00, currentBalance: 740.00, status: "PENDING", requestedAt: "2025-04-10T09:00:00" },
  { id: "t2", userId: "u2", amount: 1000.00, currentBalance: 2500.00, status: "APPROVED", requestedAt: "2025-04-08T14:00:00" },
  { id: "t3", userId: "u5", amount: 250.00, currentBalance: 640.00, status: "PENDING", requestedAt: "2025-04-11T10:00:00" },
  { id: "t4", userId: "u1", amount: 200.00, currentBalance: 1040.00, status: "REJECTED", requestedAt: "2025-04-05T11:00:00" },
];

export const mockActivityLog: ActivityLogEntry[] = [
  { id: "log1", actorId: "u1", actorName: "John Doe", actionType: "BID", targetEntity: "Auction", targetId: "a1", description: "Placed bid of $1,650.00 on MacBook Pro 16\"", createdAt: "2025-04-10T14:23:00" },
  { id: "log2", actorId: "u2", actorName: "Sarah Chen", actionType: "CREATE", targetEntity: "Item", targetId: "i4", description: "Listed PlayStation 5 Bundle for auction", createdAt: "2025-04-09T10:00:00" },
  { id: "log3", actorId: "u1", actorName: "John Doe", actionType: "BID", targetEntity: "Auction", targetId: "a6", description: "Placed bid of $4,800.00 on Vintage Air Jordan 1", createdAt: "2025-04-11T12:00:00" },
  { id: "log4", actorId: "u3", actorName: "Mike Johnson", actionType: "UPDATE", targetEntity: "Auction", targetId: "a3", description: "Processed auction - marked as SOLD", createdAt: "2025-04-02T08:30:00" },
  { id: "log5", actorId: "u4", actorName: "Admin User", actionType: "UPDATE", targetEntity: "User", targetId: "u6", description: "Suspended user account: davidk", createdAt: "2025-04-09T16:00:00" },
  { id: "log6", actorId: "u1", actorName: "John Doe", actionType: "CREATE", targetEntity: "TopUp", targetId: "t1", description: "Requested balance top-up of $500.00", createdAt: "2025-04-10T09:00:00" },
  { id: "log7", actorId: "u5", actorName: "Emily Rogers", actionType: "BID", targetEntity: "Auction", targetId: "a10", description: "Placed bid of $2,000.00 on Banksy Print", createdAt: "2025-04-08T16:00:00" },
  { id: "log8", actorId: "u2", actorName: "Sarah Chen", actionType: "PAYMENT", targetEntity: "Payment", targetId: "p1", description: "Payment of $11,500.00 processed for Rolex Submariner", createdAt: "2025-04-02T09:00:00" },
];

// Helper functions
export const getItem = (id: string) => mockItems.find(i => i.id === id);
export const getUser = (id: string) => mockUsers.find(u => u.id === id);
export const getCategory = (id: string) => mockCategories.find(c => c.id === id);
export const getAuctionForItem = (itemId: string) => mockAuctions.find(a => a.itemId === itemId);
export const getBidsForAuction = (auctionId: string) => mockBids.filter(b => b.auctionId === auctionId).sort((a, b) => b.amount - a.amount);
