import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { stores } from './routes/stores.js';
import { config } from './routes/config.js';
import { theme } from './routes/theme.js';
import { products } from './routes/products.js';

const app = new Hono();

app.use('/*', cors());

app.get('/', (c) => c.json({
  name: 'kalkux-api',
  version: '0.1.0',
  docs: '/v1/stores'
}));

app.route('/v1/stores', stores);
app.route('/v1/stores', config);
app.route('/v1/stores', theme);
app.route('/v1/stores', products);

app.notFound((c) => c.json({ error: 'Not found' }, 404));

export default app;
