import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/index.js'
import { mainRouter } from './routes/index.route.ts'
import { cors } from 'hono/cors';

const app = new Hono()

export const db = new PrismaClient();

app.use(
	cors({
		origin: ['http://localhost:5173'], // Your frontend application
	})
);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("", mainRouter);

db.$connect()
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

process.on('beforeExit', async () => {
  await db.$disconnect()
})