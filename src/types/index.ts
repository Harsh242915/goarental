export type RoomStatus = 
  | 'OCCUPIED'
  | 'IN_HOUSE'
  | 'ARRIVING_TODAY'
  | 'VACANT_CLEAN'
  | 'DIRTY_TURNOVER'
  | 'OWNER_BLOCK';

export interface RoomItem {
  id: string;
  roomNumber: string;
  name: string;
  clusterId: string;
  clusterName: string;
  clusterLocation: string;
  status: RoomStatus;
  statusLabel: string;
  features: string[];
  tariff: number;
  imageUrl?: string;
  gallery?: string[];
  description?: string;
  bedType?: string;
  maxGuests?: number;
  sizeSqFt?: number;
  guest?: {
    name: string;
    pax: number;
    phone: string;
    email?: string;
    passport?: string;
    idVerified?: boolean;
    checkIn: string;
    checkOut: string;
    arrivedAt?: string;
    eta?: string;
    flight?: string;
    transferDispatched?: boolean;
    folioAmount?: number;
    settlementStatus?: 'PAID_UPI' | 'PAID_CARD' | 'PENDING';
    securityHold?: number;
    bookingRef?: string;
    specialRequests?: {
      airportTransfer?: boolean;
      woodenBabyCot?: boolean;
      bbqDinner?: boolean;
      chefAssigned?: boolean;
    };
  };
  inspection?: {
    by: string;
    time: string;
  };
  nextBooking?: {
    date: string;
    guestName: string;
  };
  turnoverDetails?: {
    cleaningTimeRemaining: string;
    team: string;
    nextCheckIn: string;
  };
  ownerBlockDetails?: {
    ownerName: string;
    blockedUntil: string;
    assignedStaff: string;
  };
}

export interface ClusterGroup {
  id: string;
  name: string;
  location: string;
  roomCount: number;
  operationalStatus: string;
  rooms: RoomItem[];
}

export interface VisualScheduleRow {
  roomNumber: string;
  roomName: string;
  roomSubtext: string;
  revenueYield: number;
  yieldStatus: string;
  bookings: {
    id: string;
    guestName: string;
    guestCount?: string;
    status: 'IN_HOUSE' | 'ARRIVING_TODAY' | 'VACANT_CLEAN' | 'TURNOVER' | 'FUTURE_BOOKING';
    startDay: number; // 0 to 6
    durationDays: number;
    label: string;
    tag?: string;
  }[];
}

export interface VillaProduct {
  id: string;
  title: string;
  subtitle: string;
  clusterId: string;
  location: string;
  region: 'North Goa' | 'South Goa' | 'Riverfront' | 'Heritage Assagao';
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  tagline: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  amenities: string[];
  signatureHighlights: string[];
  featured?: boolean;
}
