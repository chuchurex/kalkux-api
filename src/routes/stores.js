import { Hono } from 'hono';

const stores = new Hono();

// List all stores
stores.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, name, created_at FROM stores ORDER BY created_at DESC'
  ).all();
  return c.json(results);
});

// Create a store
stores.post('/', async (c) => {
  const { id, name } = await c.req.json();
  if (!id || !name) return c.json({ error: 'id and name required' }, 400);

  await c.env.DB.prepare(
    'INSERT INTO stores (id, name) VALUES (?, ?)'
  ).bind(id, name).run();

  return c.json({ id, name }, 201);
});

// Delete a store and all its data
stores.delete('/:storeId', async (c) => {
  const storeId = c.req.param('storeId');

  await c.env.DB.batch([
    c.env.DB.prepare('DELETE FROM configs WHERE store_id = ?').bind(storeId),
    c.env.DB.prepare('DELETE FROM themes WHERE store_id = ?').bind(storeId),
    c.env.DB.prepare('DELETE FROM products WHERE store_id = ?').bind(storeId),
    c.env.DB.prepare('DELETE FROM stores WHERE id = ?').bind(storeId),
  ]);

  return c.json({ deleted: storeId });
});

export { stores };
