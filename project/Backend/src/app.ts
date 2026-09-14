import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { mainRouter } from './routes/index.route.js'

// Comma-separated list of browser origins allowed to call this API directly,
// e.g. CORS_ORIGIN="https://quickpress.vercel.app,http://localhost:5173".
// The deployed frontend proxies /api/* to this backend, so those requests are
// same-origin and never hit CORS - this is for local dev and direct calls.
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean)

const app = new Hono()

app.use(
	'*',
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
)

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

app.route('', mainRouter)

export { app }

// Vercel's Hono builder turns this default export into the serverless
// function that serves every route. src/dev-server.ts is the local equivalent.
export default app
