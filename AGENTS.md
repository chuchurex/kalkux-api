# kalkux-api

API backend del motor de sitios dinamicos Kalkux. Guarda y sirve, por tienda
(`store`), la configuracion, el tema y el catalogo de productos que consumen los
sitios generados con Kalkux (frontend en kalkux.com). Cada recurso se almacena como
documento JSON en Cloudflare D1.

## Stack
- Hono (framework HTTP)
- Cloudflare Workers (runtime en el edge)
- Cloudflare D1 (SQLite) como base de datos
- Wrangler (desarrollo y despliegue)

## Comandos
- `npm install`
- `npm run db:migrate` / `npm run db:seed` - esquema y datos de ejemplo en la BD local
- `npm run dev` - servidor de desarrollo (wrangler dev)
- `npm run db:migrate:remote` / `npm run db:seed:remote` - aplicar en la BD remota (primera vez o al cambiar el esquema)
- `npm run deploy` - despliegue del Worker (wrangler deploy)

## Estructura
- `src/index.js` - punto de entrada, monta CORS y las rutas
- `src/routes/` - `stores.js` (alta/baja/listado), `config.js`, `theme.js`, `products.js` (por tienda)
- `src/db/` - `schema.sql` (esquema D1), `seed.sql` (tienda de ejemplo `kilig`)
- `wrangler.toml` - configuracion del Worker y binding de D1

## Notas
- API REST bajo `/v1/stores`; respuestas JSON. Los `PUT` de config/theme/products
  hacen upsert: el cuerpo reemplaza por completo el documento almacenado.
- El binding de D1 (`kalkux-db`) y su configuracion viven en `wrangler.toml`.
  Requiere una cuenta de Cloudflare con Wrangler autenticado.

## Infraestructura (deploy y datos SEO)

El deploy en Cloudflare y el acceso a datos SEO (Search Console / Analytics) usan credenciales
gestionadas localmente por el mantenedor, fuera del repositorio. No hay secretos versionados:
tokens y service accounts viven solo en el entorno local, nunca en el repo.
