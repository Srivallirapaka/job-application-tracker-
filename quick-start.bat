@echo off
REM Job Application Tracker - Quick Start Script for Windows

echo.
echo 🚀 Job Application Tracker - Setup Script
echo ==========================================
echo.

REM Check Node.js installation
echo 📋 Checking prerequisites...

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo Visit: https://nodejs.org/ to install
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%
echo.

REM Check MongoDB
echo 🗄️  Checking MongoDB...
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB not found in PATH
    echo If using MongoDB Atlas, this is fine.
) else (
    echo ✅ MongoDB installed
)
echo.

REM Backend setup
echo 📦 Setting up Backend...
cd backend

if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created
    echo Update it with your MongoDB URI and JWT_SECRET
) else (
    echo ✅ .env file already exists
)

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    echo ✅ Backend dependencies installed
) else (
    echo ✅ Backend dependencies already installed
)

cd ..
echo.

REM Frontend setup
echo ⚛️  Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)

cd ..
echo.

REM Display next steps
echo ==========================================
echo ✅ Setup Complete!
echo ==========================================
echo.
echo 📖 Next Steps:
echo 1. Update backend\.env with your MongoDB URI
echo 2. Start MongoDB service:
echo    - Windows: Services ^> MongoDB Server
echo    - Check Services.msc and ensure MongoDB is running
echo.
echo 3. Open TWO Command Prompts:
echo.
echo    Command Prompt 1 (Backend):
echo    cd backend
echo    npm run dev
echo.
echo    Command Prompt 2 (Frontend):
echo    cd frontend
echo    npm start
echo.
echo 4. Register a new account and start adding job applications!
echo.
echo 📚 Documentation:
echo - README.md - Full project documentation
echo - SETUP_INSTRUCTIONS.md - Detailed setup guide
echo - PROJECT_ROADMAP.md - Project phases and features
echo.
echo Happy job hunting! 🎉
echo.
pause
