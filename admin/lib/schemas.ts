import { z } from 'zod';

// ── Categories ────────────────────────────────────────────────
export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres')
    .trim(),
  description: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  display_order: z.coerce.number().int().min(0).default(0),
});

export const UpdateCategorySchema = CreateCategorySchema;

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;

// ── Variant (sub-schema) ──────────────────────────────────────
export const VariantSchema = z.object({
  name:  z.string().min(1, 'Nombre requerido'),
  price: z.coerce.number().positive('El precio debe ser mayor que 0'),
});

// ── Products ──────────────────────────────────────────────────
export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(255, 'Máximo 255 caracteres')
    .trim(),
  description: z
    .string()
    .max(2000, 'Máximo 2000 caracteres')
    .optional()
    .or(z.literal('')),
  short_description: z
    .string()
    .max(300, 'Máximo 300 caracteres')
    .optional()
    .or(z.literal('')),
  price: z.coerce
    .number()
    .positive('El precio debe ser mayor que 0'),
  category_ids: z
    .array(z.string().uuid())
    .default([]),
  image_url: z
    .union([z.string().url('URL de imagen inválida'), z.literal(''), z.null()])
    .optional(),
  // Galería: una URL por línea. Se valida que cada línea sea http(s) válido.
  gallery_urls_text: z
    .string()
    .optional()
    .default('')
    .refine(
      (val) => {
        if (!val) return true;
        const lines = val.split('\n').map(l => l.trim()).filter(Boolean);
        return lines.every(line => {
          try {
            const url = new URL(line);
            return url.protocol === 'https:' || url.protocol === 'http:';
          } catch { return false; }
        });
      },
      { message: 'Cada línea debe ser una URL válida (https://...)' }
    ),
  stock: z.coerce
    .number()
    .int()
    .min(0, 'El stock no puede ser negativo')
    .optional()
    .nullable(),
  is_active:        z.boolean().default(true),
  has_customization: z.boolean().default(false),
  display_order:    z.coerce.number().int().min(0).default(0),
  variants:         z.array(VariantSchema).default([]),
});

export const UpdateProductSchema = CreateProductSchema;

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
