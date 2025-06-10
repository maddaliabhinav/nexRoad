export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  userType: 'user' | 'gas_station' | 'mechanic';
  location?: Location;
  avatar?: string;
  rating?: number;
  isOnline?: boolean;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface ServiceProvider extends User {
  businessName: string;
  services: Service[];
  coverageRadius: number;
  isAvailable: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  priceUnit: string;
  category: 'fuel' | 'mechanical';
  estimatedTime: number;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  serviceType: 'fuel' | 'mechanical';
  location: Location;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  acceptedBy?: string;
  estimatedArrival?: Date;
  totalCost?: number;
  fuelQuantity?: number;
  fuelType?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface FuelPrice {
  type: string;
  price: number;
  providerId: string;
}