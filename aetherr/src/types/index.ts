export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "COURIER_ASSIGNED"
  | "PICKING_UP"
  | "IN_TRANSIT"
  | "ARRIVED"
  | "DELIVERED"
  | "CANCELLED";

export type SpeedTier =
  | "HYPERSPEED"
  | "SAME_DAY"
  | "SCHEDULED"
  | "ECO_FREIGHT";

export type PackageCategory =
  | "FOOD"
  | "ELECTRONICS"
  | "FURNITURE"
  | "FLOWERS"
  | "MEDICINE"
  | "DOCUMENTS"
  | "PETS"
  | "CLOTHING"
  | "PACKAGES"
  | "FRAGILE"
  | "CARGO"
  | "ANYTHING";

export type CourierVehicle =
  | "WALKER"
  | "ELECTRIC_BIKE"
  | "CYBER_SCOOTER"
  | "ELECTRIC_SEDAN"
  | "CARGO_VAN"
  | "DRONE_AIR";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AddressItem {
  id: string;
  title: string;
  fullAddress: string;
  coords: Coordinates;
  apartment?: string;
  floor?: string;
  accessCode?: string;
  isDefault?: boolean;
}

export interface CourierInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  completedJobs: number;
  vehicle: CourierVehicle;
  vehicleName: string;
  vehiclePlate: string;
  currentLocation: Coordinates;
  badge: "VIP Fleet" | "Quantum Elite" | "Top Rated" | "Fastest Responder";
}

export interface DeliveryOrder {
  id: string;
  orderNumber: string;
  category: PackageCategory;
  speedTier: SpeedTier;
  status: OrderStatus;
  
  pickupAddress: string;
  pickupCoords: Coordinates;
  pickupContactName: string;
  pickupContactPhone: string;
  
  dropoffAddress: string;
  dropoffCoords: Coordinates;
  dropoffContactName: string;
  dropoffContactPhone: string;
  
  estimatedMinutes: number;
  distanceKm: number;
  weightKg: number;
  notes?: string;
  declaredValue?: number;
  insuranceTier: "NONE" | "STANDARD" | "CONCIERGE_TOTAL";
  
  priceSubtotal: number;
  priceSurge: number;
  priceInsurance: number;
  priceTotal: number;
  
  courier?: CourierInfo;
  packagePhotoUrl?: string;
  
  createdAt: string;
  eta: string;
  liveCourierCoords?: Coordinates;
}

export interface CategoryDefinition {
  id: PackageCategory;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  popular?: boolean;
  tag?: string;
}

export interface SpeedOption {
  id: SpeedTier;
  title: string;
  eta: string;
  priceMultiplier: number;
  badge?: string;
  description: string;
  iconName: string;
}
