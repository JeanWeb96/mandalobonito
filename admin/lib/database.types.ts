export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          role: 'admin' | 'editor';
          permissions: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: 'admin' | 'editor';
          permissions?: Json;
          created_at?: string;
        };
        Update: {
          role?: 'admin' | 'editor';
          permissions?: Json;
        };
        Relationships: never[];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug?: string;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          display_order?: number;
          updated_at?: string;
        };
        Relationships: never[];
      };
      product_categories: {
        Row: {
          product_id:  string;
          category_id: string;
        };
        Insert: {
          product_id:  string;
          category_id: string;
        };
        Update: {
          product_id?:  string;
          category_id?: string;
        };
        Relationships: never[];
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          short_description: string | null;
          price: number;
          category_id: string | null;
          image_url: string | null;
          gallery_urls: Json;
          stock: number | null;
          is_active: boolean;
          has_customization: boolean;
          variants: Json;
          display_order: number;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          short_description?: string | null;
          price: number;
          category_id?: string | null;
          image_url?: string | null;
          gallery_urls?: Json;
          stock?: number | null;
          is_active?: boolean;
          has_customization?: boolean;
          variants?: Json;
          display_order?: number;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          short_description?: string | null;
          price?: number;
          category_id?: string | null;
          image_url?: string | null;
          gallery_urls?: Json;
          stock?: number | null;
          is_active?: boolean;
          has_customization?: boolean;
          variants?: Json;
          display_order?: number;
          deleted_at?: string | null;
          updated_at?: string;
        };
        Relationships: never[];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type Product  = Database['public']['Tables']['products']['Row'];
export type AdminUser = Database['public']['Tables']['admin_users']['Row'];

export type ProductCategory = {
  category_id: string;
  categories: Pick<Category, 'id' | 'name' | 'slug'> | null;
};

export type ProductWithCategory = Product & {
  product_categories: ProductCategory[];
};
