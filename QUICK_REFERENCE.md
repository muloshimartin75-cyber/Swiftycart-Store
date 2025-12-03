# SwiftCart - Quick Reference

## 🚀 Local Development

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
npm start
```

**Access at:** http://localhost:3000

---

## 📦 Project Commands

### Frontend
```bash
npm install          # Install dependencies
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
```

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev         # Start with auto-reload
npm start           # Start production
npm run seed        # Populate database
```

---

## 🗄️ Database

### MongoDB Atlas Connection
```
mongodb+srv://username:password@cluster.mongodb.net/swiftcart
```

### Local MongoDB
```
mongodb://localhost:27017/swiftcart
```

### Seed Products
```bash
cd backend
npm run seed
```

---

## 🔐 Authentication

**Register/Login Flow:**
1. User registers with email & password
2. Password hashed with bcryptjs
3. JWT token generated
4. Token stored in localStorage (frontend)
5. Token sent in Authorization header for protected routes

**Test Account:**
- Email: `test@example.com`
- Password: `password123` (or any 6+ chars)

---

## 💳 Stripe Integration

### Test Cards
- **Visa:** `4242 4242 4242 4242`
- **Mastercard:** `5555 5555 5555 4444`
- **American Express:** `3782 822463 10005`
- **Expiry:** Any future date
- **CVC:** Any 3 digits

### Stripe Keys
- Get from: https://dashboard.stripe.com/apikeys
- Test mode: `pk_test_...` / `sk_test_...`
- Live mode: `pk_live_...` / `sk_live_...`

---

## 🌐 Deployment Checklist

- [ ] Push to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Render backend deployed
- [ ] Vercel frontend deployed
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Stripe webhook registered
- [ ] Products seeded
- [ ] Test payment successful

**Deploy Command:**
```bash
# Windows
deploy.bat

# Mac/Linux
bash deploy.sh
```

---

## 📁 File Structure

```
ecommerce-app/
├── src/
│   ├── components/       # UI components
│   ├── context/         # State management
│   ├── pages/           # Page components
│   ├── styles/          # CSS files
│   └── utils/           # API helper
├── backend/
│   ├── routes/          # API endpoints
│   ├── models/          # MongoDB schemas
│   ├── middleware/      # Auth middleware
│   └── scripts/         # Seed script
├── .env                 # Frontend config
├── .env.example         # Frontend template
├── vercel.json          # Vercel config
├── DEPLOYMENT.md        # Deployment guide
└── README.md            # Main documentation
```

---

## 🔧 Environment Variables

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

### Backend `.env`
```
MONGODB_URI=mongodb://localhost:27017/swiftcart
JWT_SECRET=super_secret_key_change_in_production
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:3000
```

---

## 🐛 Troubleshooting

### Backend not starting
```bash
# Check MongoDB is running
# Check port 5000 is free
# Check .env file exists
npm run dev
```

### Frontend not loading products
```bash
# Check backend is running
# Check REACT_APP_API_URL in .env
# Open DevTools > Network > check API calls
```

### Stripe payment fails
```bash
# Check Stripe keys are correct
# Use test card: 4242 4242 4242 4242
# Check webhook is registered
# Check backend logs on Render
```

### MongoDB connection error
```bash
# Check connection string format
# Verify username/password
# Check IP whitelist in MongoDB Atlas
# For local: ensure MongoDB service is running
```

---

## 📚 Useful Links

- [React Docs](https://react.dev)
- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Stripe Docs](https://stripe.com/docs)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## 💡 Tips

✅ Use `npm run dev` for backend to auto-reload on changes
✅ Check browser console (F12) for React errors
✅ Check terminal for backend API errors
✅ Use MongoDB Compass for database visualization
✅ Use Stripe Dashboard to test payments
✅ Set `NODE_ENV=development` for detailed error messages

---

## 📞 Support

- GitHub Issues: Report bugs
- DEPLOYMENT.md: Detailed setup guide
- Code comments: Inline documentation
- README.md: Full project overview

---

**Last Updated:** December 3, 2025
**Version:** 1.0.0
