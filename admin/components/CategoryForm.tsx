import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCategorySchema, type CreateCategoryInput } from '../lib/schemas';
import type { Category } from '../lib/database.types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface CategoryFormProps {
  initial?:  Category | null;
  loading?:  boolean;
  onSubmit:  (data: CreateCategoryInput) => void;
  onCancel:  () => void;
}

export default function CategoryForm({ initial, loading, onSubmit, onCancel }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<CreateCategoryInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(CreateCategorySchema) as any,
    defaultValues: initial
      ? { name: initial.name, description: initial.description ?? '', display_order: initial.display_order }
      : { name: '', description: '', display_order: 0 },
  });

  const nameValue = watch('name');
  const slugPreview = slugify(nameValue ?? '');

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            errors.name ? 'border-red-400' : 'border-gray-300'
          }`}
          placeholder="Ej: Posavasos"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        {slugPreview && (
          <p className="mt-1 text-xs text-gray-400">
            Slug: <span className="font-mono">{slugPreview}</span>
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          {...register('description')}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none ${
            errors.description ? 'border-red-400' : 'border-gray-300'
          }`}
          placeholder="Descripción opcional de la categoría"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Display order */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Orden de visualización</label>
        <input
          {...register('display_order')}
          type="number"
          min={0}
          className={`w-32 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            errors.display_order ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.display_order && (
          <p className="mt-1 text-xs text-red-500">{errors.display_order.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {initial ? 'Guardar cambios' : 'Crear categoría'}
        </button>
      </div>
    </form>
  );
}
