import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductSchema, type CreateProductInput } from '../lib/schemas';
import { useCategories } from '../lib/queries';
import type { ProductWithCategory } from '../lib/database.types';

interface ProductFormProps {
  initial?:  ProductWithCategory | null;
  loading?:  boolean;
  onSubmit:  (data: CreateProductInput) => void;
  onCancel:  () => void;
}

function galleryArrayToText(arr: unknown): string {
  if (!Array.isArray(arr)) return '';
  return arr.filter(Boolean).join('\n');
}

export default function ProductForm({ initial, loading, onSubmit, onCancel }: ProductFormProps) {
  const { data: categories = [] } = useCategories();

  const initialCategoryIds = Array.isArray(initial?.product_categories)
    ? initial.product_categories.map(pc => pc.category_id)
    : [];

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProductInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(CreateProductSchema) as any,
    defaultValues: initial
      ? {
          name:              initial.name,
          description:       initial.description        ?? '',
          short_description: initial.short_description  ?? '',
          price:             initial.price,
          category_ids:      initialCategoryIds,
          image_url:         initial.image_url           ?? '',
          gallery_urls_text: galleryArrayToText(initial.gallery_urls),
          stock:             initial.stock               ?? undefined,
          is_active:         initial.is_active,
          has_customization: initial.has_customization,
          display_order:     initial.display_order,
          variants:          Array.isArray(initial.variants) ? initial.variants as { name: string; price: number }[] : [],
        }
      : {
          name: '', description: '', short_description: '', price: 0,
          category_ids: [],
          is_active: true, has_customization: false, display_order: 9999,
          gallery_urls_text: '', variants: [],
        },
  });

  const { fields: variantFields, append: addVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variants',
  });

  const watchedCategoryIds = watch('category_ids') ?? [];

  function toggleCategory(catId: string, checked: boolean) {
    setValue(
      'category_ids',
      checked
        ? [...watchedCategoryIds, catId]
        : watchedCategoryIds.filter(id => id !== catId),
      { shouldValidate: true }
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">

      {/* ── Datos básicos ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Nombre */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Ej: Lámpara de resina personalizada"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio base (€) <span className="text-red-500">*</span>
          </label>
          <input
            {...register('price')}
            type="number" step="0.01" min="0.01"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.price ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="29.99"
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input
            {...register('stock')}
            type="number" min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Vacío = ilimitado"
          />
        </div>
      </div>
      {/* display_order se gestiona por drag-and-drop en el listado */}
      <input {...register('display_order')} type="hidden" />

      {/* ── Categorías (múltiple selección) ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categorías
          {watchedCategoryIds.length > 0 && (
            <span className="ml-2 text-xs text-amber-600 font-normal">
              ({watchedCategoryIds.length} seleccionada{watchedCategoryIds.length > 1 ? 's' : ''})
            </span>
          )}
        </label>
        {categories.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No hay categorías creadas aún</p>
        ) : (
          <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
            {categories.map(cat => {
              const checked = watchedCategoryIds.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 cursor-pointer p-1.5 rounded-md hover:bg-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={e => toggleCategory(cat.id, e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <span className="text-sm text-gray-700 truncate">{cat.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Descripciones ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción corta <span className="text-gray-400 font-normal">(aparece en catálogo)</span>
        </label>
        <input
          {...register('short_description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Una frase atractiva sobre el producto"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción completa</label>
        <textarea
          {...register('description')}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
          placeholder="Descripción detallada del producto..."
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
      </div>

      {/* ── Imágenes ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL imagen principal</label>
        <input
          {...register('image_url')}
          type="url"
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.image_url ? 'border-red-400' : 'border-gray-300'}`}
          placeholder="https://..."
        />
        {errors.image_url && <p className="mt-1 text-xs text-red-500">{errors.image_url.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Galería de imágenes <span className="text-gray-400 font-normal">(una URL por línea)</span>
        </label>
        <textarea
          {...register('gallery_urls_text')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none font-mono"
          placeholder={"https://imagen1.jpg\nhttps://imagen2.jpg\nhttps://imagen3.jpg"}
        />
      </div>

      {/* ── Variantes ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Variantes <span className="text-gray-400 font-normal">(tallas, acabados...)</span>
          </label>
          <button
            type="button"
            onClick={() => addVariant({ name: '', price: 0 })}
            className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Añadir variante
          </button>
        </div>

        {variantFields.length === 0 && (
          <p className="text-xs text-gray-400 italic">Sin variantes — el producto tendrá precio único</p>
        )}

        <div className="space-y-2">
          {variantFields.map((field, idx) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                {...register(`variants.${idx}.name`)}
                placeholder="Nombre (ej: Grande)"
                className="flex-1 px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                {...register(`variants.${idx}.price`)}
                type="number" step="0.01" min="0.01"
                placeholder="Precio €"
                className="w-24 px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="button"
                onClick={() => removeVariant(idx)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Opciones ── */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input {...register('is_active')} type="checkbox" className="w-4 h-4 accent-amber-600" />
          <span className="text-sm font-medium text-gray-700">Producto activo</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input {...register('has_customization')} type="checkbox" className="w-4 h-4 accent-amber-600" />
          <span className="text-sm font-medium text-gray-700">Permite personalización</span>
        </label>
      </div>

      {/* ── Botones ── */}
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 sticky bottom-0 bg-white pb-1">
        <button
          type="button" onClick={onCancel} disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit" disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          {initial ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  );
}
