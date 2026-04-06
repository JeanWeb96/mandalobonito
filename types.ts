
export interface ProductVariant {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  categories: string[];
  shortDescription?: string;
  customization?: boolean;
  variants?: ProductVariant[];
}