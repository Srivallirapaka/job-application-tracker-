#!/bin/bash

# Job Application Tracker - Quick Start Script
# This script helps you get the project up and running quickly

echo "🚀 Job Application Tracker - Setup Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js installation
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Visit: https://nodejs.org/ to install"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version:${NC} $(node --version)"
echo -e "${GREEN}✅ npm version:${NC} $(npm --version)"
echo ""

# Check MongoDB
echo "🗄️  Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✅ MongoDB installed${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB not found in PATH${NC}"
    echo "If MongoDB Atlas is being used, this is fine."
fi
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend || exit 1

if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo "  Update it with your MongoDB URI and JWT_SECRET"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Backend dependencies already installed${NC}"
fi

cd .. || exit 1
echo ""

# Frontend setup
echo "⚛️  Setting up Frontend..."
cd frontend || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

cd .. || exit 1
echo ""

# Display next steps
echo "=========================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "📖 Next Steps:"
echo "1. Update backend/.env with your MongoDB URI"
echo "2. Start MongoDB service:"
echo "   - Windows: Services > MongoDB Server"
echo "   - Mac: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongod"
echo ""
echo "3. Open two terminals:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "4. Register a new account and start adding job applications!"
echo ""
echo "📚 Documentation:"
echo "- README.md - Full project documentation"
echo "- SETUP_INSTRUCTIONS.md - Detailed setup guide"
echo "- PROJECT_ROADMAP.md - Project phases and features"
echo ""
echo -e "${YELLOW}Happy job hunting! 🎉${NC}"
