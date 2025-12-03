# SwiftCart Deployment Guide

This guide covers deploying your ecommerce app to production using **Vercel** (frontend) and **Render** (backend).

## Prerequisites

1. GitHub account with your repo pushed
2. Vercel account (free at vercel.com)
3. Render account (free at render.com)
4. MongoDB Atlas account (free tier at mongodb.com/cloud/atlas)
5. Stripe account for payments (free at stripe.com)

---

## Part 1: MongoDB Atlas Setup

### 1. Create a Free MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up and create a new organization
3. Create a free shared cluster (AWS, any region)
4. Create a database user:
   - Go to Database Access
   - Add a user with a strong password
5. Get connection string:
   - Go to Clusters > Connect
   - Choose "Drivers"
   - Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/swiftcart`

**Save this connection string!**

---

## Part 2: Backend Deployment (Render)

### 1. Push Backend to GitHub

```bash
# In your backend folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-app-backend.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Render

1. Go to [Render.com](https://render.com) and sign up
2. Click **New +** > **Web Service**
3. Connect your GitHub repository (backend folder)
4. Fill in deployment settings:
   - **Name:** `ecommerce-app-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run dev` (or `node server.js`)
   - **Region:** Choose closest to you
   - **Plan:** Free tier

### 3. Add Environment Variables in Render

In the Render dashboard, go to **Environment** and add:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swiftcart
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=sk_live_your_stripe_live_key
STRIPE_PUBLIC_KEY=pk_live_your_stripe_live_key
STRIPE_WEBHOOK_SECRET=whsec_live_your_webhook_secret
FRONTEND_URL=https://your-vercel-app.vercel.app
```

4. Click **Deploy**

**Your backend URL will be:** `https://ecommerce-app-backend.onrender.com`

---

## Part 3: Frontend Deployment (Vercel)

### 1. Push Frontend to GitHub

```bash
# In your frontend root folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-app-frontend.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New** > **Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** React
   - **Root Directory:** `.` (or `./` if in subfolder)

### 3. Add Environment Variables in Vercel

In **Settings** > **Environment Variables**, add:

```
REACT_APP_API_URL=https://ecommerce-app-backend.onrender.com
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_your_stripe_live_key
```

4. Click **Deploy**

**Your frontend URL will be:** `https://your-app.vercel.app`

---

## Part 4: Update Backend CORS

Update `backend/server.js` to allow your Vercel frontend:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Then redeploy on Render.

---

## Part 5: Stripe Production Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Live Mode** (top toggle)
3. Get your **live keys** from API Keys
4. Update both Render and Vercel environment variables with live keys
5. Add Stripe webhook endpoint:
   - Go to **Webhooks** > **Add endpoint**
   - Endpoint URL: `https://ecommerce-app-backend.onrender.com/api/checkout/webhook`
   - Events: `checkout.session.completed`
   - Copy signing secret and update `STRIPE_WEBHOOK_SECRET`

---

## Part 6: Test Production Deployment

1. Visit your Vercel frontend URL
2. Create an account and log in
3. Add products to cart
4. Go to checkout
5. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
6. Complete payment and verify order in MongoDB

---

## Troubleshooting

### "Cannot GET /" on Vercel
- Check `vercel.json` is in root folder
- Ensure build command is correct

### "API not responding"
- Check Render backend is running (check logs)
- Verify `FRONTEND_URL` in Render matches your Vercel URL
- Check CORS settings in `backend/server.js`

### "Products not showing"
- Verify MongoDB connection string is correct
- Run seed script: `npm run seed` after updating `MONGODB_URI`

### "Payment fails"
- Check Stripe keys are correct (test vs live)
- Verify webhook endpoint is registered in Stripe
- Check backend logs on Render

---

## Production Checklist

- [ ] MongoDB Atlas cluster created with backup enabled
- [ ] Backend deployed to Render with all env vars set
- [ ] Frontend deployed to Vercel with correct API URL
- [ ] CORS configured properly
- [ ] Stripe live keys configured
- [ ] Stripe webhook registered
- [ ] Database seeded with products
- [ ] Test payment processed successfully
- [ ] Email notifications working (optional)

---

## Local Development vs Production

### Local Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm start
```

### Production Monitoring

- **Render:** Check logs and metrics in dashboard
- **Vercel:** Check Function logs and performance analytics
- **MongoDB Atlas:** Monitor connection pool and performance

---

## Scaling Tips

- **Add caching:** Use Cloudflare for frontend CDN
- **Optimize images:** Use Vercel Image Optimization
- **Monitor costs:** Set up billing alerts on all services
- **Upgrade database:** Move from free MongoDB tier when needed

---

## Support

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Stripe Docs: https://stripe.com/docs

