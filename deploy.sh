#!/bin/bash

# SwiftCart Quick Deployment Script
# This script prepares your app for deployment

echo "🚀 SwiftCart Deployment Prep"
echo "=============================="

# Check Git
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git first."
    exit 1
fi

echo "✅ Git found"

# Initialize Git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "main" > .gitignore
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << EOF
node_modules/
.env
.env.local
.DS_Store
dist/
build/
.next
EOF
    echo "📝 Created .gitignore"
fi

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "⚠️  Frontend .env not found. Creating from .env.example..."
    cp .env.example .env
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env not found. Creating from .env.example..."
    cp backend/.env.example backend/.env
fi

echo ""
echo "📋 Next steps:"
echo "1. Update .env files with your production values:"
echo "   - REACT_APP_API_URL (your Render backend URL)"
echo "   - STRIPE_PUBLIC_KEY (Stripe live key)"
echo ""
echo "2. Update backend/.env with:"
echo "   - MONGODB_URI (MongoDB Atlas connection string)"
echo "   - STRIPE_SECRET_KEY (Stripe live secret)"
echo "   - JWT_SECRET (strong random string)"
echo "   - FRONTEND_URL (your Vercel URL)"
echo ""
echo "3. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Production deployment'"
echo "   git remote add origin <your-repo-url>"
echo "   git push -u origin main"
echo ""
echo "4. Deploy to Vercel (frontend) and Render (backend)"
echo "   Follow DEPLOYMENT.md for detailed steps"
echo ""
echo "✅ Ready for deployment!"
