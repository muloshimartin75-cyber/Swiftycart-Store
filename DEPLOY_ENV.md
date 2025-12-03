# Deployment Environment & Secrets

This file lists the environment variables required for deploying Swiftycart (backend + frontend), and provides short instructions for setting them locally and on hosting providers (Render / Vercel / Netlify).

## Backend variables (set in your server host: Render / Railway / Heroku)
- `MONGODB_URI` — MongoDB connection string (use MongoDB Atlas for production). Example: `mongodb+srv://user:pass@cluster0.mongodb.net/swiftcart?retryWrites=true&w=majority`
- `JWT_SECRET` — strong random secret for signing JWTs (do NOT commit to repo)
- `JWT_EXPIRE` — optional, e.g. `30d`
- `STRIPE_SECRET_KEY` — your Stripe secret key (sk_live_... for production)
- `STRIPE_WEBHOOK_SECRET` — webhook signing secret from Stripe when you create a webhook endpoint
- `FRONTEND_URL` — your frontend URL (e.g. `https://your-app.vercel.app`) — used for redirects/CORS

Port and NODE_ENV are typically set by the host. Your backend uses `process.env.PORT`.

## Frontend variables (set in Vercel / Netlify UI)
- `REACT_APP_API_URL` — full API base URL including `/api`, e.g. `https://your-backend.onrender.com/api`
- `REACT_APP_STRIPE_PUBLIC_KEY` — Stripe publishable key (pk_live_... in production)

Notes:
- Never commit secrets to the repo. Use environment variable UI in your hosting provider.
- For Stripe webhooks: create the webhook on the Stripe dashboard using your deployed backend URL, then copy the webhook secret into the host's env var `STRIPE_WEBHOOK_SECRET`.

## Local testing (PowerShell)
Set env vars for a local run (PowerShell example):
```powershell
$env:MONGODB_URI = "mongodb://localhost:27017/swiftcart"
$env:JWT_SECRET = "dev_jwt_secret"
$env:STRIPE_SECRET_KEY = "sk_test_xxx"
$env:FRONTEND_URL = "http://localhost:3000"
node backend/server.js
```

For the frontend, create a `.env` file at repo root with:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxx
```

## Quick checklist for deployment
1. Provision a MongoDB Atlas cluster and copy the connection string to `MONGODB_URI`.
2. Create Stripe keys and webhook; set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in backend environment.
3. Set `REACT_APP_API_URL` in Vercel/Netlify to point at the backend `https://<your-backend>/api`.
4. Deploy backend and frontend, then test checkout flow with Stripe test cards.
