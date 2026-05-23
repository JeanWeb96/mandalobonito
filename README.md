<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Mándalo Bonito — E-Commerce Artesanal de Resina

Plataforma web completa construida a medida para un taller artesanal de piezas únicas en resina epoxi. Incluye tienda pública, panel de administración con autenticación y backend en Supabase.

🔗 **[Ver demo en vivo](https://mandalobonito.vercel.app)**

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + TypeScript 5.8 |
| Bundler | Vite 6 + `@tailwindcss/vite` |
| Estilos | Tailwind CSS v4 (configuración vía `@theme`) |
| Routing | React Router v7 (HashRouter) |
| Estado servidor | TanStack Query v5 |
| Base de datos | Supabase (PostgreSQL + RLS) |
| Autenticación | Supabase Auth |
| Almacenamiento | Supabase Storage (imágenes de productos) |
| Formularios | React Hook Form + Zod v4 |
| Drag & Drop | @dnd-kit (reordenación de productos) |
| Despliegue | Vercel (con headers de seguridad) |
| Analíticas | Vercel Analytics (gated por consentimiento RGPD) |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                 │
│                                                     │
│  ┌─────────────┐    ┌──────────────────────────┐   │
│  │  Tienda     │    │   Panel de Administración │   │
│  │  Pública    │    │   /admin (AuthGuard)      │   │
│  │             │    │                          │   │
│  │ @supabase/  │    │  @supabase/supabase-js   │   │
│  │ postgrest-js│    │  (auth + db + storage)   │   │
│  └──────┬──────┘    └────────────┬─────────────┘   │
└─────────┼──────────────────────  ┼─────────────────┘
          │                        │
          ▼                        ▼
┌─────────────────────────────────────────────────────┐
│                    SUPABASE                         │
│  PostgreSQL · Auth · Storage · Row Level Security   │
└─────────────────────────────────────────────────────┘
```

### Separación de clientes Supabase

La tienda pública usa `@supabase/postgrest-js` directamente (solo queries de lectura, ~5 KB gzip) mientras que el panel de admin usa el cliente completo `@supabase/supabase-js` (auth + storage), cargado únicamente cuando se navega a `/admin`. Esto elimina ~47 KB del bundle inicial para visitantes públicos.

---

## Estructura de Directorios

```
mandalobonito/
├── admin/                    # Panel de administración (lazy-loaded)
│   ├── components/
│   │   ├── AuthGuard.tsx     # Protección de rutas admin
│   │   └── ProductForm.tsx   # Formulario con Zod + RHF
│   ├── lib/
│   │   ├── supabase.ts       # Cliente Supabase con tipo Database<>
│   │   ├── queries.ts        # Mutaciones CRUD (TanStack Query)
│   │   └── schemas.ts        # Validación con Zod
│   ├── AdminProtected.tsx    # Wrapper lazy (AuthGuard + Dashboard)
│   ├── DashboardPage.tsx     # UI admin con DnD y filtros
│   └── LoginPage.tsx         # Login con rate-limiting progresivo
├── components/               # Componentes UI reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx       # React.memo + lazy image
│   ├── CookieBanner.tsx      # RGPD + Context Provider
│   └── WhatsAppButton.tsx
├── lib/
│   ├── postgrest.ts          # Cliente ligero (solo lectura pública)
│   └── publicQueries.ts      # Hooks + transformación de imágenes Supabase
├── pages/                    # Rutas públicas (React.lazy + Suspense)
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── EventsPage.tsx
│   ├── WorkshopsPage.tsx
│   └── ...
├── public/img/               # Assets estáticos (logo, imágenes de eventos)
├── App.tsx                   # Router + QueryClient + 13 rutas lazy
├── index.html                # Preload LCP, preconnects, CSP-adjacent headers
├── vite.config.ts            # Code splitting manual por vendor
└── vercel.json               # Security headers (X-Frame, Referrer, etc.)
```

---

## Características Principales

### Tienda Pública
- **Catálogo dinámico** con filtrado por categorías y búsqueda en tiempo real
- **Galería de imágenes** con thumbnails y cambio de imagen principal
- **Lazy loading** de todas las imágenes con `loading="lazy"` + `decoding="async"`
- **Optimización de imágenes Supabase**: URLs de Storage reescritas automáticamente a WebP + resize server-side
- **ScrollReveal** con `IntersectionObserver` para animaciones de entrada
- **WhatsApp deeplink** para consultas de personalización

### Panel de Administración
- **Autenticación** via Supabase Auth con verificación doble (sesión + tabla `admin_users`)
- **CRUD completo** de productos con formulario validado (Zod + React Hook Form)
- **Soporte multi-categoría** via tabla de unión `product_categories`
- **Drag & Drop** de productos con `@dnd-kit` para reordenar (`display_order`)
- **Subida de imágenes** a Supabase Storage con preview
- **Rate limiting progresivo** en login: 3 intentos → 30s, 5 intentos → 5min

### Rendimiento (Lighthouse)
- Code splitting en 20+ chunks paralelos (vendors, pages, admin separado)
- `react-vendor`, `router`, `query` separados y cacheados individualmente
- Admin JS (~300 KB) nunca se descarga para visitantes públicos
- `modulePreload: { polyfill: false }` — target ES2022
- Fonts no bloqueantes con `media="print" onload` + `display=optional`
- Preload del LCP (logo) desde `<head>` del HTML

---

## Variables de Entorno

Crea un archivo `.env.local` en la raíz:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

> El archivo `.env.local` está excluido por `.gitignore` y nunca se commitea.  
> La `ANON_KEY` es pública por diseño de Supabase — la seguridad real la gestiona Row Level Security en PostgreSQL.

---

## Instalación y Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Genera dist/ optimizado
npm run preview  # Preview del build de producción
```

---

## Base de Datos (Supabase)

```sql
-- Tablas principales
products          -- Catálogo con variantes JSON, galería, display_order
categories        -- Categorías con slug y display_order
product_categories -- Tabla de unión M:N (multi-categoría por producto)
admin_users       -- Control de acceso al panel (verificación doble)
```

Row Level Security habilitado en todas las tablas. Los queries públicos usan la anon key con RLS restrictivo; los queries de admin requieren sesión autenticada.

---

## Seguridad

- Sin secretos hardcodeados — todo via `import.meta.env.VITE_*`
- Sin `console.log` en producción (eliminados por esbuild `drop: ['console']`)
- Sin sourcemaps en producción (`sourcemap: false`)
- Headers HTTP en `vercel.json`: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- Cache inmutable para assets con hash: `Cache-Control: public, max-age=31536000, immutable`
- Analíticas condicionadas al consentimiento de cookies (RGPD)
