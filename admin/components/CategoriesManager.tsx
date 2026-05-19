import { useState } from 'react';
import toast from 'react-hot-toast';
import React from 'react';
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
  useCategories, useCreateCategory, useUpdateCategory,
  useDeleteCategory, useReorderCategories, useDuplicateCategory,
} from '../lib/queries';
import type { Category } from '../lib/database.types';
import type { CreateCategoryInput } from '../lib/schemas';
import CategoryForm from './CategoryForm';
import ConfirmModal from './ConfirmModal';

// ── Sortable row ──────────────────────────────────────────────
interface SortableRowProps {
  key?:        React.Key | null;
  category:    Category;
  onEdit:      (c: Category) => void;
  onDuplicate: (c: Category) => void;
  onDelete:    (c: Category) => void;
}

function SortableRow({ category, onEdit, onDuplicate, onDelete }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none p-1"
        aria-label="Arrastrar para reordenar"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{category.name}</p>
        <p className="text-xs text-gray-400 font-mono truncate">{category.slug}</p>
        {category.description && (
          <p className="text-xs text-gray-500 mt-0.5 truncate">{category.description}</p>
        )}
      </div>

      {/* Order badge */}
      <span className="text-xs text-gray-400 w-6 text-center">{category.display_order}</span>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(category)}
          className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          title="Editar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDuplicate(category)}
          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Duplicar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(category)}
          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

// ── Main component ────────────────────────────────────────────
export default function CategoriesManager() {
  const { data: categories = [], isLoading, error } = useCategories();
  const createCategory    = useCreateCategory();
  const updateCategory    = useUpdateCategory();
  const deleteCategory    = useDeleteCategory();
  const reorderCategories = useReorderCategories();
  const duplicateCategory = useDuplicateCategory();

  const [showForm,      setShowForm]      = useState(false);
  const [editTarget,    setEditTarget]    = useState<Category | null>(null);
  const [deleteTarget,  setDeleteTarget]  = useState<Category | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = categories.findIndex(c => c.id === active.id);
    const newIdx = categories.findIndex(c => c.id === over.id);
    const reordered = arrayMove(categories, oldIdx, newIdx);
    reorderCategories.mutate(reordered.map(c => c.id));
  }

  async function handleSubmit(data: CreateCategoryInput) {
    if (editTarget) {
      updateCategory.mutate(
        { id: editTarget.id, ...data },
        {
          onSuccess: () => { toast.success('Categoría actualizada'); closeForm(); },
          onError: (e) => toast.error(e.message),
        }
      );
    } else {
      createCategory.mutate(data, {
        onSuccess: () => { toast.success('Categoría creada'); closeForm(); },
        onError: (e) => toast.error(e.message),
      });
    }
  }

  function openEdit(cat: Category) { setEditTarget(cat); setShowForm(true); }
  function closeForm() { setShowForm(false); setEditTarget(null); }

  function handleDuplicate(cat: Category) {
    duplicateCategory.mutate(cat.id, {
      onSuccess: () => toast.success('Categoría duplicada'),
      onError: (e) => toast.error(e.message),
    });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteCategory.mutate(deleteTarget.id, {
      onSuccess: () => { toast.success('Categoría eliminada'); setDeleteTarget(null); },
      onError: (e) => { toast.error(e.message); setDeleteTarget(null); },
    });
  }

  const isMutating =
    createCategory.isPending || updateCategory.isPending;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Categorías</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {categories.length} {categories.length === 1 ? 'categoría' : 'categorías'} · Arrastra para reordenar
          </p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva categoría
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeForm} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">
              {editTarget ? 'Editar categoría' : 'Nueva categoría'}
            </h3>
            <CategoryForm
              initial={editTarget}
              loading={isMutating}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <ConfirmModal
          title="¿Eliminar categoría?"
          message={`Se eliminará "${deleteTarget.name}" de forma permanente. Esta acción no se puede deshacer.`}
          loading={deleteCategory.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 text-sm">{(error as Error).message}</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          <p className="font-medium">Sin categorías aún</p>
          <p className="text-xs mt-1">Crea la primera categoría con el botón de arriba</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {categories.map(cat => (
                <SortableRow
                  key={cat.id}
                  category={cat}
                  onEdit={openEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={(c) => setDeleteTarget(c)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
