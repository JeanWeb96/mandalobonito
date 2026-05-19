import { useState } from 'react';
import React from 'react';
import { useDebounce } from '../lib/useDebounce';
import toast from 'react-hot-toast';
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  useProducts, useCategories, useCreateProduct, useUpdateProduct,
  useSoftDeleteProduct, useDuplicateProduct, useReorderProducts,
} from '../lib/queries';
import type { ProductWithCategory } from '../lib/database.types';
import type { CreateProductInput } from '../lib/schemas';
import ProductForm from './ProductForm';
import ConfirmModal from './ConfirmModal';

// ── Fila sortable ─────────────────────────────────────────────
interface SortableRowProps {
  key?: React.Key | null;
  product:     ProductWithCategory;
  index:       number;
  isDragDisabled: boolean;
  onEdit:      (p: ProductWithCategory) => void;
  onDuplicate: (p: ProductWithCategory) => void;
  onDelete:    (p: ProductWithCategory) => void;
}

function SortableRow({ product, index, isDragDisabled, onEdit, onDuplicate, onDelete }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: product.id, disabled: isDragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const categoryNames = product.product_categories
    ?.map(pc => pc.categories?.name)
    .filter(Boolean) ?? [];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm hover:border-gray-200 transition-colors"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className={`p-1 touch-none flex-shrink-0 ${
          isDragDisabled
            ? 'text-gray-200 cursor-not-allowed'
            : 'text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing'
        }`}
        aria-label="Arrastrar para reordenar"
        tabIndex={isDragDisabled ? -1 : 0}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
      </button>

      {/* Posición */}
      <span className="text-xs text-gray-400 w-5 text-center flex-shrink-0">{index + 1}</span>

      {/* Miniatura */}
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      )}

      {/* Nombre + categorías */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
        {categoryNames.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {categoryNames.map(name => (
              <span key={name} className="inline-flex px-1.5 py-0 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Precio */}
      <span className="text-sm font-semibold text-gray-900 flex-shrink-0 hidden sm:block">
        {product.price.toFixed(2)} €
      </span>

      {/* Stock */}
      <span className="text-xs text-gray-500 w-8 text-center flex-shrink-0 hidden md:block">
        {product.stock != null ? product.stock : <span className="text-gray-400">∞</span>}
      </span>

      {/* Estado */}
      <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
        product.is_active
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-gray-100 text-gray-500 border border-gray-200'
      }`}>
        {product.is_active ? 'Activo' : 'Inactivo'}
      </span>

      {/* Acciones */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button
          onClick={() => onEdit(product)}
          className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          title="Editar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDuplicate(product)}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Duplicar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(product)}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────
export default function ProductsManager() {
  const [search,         setSearch]         = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showForm,       setShowForm]       = useState(false);
  const [editTarget,     setEditTarget]     = useState<ProductWithCategory | null>(null);
  const [deleteTarget,   setDeleteTarget]   = useState<ProductWithCategory | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading, error } = useProducts({
    categoryId: categoryFilter,
    search:     debouncedSearch,
  });

  const createProduct    = useCreateProduct();
  const updateProduct    = useUpdateProduct();
  const deleteProduct    = useSoftDeleteProduct();
  const duplicateProduct = useDuplicateProduct();
  const reorderProducts  = useReorderProducts();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // DnD solo activo sin filtros
  const isDragDisabled = !!(debouncedSearch || categoryFilter);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = products.findIndex(p => p.id === active.id);
    const newIdx = products.findIndex(p => p.id === over.id);
    const reordered = arrayMove(products, oldIdx, newIdx);
    reorderProducts.mutate(reordered.map(p => p.id));
  }

  function closeForm() { setShowForm(false); setEditTarget(null); }

  async function handleSubmit(data: CreateProductInput) {
    if (editTarget) {
      updateProduct.mutate(
        { id: editTarget.id, ...data },
        {
          onSuccess: () => { toast.success('Producto actualizado'); closeForm(); },
          onError: (e) => toast.error(e.message),
        }
      );
    } else {
      createProduct.mutate(data, {
        onSuccess: () => { toast.success('Producto creado'); closeForm(); },
        onError: (e) => toast.error(e.message),
      });
    }
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteProduct.mutate(deleteTarget.id, {
      onSuccess: () => { toast.success('Producto eliminado'); setDeleteTarget(null); },
      onError: (e) => { toast.error(e.message); setDeleteTarget(null); },
    });
  }

  function handleDuplicate(p: ProductWithCategory) {
    duplicateProduct.mutate(p.id, {
      onSuccess: () => toast.success('Producto duplicado'),
      onError: (e) => toast.error(e.message),
    });
  }

  const isMutating = createProduct.isPending || updateProduct.isPending;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Productos</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
            {isDragDisabled
              ? ' · Quita los filtros para reordenar'
              : ' · Arrastra para reordenar'}
          </p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo producto
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar productos…"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <select
          value={categoryFilter ?? ''}
          onChange={e => setCategoryFilter(e.target.value || null)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="">Todas las categorías</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Chips de categoría */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              !categoryFilter
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-amber-400'
            }`}
          >
            Todas
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id === categoryFilter ? null : cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-amber-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Modal formulario */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/40" onClick={closeForm} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl my-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">
              {editTarget ? 'Editar producto' : 'Nuevo producto'}
            </h3>
            <ProductForm
              initial={editTarget}
              loading={isMutating}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {deleteTarget && (
        <ConfirmModal
          title="¿Eliminar producto?"
          message={`Se eliminará "${deleteTarget.name}". Podrás recuperarlo desde la base de datos si es necesario.`}
          loading={deleteProduct.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Lista con DnD */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 text-sm">{(error as Error).message}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="font-medium">Sin productos</p>
          <p className="text-xs mt-1">
            {debouncedSearch || categoryFilter ? 'Prueba con otros filtros' : 'Crea el primer producto'}
          </p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {products.map((product, idx) => (
                <SortableRow
                  key={product.id}
                  product={product}
                  index={idx}
                  isDragDisabled={isDragDisabled}
                  onEdit={p => { setEditTarget(p); setShowForm(true); }}
                  onDuplicate={handleDuplicate}
                  onDelete={p => setDeleteTarget(p)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
