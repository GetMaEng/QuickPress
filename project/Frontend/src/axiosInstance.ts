import axios from 'axios';

// In production vercel.json rewrites /api/* to the backend deployment, so the
// browser only ever talks to one origin and the auth cookie stays first-party.
// Locally, .env.development points this at the Hono dev server on :3000.
const baseURL = import.meta.env.VITE_API_URL ?? '/api';

const Axios = axios.create({
	baseURL,
	withCredentials: true,
});

export { Axios };
