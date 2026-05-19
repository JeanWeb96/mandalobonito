import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';
import type { Database, Category, ProductWithCategory } from './database.types';
import type {
  CreateCategoryInput, UpdateCategoryInput,
  CreateProductInput,  UpdateProductInput,
} from './schemas';

type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
type CategoryUpdate  = Database['public']['Tables']['categories']['Update'];
type ProductInsert   = Database['public']['Tables']['products']['Insert'];
type ProductUpdate   = Database['public']['Tables']['products']['Update'];

// ── Helpers ───────────────────────────────────────────────────
function parseGalleryUrls(text?: string): string[] {
  return (text ?? '')
    .split('\n')
    .map(u => u.trim())
    .filter(u => u.startsWith('http'));
}

// ── Query keys ────────────────────────────────────────────────
export const QK = {
  categories: ['categories'] as const,
  products: (filters?: { categoryId?: string | null; search?: string }) =>
    ['products', filters ?? {}] as const,
} as const;

// ══════════════════════════════════════════════════════════════
// CATEGORIES
// ══════════════════════════════════════════════════════════════

export function useCategories() {
  return useQuery({
    queryKey: QK.categories,
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []) as Category[];
    },
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateCategoryInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      const payload: CategoryInsert = {
        name:          input.name,
        description:   input.description || null,
        display_order: input.display_order,
        created_by:    user?.id ?? null,
      };
      const { data, error } = await supabase
        .from('categories')
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.categories }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateCategoryInput & { id: string }) => {
      const payload: CategoryUpdate = {
        name:          input.name,
        description:   input.description || null,
        display_order: input.display_order,
      };
      const { data, error } = await supabase
        .from('categories')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.categories }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Verificar que no haya productos activos con esta categoría
      const { data: assoc, error: aErr } = await supabase
        .from('product_categories')
        .select('product_id')
        .eq('category_id', id);
      if (aErr) throw new Error(aErr.message);

      if (assoc && assoc.length > 0) {
        const productIds = assoc.map(a => a.product_id);
        const { count, error: cErr } = await supabase
          .from('products')
          .select('id', { count: 'exact', head: true })
          .in('id', productIds)
          .is('deleted_at', null);
        if (cErr) throw new Error(cErr.message);
        if (count && count > 0) {
          throw new Error(
            `No puedes eliminar esta categoría: tiene ${count} producto(s) activo(s). Cambia o elimina los productos primero.`
          );
        }
      }

      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.categories }),
  });
}

export function useReorderCategories() {
  const qc = useQueryClient();
  return useMutation<void, Error, string[], { prev?: Category[] }>({
    mutationFn: async (orderedIds: string[]) => {
      for (const [index, id] of orderedIds.entries()) {
        const patch: CategoryUpdate = { display_order: index };
        const { error } = await supabase
          .from('categories')
          .update(patch)
          .eq('id', id);
        if (error) throw new Error(error.message);
      }
    },
    onMutate: async (orderedIds: string[]) => {
      await qc.cancelQueries({ queryKey: QK.categories });
      const prev = qc.getQueryData<Category[]>(QK.categories);
      if (prev) {
        const next: Category[] = orderedIds.map((id, i) => ({
          ...prev.find(c => c.id === id)!,
          display_order: i,
        }));
        qc.setQueryData<Category[]>(QK.categories, next);
      }
      return { prev };
    },
    onError: (_e, _ids, ctx) => {
      if (ctx?.prev) qc.setQueryData<Category[]>(QK.categories, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: QK.categories }),
  });
}

export function useDuplicateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data: orig, error: fErr } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      if (fErr || !orig) throw new Error(fErr?.message ?? 'Categoría no encontrada');
      const { data: { user } } = await supabase.auth.getUser();
      const payload: CategoryInsert = {
        name:          `${orig.name} (copia)`,
        description:   orig.description,
        display_order: orig.display_order + 1,
        created_by:    user?.id ?? null,
      };
      const { data, error } = await supabase
        .from('categories')
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.categories }),
  });
}

// ══════════════════════════════════════════════════════════════
// PRODUCTS
// ══════════════════════════════════════════════════════════════

const PRODUCT_SELECT = '*, product_categories(category_id, categories(id, name, slug))';
const PRODUCT_SELECT_INNER = '*, product_categories!inner(category_id, categories(id, name, slug))';

