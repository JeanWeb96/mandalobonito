-- =============================================================
-- MIGRACIÓN 001: Panel de Administración - Mándalo Bonito
-- Ejecutar en Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- =============================================================

-- Extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================
-- TABLA: admin_users
-- =============================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id          UUID    PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT    NOT NULL CHECK (role IN ('admin', 'editor')) DEFAULT 'admin',
  permissions JSONB   NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLA: categories
-- =============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT        NOT NULL,
  slug          TEXT        NOT NULL,
  description   TEXT,
  display_order INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT categories_name_unique UNIQUE (name),
  CONSTRAINT categories_slug_unique UNIQUE (slug)
);

-- =============================================================
-- TABLA: products
-- =============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id            UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT           NOT NULL,
  description   TEXT,
  price         DECIMAL(10,2)  NOT NULL CHECK (price > 0),
  category_id   UUID           REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url     TEXT,
  stock         INTEGER,
  is_active     BOOLEAN        NOT NULL DEFAULT TRUE,
  display_order INTEGER        NOT NULL DEFAULT 0,
  deleted_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  created_by    UUID           REFERENCES auth.users(id) ON DELETE SET NULL
);

-- =============================================================
-- FUNCIÓN: Generar slug desde texto con soporte de caracteres españoles
-- =============================================================
CREATE OR REPLACE FUNCTION public.slugify(input TEXT)
RETURNS TEXT AS $$
DECLARE
  result TEXT;
BEGIN
  result := lower(input);
  result := translate(result,
    'áàäâãéèëêíìïîóòöôõúùüûñçÁÀÄÂÃÉÈËÊÍÌÏÎÓÒÖÔÕÚÙÜÛÑÇ',
    'aaaaaeeeeiiiiooooouuuuncaaaaaeeeeiiiioooooouuuunc'
  );
  result := regexp_replace(result, '[^a-z0-9\s-]', '', 'g');
  result := regexp_replace(result, '\s+',           '-', 'g');
  result := regexp_replace(result, '-+',            '-', 'g');
  result := trim(both '-' from result);
  RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =============================================================
-- TRIGGER: Auto-generar slug y updated_at en categories
-- =============================================================
CREATE OR REPLACE FUNCTION public.categories_before_upsert()
RETURNS TRIGGER AS $$
BEGIN
  NEW.slug       := public.slugify(NEW.name);
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS categories_upsert_trigger ON public.categories;
CREATE TRIGGER categories_upsert_trigger
  BEFORE INSERT OR UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.categories_before_upsert();

-- =============================================================
-- TRIGGER: Auto-actualizar updated_at en products
-- =============================================================
CREATE OR REPLACE FUNCTION public.products_before_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_update_trigger ON public.products;
CREATE TRIGGER products_update_trigger
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.products_before_update();

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products    ENABLE ROW LEVEL SECURITY;

-- admin_users: el propio usuario puede leer su fila
CREATE POLICY "admin_users_select_own" ON public.admin_users
  FOR SELECT USING (auth.uid() = id);

-- categories: solo admins
CREATE POLICY "admin_can_manage_categories" ON public.categories
  FOR ALL
  USING     (auth.uid() IN (SELECT id FROM public.admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM public.admin_users));

-- products: solo admins
CREATE POLICY "admin_can_manage_products" ON public.products
  FOR ALL
  USING     (auth.uid() IN (SELECT id FROM public.admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM public.admin_users));

-- =============================================================
-- PERMISOS para el rol authenticated
-- =============================================================
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL   ON public.admin_users TO authenticated;
GRANT ALL   ON public.categories  TO authenticated;
GRANT ALL   ON public.products    TO authenticated;

-- =============================================================
-- PRIMER ADMIN
-- Descomenta y reemplaza el UUID con el uid de tu usuario en Auth
-- =============================================================
-- INSERT INTO public.admin_users (id, role)
-- VALUES ('REEMPLAZA-CON-TU-USER-UUID', 'admin')
-- ON CONFLICT (id) DO NOTHING;
