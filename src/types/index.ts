// Product Category Types
export type ProductCategory = "chairs" | "desks" | "tables" | "workstations" | "storage";

// Technical Specifications (Chairs, Desks & Tables ke liye)
export interface ProductSpecification {
  material: string;
  dimensions: string;
  weightCapacity: string;
  warranty: string;
  mechanism?: string;
  colorOptions: string[];
}

// Complete Product Model
export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: ProductCategory;
  categoryName: string;
  tagline: string;
  description: string;
  price: number; // PKR me
  priceOnRequest?: boolean;
  images: string[];
  thumbnail: string;
  specs: ProductSpecification;
  features: string[];
  inStock: boolean;
  leadTime: string; // Maslan: "24-48 Hours"
  isBestSeller?: boolean;
  isFeatured?: boolean;
  bulkDiscountAvailable: boolean;
}

// Quotation Cart Item (Bulk Inquiry ke liye)
export interface QuoteCartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customNotes?: string;
}

// Portfolio & Office Projects Model
export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  city: string;
  category: string;
  completionYear: string;
  scope: string;
  imageBefore?: string;
  imageAfter: string;
  gallery: string[];
  description: string;
  productsUsed: string[];
}

// Client Reviews
export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  designation: string;
  city: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
}

// Corporate FAQs
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Orders" | "Delivery & Logistics" | "Warranty" | "Custom Bulk";
}