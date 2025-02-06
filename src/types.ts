export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'ETH' | 'USDC';
  category: 'watches' | 'jewelry' | 'cars' | 'art';
  images: string[];
  seller: {
    id: string;
    name: string;
    verified: boolean;
  };
  certificateId?: string;
  status: 'pending' | 'approved' | 'sold';
}

export interface User {
  id: string;
  address: string;
  role: 'buyer' | 'seller' | 'admin';
  name?: string;
  verified: boolean;
}

export interface SellerProfile {
  companyName: string;
  registrationNumber: string;
  vatNumber?: string;
  website?: string;
  country: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
  };
  documents: {
    type: 'registration' | 'identity' | 'financial';
    status: 'pending' | 'verified' | 'rejected';
    url: string;
  }[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}