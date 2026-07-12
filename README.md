# Kalkux API

API backend del motor de sitios dinámicos Kalkux. Guarda y sirve, por tienda (`store`), la configuración, el tema y el catálogo de productos que consumen los sitios generados con Kalkux (frontend en kalkux.com). Cada tienda tiene una configuración, un tema y un catálogo de productos, todos como documentos JSON.

## Stack

- [Hono](https://hono.dev/) como framework HTTP.
- Cloudflare Workers como runtime (edge).
- Cloudflare D1 (SQLite) como base de datos.
- Wrangler como herramienta de desarrollo y despliegue.

## Cómo correr

Requisitos: Node.js y una cuenta de Cloudflare con Wrangler autenticado.

```bash
npm install

# Preparar la base de datos local (esquema + datos de ejemplo)
npm run db:migrate
npm run db:seed

# Levantar el servidor de desarrollo
npm run dev
```

El seed incluye la tienda de ejemplo `kilig` (Kilig Coffee), útil para probar los endpoints.

### Despliegue

```bash
# Aplicar el esquema y el seed en la base remota (solo la primera vez o al cambiar el esquema)
npm run db:migrate:remote
npm run db:seed:remote

npm run deploy
```

## Endpoints

Base: `/v1/stores`. Todas las respuestas son JSON.

| Método   | Ruta                          | Descripción                                  |
|----------|-------------------------------|----------------------------------------------|
| `GET`    | `/`                           | Metadatos de la API                          |
| `GET`    | `/v1/stores`                  | Lista todas las tiendas                      |
| `POST`   | `/v1/stores`                  | Crea una tienda (`{ id, name }`)             |
| `DELETE` | `/v1/stores/:storeId`         | Elimina una tienda y todos sus datos         |
| `GET`    | `/v1/stores/:storeId/config`  | Configuración de la tienda                   |
| `PUT`    | `/v1/stores/:storeId/config`  | Reemplaza la configuración                   |
| `GET`    | `/v1/stores/:storeId/theme`   | Tema (colores, espaciados, sombras)          |
| `PUT`    | `/v1/stores/:storeId/theme`   | Reemplaza el tema                            |
| `GET`    | `/v1/stores/:storeId/products`| Catálogo de productos                        |
| `PUT`    | `/v1/stores/:storeId/products`| Reemplaza el catálogo                        |

Los `PUT` de config, theme y products hacen upsert: el cuerpo JSON enviado reemplaza por completo el documento almacenado.

## Estructura

```
src/
  index.js            Punto de entrada, monta CORS y las rutas
  routes/
    stores.js         Alta, baja y listado de tiendas
    config.js         Configuración por tienda
    theme.js          Tema por tienda
    products.js       Catálogo por tienda
  db/
    schema.sql        Esquema de D1
    seed.sql          Datos de ejemplo (tienda Kilig)
wrangler.toml         Configuración de Worker y binding de D1
```