export function useProducts(filters?: { categoryId?: string | null; search?: string }) {
  return useQuery({
    queryKey: QK.products(filters),
    queryFn: async (): Promise<ProductWithCategory[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let query: any;

      if (filters?.categoryId) {
        query = supabase
          .from('products')
          .select(PRODUCT_SELECT_INNER)
          .eq('product_categories.category_id', filters.categoryId)
          .is('deleted_at', null)
          .order('display_order', { ascending: true });
      } else {
        query = supabase
          .from('products')
          .select(PRODUCT_SELECT)
          .is('deleted_at', null)
          .order('display_order', { ascending: true });
      }

      if (filters?.search) query = query.ilike('name', `%${filters.search}%`);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return (data ?? []) as unknown as ProductWithCategory[];
    },
  });
}

async function syncProductCategories(productId: string, categoryIds: string[]) {
  const { error: delErr } = await supabase
    .from('product_categories')
    .delete()
    .eq('product_id', productId);
  if (delErr) throw new Error(delErr.message);

  if (categoryIds.length > 0) {
    const rows = categoryIds.map(catId => ({
      product_id:  productId,
      category_id: catId,
    }));
    const { error: insErr } = await supabase.from('product_categories').insert(rows);
    if (insErr) throw new Error(insErr.message);
  }
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      const payload: ProductInsert = {
        name:              input.name,
        description:       input.description        || null,
        short_description: input.short_description  || null,
        price:             input.price,
        image_url:         input.image_url           || null,
        gallery_urls:      parseGalleryUrls(input.gallery_urls_text),
        stock:             input.stock               ?? null,
        is_active:         input.is_active,
        has_customization: input.has_customization,
        variants:          input.variants ?? [],
        display_order:     input.display_order,
        created_by:        user?.id ?? null,
      };
      const { data, error } = await supabase
        .from('products')
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);

      await syncProductCategories(data.id, input.category_ids ?? []);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateProductInput & { id: string }) => {
      const payload: ProductUpdate = {
        name:              input.name,
        description:       input.description        || null,
        short_description: input.short_description  || null,
        price:             input.price,
        image_url:         input.image_url           || null,
        gallery_urls:      parseGalleryUrls(input.gallery_urls_text),
        stock:             input.stock               ?? null,
        is_active:         input.is_active,
        has_customization: input.has_customization,
        variants:          input.variants ?? [],
        display_order:     input.display_order,
      };
      const { data, error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);

      await syncProductCategories(id, input.category_ids ?? []);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useReorderProducts() {
  const qc = useQueryClient();
  return useMutation<void, Error, string[], { prev?: ProductWithCategory[] }>({
    mutationFn: async (orderedIds: string[]) => {
      for (const [index, id] of orderedIds.entries()) {
        const patch: ProductUpdate = { display_order: index };
        const { error } = await supabase
          .from('products')
          .update(patch)
          .eq('id', id);
        if (error) throw new Error(error.message);
      }
    },
    onMutate: async (orderedIds) => {
      await qc.cancelQueries({ queryKey: ['products'] });
      const key = QK.products();
      const prev = qc.getQueryData<ProductWithCategory[]>(key);
      if (prev) {
        const next = orderedIds.map((id, i) => ({
          ...prev.find(p => p.id === id)!,
          display_order: i,
        }));
        qc.setQueryData<ProductWithCategory[]>(key, next);
      }
      return { prev };
    },
    onError: (_e, _ids, ctx) => {
      if (ctx?.prev) qc.setQueryData<ProductWithCategory[]>(QK.products(), ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useSoftDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const patch: ProductUpdate = { deleted_at: new Date().toISOString() };
      const { error } = await supabase
        .from('products')
        .update(patch)
        .eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDuplicateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Consultas separadas para evitar problemas de inferencia con joins anidados
      const [{ data: orig, error: fErr }, { data: catAssoc }] = await Promise.all([
        supabase.from('products').select('*').eq('id', id).single(),
        supabase.from('product_categories').select('category_id').eq('product_id', id),
      ]);
      if (fErr || !orig) throw new Error(fErr?.message ?? 'Producto no encontrado');

      const { data: { user } } = await supabase.auth.getUser();
      const payload: ProductInsert = {
        name:              `${orig.name} (copia)`,
        description:       orig.description,
        short_description: orig.short_description,
        price:             orig.price,
        image_url:         orig.image_url,
        gallery_urls:      orig.gallery_urls,
        stock:             orig.stock,
        is_active:         orig.is_active,
        has_customization: orig.has_customization,
        variants:          orig.variants,
        display_order:     orig.display_order,
        created_by:        user?.id ?? null,
      };
      const { data: newProd, error } = await supabase
        .from('products')
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);

      const catIds = (catAssoc ?? []).map(pc => pc.category_id);
      await syncProductCategories(newProd.id, catIds);

      return newProd;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
