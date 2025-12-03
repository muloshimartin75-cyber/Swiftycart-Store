# Deploying Backend (Render) and Frontend (Vercel)

This guide walks through deploying the `backend/` Node app to Render and the React frontend to Vercel, including the required environment variables and Stripe webhook setup.

---

## 1) Prepare secrets (before creating services)

- Create a MongoDB Atlas cluster and note the connection string (use a production user with strong password).
- Create or obtain Stripe keys (Secret key `sk_live_...` and Publishable `pk_live_...`).
- Choose a strong `JWT_SECRET` (random string, 32+ chars).

## 2) Deploy backend to Render

1. Sign up or log in to Render (https://render.com).
2. Click "New" → "Web Service".
3. Connect your GitHub account and select the `Swiftycart-Store` repo.
4. In **Advanced** settings, set the **Root Directory** to `backend`.
5. Fill the fields:
   - **Name**: `swiftycart-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js` (or `npm start` if defined)
   - **Branch**: `main`
6. In the Render service settings, add environment variables (Settings → Environment):
   - `MONGODB_URI` = `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/swiftcart?retryWrites=true&w=majority`
   - `JWT_SECRET` = `<strong-random-secret>`
   - `JWT_EXPIRE` = `30d`
   - `STRIPE_SECRET_KEY` = `sk_live_...` (live key)
   - `STRIPE_WEBHOOK_SECRET` = `<leave blank for now; set after creating webhook>`
   - `FRONTEND_URL` = `https://your-frontend-url` (optional but recommended)
7. Deploy the service and note the service URL (e.g., `https://swiftycart-backend.onrender.com`).

### Stripe webhook registration

1. In Stripe Dashboard → Developers → Webhooks → Add endpoint.
2. Endpoint URL: `https://<your-backend>/api/checkout/webhook`.
3. Select events to listen for (e.g., `checkout.session.completed`) or choose "receive all events" for testing.
4. Create the webhook and copy the **Signing secret**.
5. Back in Render service settings, set `STRIPE_WEBHOOK_SECRET` to the webhook signing secret and redeploy (or restart) the service.

---

## 3) Deploy frontend to Vercel

1. Log in to Vercel (https://vercel.com) and click "New Project".
2. Import Git Repository → choose `Swiftycart-Store`.
3. Vercel will detect a Create React App. Configure:
   - **Framework Preset**: `Create React App`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `build`
4. Add Environment Variables (Project → Settings → Environment Variables):
   - `REACT_APP_API_URL` = `https://<your-backend>/api`
   - `REACT_APP_STRIPE_PUBLIC_KEY` = `pk_live_...` (live publishable key)
5. Deploy. Vercel will provide a frontend URL (e.g., `https://your-app.vercel.app`).

## 4) CORS and Final checks

- Ensure backend CORS allows the Vercel origin. In `backend/config/db.js` or wherever CORS is configured, set allowed origin to your Vercel URL (or use a wildcard only if you understand the security implications).
- Update `FRONTEND_URL` (backend env) to your Vercel URL if used for redirects.

## 5) Test production flow

1. Visit frontend URL, register a user, login, add a product to cart.
2. Start checkout; Stripe Checkout page should load. Use Stripe test cards for initial testing, then switch to live keys when ready.
3. Confirm webhook events are received in your backend logs (Render dashboard logs).

## 6) Troubleshooting tips

- If checkout fails: check `STRIPE_SECRET_KEY` and `REACT_APP_STRIPE_PUBLIC_KEY` match (test vs live).
- If webhook signature verification fails: ensure `STRIPE_WEBHOOK_SECRET` is the value you copied when creating the webhook (Stripe regenerates secrets if you recreate a webhook).
- Use Render and Vercel logs to inspect runtime errors.

---

If you want, I can now:

- create the Vercel project (I can only prepare files; you'll need to connect GitHub and add env vars in Vercel UI),
- or proceed to create a small script/instructions to set up Render via their API (you'd need an API key to perform the last step).
