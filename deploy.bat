@echo off
REM SwiftCart Quick Deployment Script for Windows

echo.
echo 🚀 SwiftCart Deployment Prep
echo ==============================

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git not found. Please install Git first.
    exit /b 1
)

echo ✅ Git found

REM Initialize Git if needed
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
)

REM Create .gitignore if it doesn't exist
if not exist ".gitignore" (
    echo 📝 Creating .gitignore
    (
        echo node_modules/
        echo .env
        echo .env.local
        echo .DS_Store
        echo dist/
        echo build/
        echo .next
    ) > .gitignore
)

REM Check if .env files exist
if not exist ".env" (
    echo ⚠️  Frontend .env not found. Creating from .env.example...
    copy .env.example .env
)

if not exist "backend\.env" (
    echo ⚠️  Backend .env not found. Creating from .env.example...
    copy backend\.env.example backend\.env
)

echo.
echo 📋 Next steps:
echo 1. Update .env files with your production values:
echo    - REACT_APP_API_URL (your Render backend URL)
echo    - STRIPE_PUBLIC_KEY (Stripe live key)
echo.
echo 2. Update backend\.env with:
echo    - MONGODB_URI (MongoDB Atlas connection string)
echo    - STRIPE_SECRET_KEY (Stripe live secret)
echo    - JWT_SECRET (strong random string)
echo    - FRONTEND_URL (your Vercel URL)
echo.
echo 3. Push to GitHub:
echo    git add .
echo    git commit -m "Production deployment"
echo    git remote add origin ^<your-repo-url^>
echo    git push -u origin main
echo.
echo 4. Deploy to Vercel (frontend) and Render (backend)
echo    Follow DEPLOYMENT.md for detailed steps
echo.
echo ✅ Ready for deployment!
echo.
pause
