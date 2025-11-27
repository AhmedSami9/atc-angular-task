export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  stock: number;
  price: number;
  currency: string;
  thumbnail_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
