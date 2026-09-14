// Local development server. On Vercel the app is served by api/index.ts
// instead, which wraps the same Hono app in a serverless function.
import { serve } from '@hono/node-server'
import { app } from './app.js'
import { prisma } from './lib/prisma.js'

prisma
	.$connect()
	.then(() => {
		console.log('Connected to the database')
	})
	.catch((error) => {
		console.error('Error connecting to the database:', error)
	})

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`)
	}
)

process.on('beforeExit', async () => {
	await prisma.$disconnect()
})
