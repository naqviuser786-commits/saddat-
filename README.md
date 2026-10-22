# Beauty Store Frontend

Vite + React + TypeScript + Tailwind + Supabase (auth, DB, storage).

1. `npm install`
2. Fill `.env` (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
3. Supabase: tables `products`, `categories`, `orders` (see src/types/content.ts) and a public storage bucket `product-images`
4. `npm run dev`

Routes: / /shop /product/:slug /cart /checkout, admin at /admin (login, products, categories, orders, settings).