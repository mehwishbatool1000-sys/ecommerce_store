export type DressCategory =
  | 'Bridal & Couture'
  | 'Luxury Pret'
  | 'Luxury Lawn'
  | 'Festive & Formals'
  | 'Modest & Abayas'
  | 'Western Fusion';

export type DressSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom';
export type StitchingOption = 'Ready to Wear (Stitched)' | 'Unstitched (3-Piece)';

export interface Dress {
  id: string;
  sku: string;
  title: string;
  category: DressCategory;
  fabric: string;
  description: string;
  price: number;
  originalPrice?: number;
  availableSizes: DressSize[];
  stitchingOptions: StitchingOption[];
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  color: string;
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  craftDetails?: string[];
  careGuide?: string;
}

export interface CartItem {
  id: string; // unique item cart key (dressId + size + stitch)
  dress: Dress;
  selectedSize: DressSize;
  stitchingOption: StitchingOption;
  quantity: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'In Stitching / Processing'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod =
  | 'Cash on Delivery (COD)'
  | 'Debit / Credit Card'
  | 'JazzCash / EasyPaisa Bank Transfer';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  dressId?: string;
  dressTitle?: string;
  customerName: string;
  city?: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
  recommended: boolean;
}
