import { Hono } from 'hono';

const config = new Hono();

// GET /v1/stores/:storeId/config
config.get('/:storeId/config', async (c) => {
  const storeId = c.req.param('storeId');
  const row = await c.env.DB.prepare(
    'SELECT data FROM configs WHERE store_id = ?'
  ).bind(storeId).first();

  if (!row) return c.json({ error: 'Config not found' }, 404);
  return c.json(JSON.parse(row.data));
});

// PUT /v1/stores/:storeId/config
config.put('/:storeId/config', async (c) => {
  const storeId = c.req.param('storeId');
  const body = await c.req.json();
  const data = JSON.stringify(body);
  const now = new Date().toISOString();

  await c.env.DB.prepare(
    `INSERT INTO configs (store_id, data, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(store_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).bind(storeId, data, now).run();

  return c.json({ store_id: storeId, updated_at: now });
});

export { config };
