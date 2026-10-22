export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  in_stock: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}