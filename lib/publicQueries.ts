import { useQuery } from '@tanstack/react-query';
import { db } from './postgrest';
import type { Product, ProductVariant } from '../types';

// ── Mapper: fila de Supabase → Product interface existente ────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToProduct(row: any): Product {
  const galleryUrls: string[] = Array.isArray(row.gallery_urls) ? row.gallery_urls : [];
  const mainImage: string = row.image_url ?? '';
  const variants: ProductVariant[] = Array.isArray(row.variants) && row.variants.length > 0
    ? row.variants
    : [];

  // Categorías desde la tabla de unión (múltiples)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoryNames: string[] = Array.isArray(row.product_categories)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? row.product_categories.map((pc: any) => pc.categories?.name).filter(Boolean)
    : [];

  // La galería incluye siempre la imagen principal como primera miniatura
  const gallery: string[] = mainImage
    ? [mainImage, ...galleryUrls.filter(u => u !== mainImage)]
    : galleryUrls;

  return {
    id:               row.id,
    name:             row.name,
    price:            Number(row.price),
    image:            mainImage,
    gallery,
    description:      row.description ?? '',
    categories:       categoryNames,
    shortDescription: row.short_description ?? undefined,
    customization:    row.has_customization ?? false,
    variants:         variants.length > 0 ? variants : undefined,
  };
}

const PUBLIC_SELECT = '*, product_categories(category_id, categories(id, name, slug))';
const PUBLIC_SELECT_INNER = '*, product_categories!inner(category_id, categories(id, name, slug))';

// ── Hooks públicos (sin autenticación) ────────────────────────

export function usePublicCategories() {
  return useQuery({
    queryKey: ['public', 'categories'],
    queryFn: async () => {
      const { data, error } = await db
        .from('categories')
        .select('id, name, slug, display_order')
        .order('display_order', { ascending: true });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicProducts(filters?: { categoryId?: string | null; search?: string }) {
  return useQuery({
    queryKey: ['public', 'products', filters ?? {}],
    queryFn: async (): Promise<Product[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let query: any;

      if (filters?.categoryId) {
        query = db
          .from('products')
          .select(PUBLIC_SELECT_INNER)
          .eq('product_categories.category_id', filters.categoryId)
          .eq('is_active', true)
          .is('deleted_at', null)
          .order('display_order', { ascending: true });
      } else {
        query = db
          .from('products')
          .select(PUBLIC_SELECT)
          .eq('is_active', true)
          .is('deleted_at', null)
          .order('display_order', { ascending: true });
      }

      if (filters?.search) query = query.ilike('name', `%${filters.search}%`);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return (data ?? []).map(mapToProduct);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['public', 'products', id],
    queryFn: async (): Promise<Product | null> => {
      if (!id) return null;
      const { data, error } = await db
        .from('products')
        .select(PUBLIC_SELECT)
        .eq('id', id)
        .eq('is_active', true)
        .is('deleted_at', null)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? mapToProduct(data) : null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
