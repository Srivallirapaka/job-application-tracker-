# Setup Instructions for Job Application Tracker

This guide will walk you through setting up the complete MERN stack application from scratch.

## ✅ Prerequisites

Ensure you have the following installed:
- Node.js (v14+): https://nodejs.org/
- npm (comes with Node.js)
- MongoDB: https://www.mongodb.com/try/download/community
- Git (optional): https://git-scm.com/

**Verify installation:**
```bash
node --version    # Should show v14.0.0 or higher
npm --version     # Should show 6.0.0 or higher
mongo --version   # Should show your MongoDB version
```

---

## 🔧 Step 1: Project Structure Setup

Your project is already created with this structure:
```
eadproject/
├── backend/          # Express.js server
├── frontend/         # React app
└── README.md
```

---

## 🗄️ Step 2: Database Setup

### Option A: Local MongoDB

**On Windows:**
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Run the installer and follow the default installation
3. MongoDB should start automatically as a Windows service
4. Verify it's running: Open Services.msc and look for "MongoDB Server"

**On Mac:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `backend/.env` with the connection string

---

## 📦 Step 3: Backend Setup

### 3.1 Navigate to Backend Directory
```bash
cd eadproject/backend
```

### 3.2 Install Dependencies
```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ORM)
- jsonwebtoken (JWT tokens)
- bcryptjs (password hashing)
- cors (cross-origin requests)
- dotenv (environment variables)
- nodemon (auto-restart on file changes)

### 3.3 Create Environment File
```bash
# Copy the template
cp .env.example .env

# Edit .env file with your settings
# MONGODB_URI=mongodb://localhost:27017/job-tracker
# JWT_SECRET=your_secret_key_change_this_in_production
# PORT=5000
# NODE_ENV=development
```

### 3.4 Test Backend
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

**Test the API:**
Open browser and go to: `http://localhost:5000/api/health`
You should see: `{"status":"Server is running"}`

**Important:** Keep this terminal open, don't close it.

---

## ⚛️ Step 4: Frontend Setup

### 4.1 Open a New Terminal

Keep the backend running in the first terminal, open a second terminal.

### 4.2 Navigate to Frontend Directory
```bash
cd eadproject/frontend
```

### 4.3 Install Dependencies
```bash
npm install
```

This will install:
- react (UI library)
- react-router-dom (routing)
- redux & redux-toolkit (state management)
- axios (HTTP client)
- react-beautiful-dnd (drag-and-drop)
- react-icons (icons)

**Note:** This may take 3-5 minutes to install.

### 4.4 Start Frontend Development Server
```bash
npm start
```

A browser window should automatically open to `http://localhost:3000`

If it doesn't open automatically, go to http://localhost:3000 in your browser.

---

## ✨ Step 5: First Time Setup

### 5.1 Create Account

1. You'll see the Login page
2. Click "Register here" to create a new account
3. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Register"

You'll be redirected to the Dashboard.

### 5.2 Add Job Applications

1. Click "+ Add Job Application"
2. Fill in the form:
   - Company Name: `Google`
   - Job Title: `Software Engineer`
   - Status: `Applied`
   - Priority: `High`
   - Location: `Mountain View, CA`
   - Tags: Add "Remote" and "Full-time"
   - Notes: Add some notes about your interest
3. Click "Save Application"

### 5.3 Test Kanban Board

1. Add 3-4 more applications with different statuses
2. Try dragging a card from "Applied" column to "Interview" column
3. The status should update automatically
4. Refresh the page to verify data is persisted

### 5.4 Test CRUD Operations

- **Create**: Add more applications
- **Read**: View all applications on the board
- **Update**: Click a card, edit details, save
- **Delete**: Click delete icon to remove an application

---

## 🧪 Step 6: Testing with Sample Data

### Add These Sample Jobs:

**Job 1: Google - Software Engineer**
- Status: Interview
- Priority: High
- Location: Mountain View, CA
- Tags: Remote, Big Tech
- Notes: Passed first interview, second round coming up

**Job 2: Startup Inc - Full Stack Developer**
- Status: Applied
- Priority: High
- Location: San Francisco, CA
- Tags: Startup, Remote
- Notes: Applied last week

**Job 3: FAANG Corp - Senior Engineer**
- Status: Offer
- Priority: Medium
- Location: New York, NY
- Tags: Full-time
- Notes: Got the offer! Negotiating salary

**Job 4: Old Company - Junior Dev**
- Status: Rejected
- Priority: Low
- Location: Remote
- Notes: Not a good fit for my career goals

---

## 🚀 Common Commands

### Backend
```bash
cd backend
npm run dev        # Start with auto-reload (development)
npm start          # Start without auto-reload
npm test           # Run tests
```

### Frontend
```bash
cd frontend
npm start          # Start development server
npm build          # Create production build
npm test           # Run tests
```

---

## 🔍 Troubleshooting

### Issue: MongoDB not connecting
**Solution:**
1. Verify MongoDB is running:
   - Windows: Check Services for "MongoDB Server"
   - Mac: `brew services list`
   - Linux: `sudo systemctl status mongod`
2. Check connection string in `.env`
3. Default should be: `mongodb://localhost:27017/job-tracker`

### Issue: Port 5000 already in use
**Solution:**
```bash
# Find process using port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000

# Kill the process or use different port in .env
PORT=5001
```

### Issue: Frontend can't connect to backend
**Solution:**
1. Verify backend is running: http://localhost:5000/api/health
2. Check proxy setting in `frontend/package.json`
3. Try clearing browser cache (Ctrl+Shift+Delete)

### Issue: npm install is very slow
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Use a different registry
npm config set registry https://registry.npmjs.org/

# Try installing again
npm install
```

### Issue: node_modules issues after installation
**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📚 File Structure Explained

### Backend Files

**models/User.js** - User schema with password hashing and authentication
**models/JobApplication.js** - Job application schema with all fields
**routes/auth.js** - Registration and login endpoints
**routes/jobs.js** - CRUD endpoints for job applications
**middleware/auth.js** - JWT verification middleware
**server.js** - Main Express server file

### Frontend Files

**pages/Login.js** - Login page component
**pages/Register.js** - Registration page component
**pages/Dashboard.js** - Main dashboard with Kanban board
**components/KanbanBoard.js** - Kanban board with drag-drop
**components/JobCard.js** - Individual job card component
**components/JobModal.js** - Form modal for adding/editing
**redux/authSlice.js** - Authentication state management
**redux/jobsSlice.js** - Jobs state management
**services/api.js** - API calls with Axios

---

## 🎓 Learning Resources

### MERN Stack Learning
- React: https://react.dev/
- Express: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Node.js: https://nodejs.org/docs/

### Technologies Used
- Redux: https://redux.js.org/
- Axios: https://axios-http.com/
- JWT: https://jwt.io/
- Drag & Drop: https://github.com/atlassian/react-beautiful-dnd

---

## 🚀 Next Steps

After setup is complete:

1. **Customize the Design:**
   - Modify colors in CSS files
   - Add your logo
   - Change fonts and styling

2. **Add More Features:**
   - Email notifications
   - Job search integration
   - Analytics dashboard
   - Dark mode

3. **Prepare for Deployment:**
   - Deploy backend to Heroku/Render
   - Deploy frontend to Vercel/Netlify
   - Use MongoDB Atlas for database

4. **Share Your Project:**
   - Create a GitHub repository
   - Share the link in your portfolio
   - Showcase on LinkedIn

---

## 📝 Notes

- Always keep backend running while using the frontend
- Tokens expire after 7 days, you'll need to login again
- Data is stored per user, so each account has separate job applications
- All passwords are hashed using bcrypt for security

---

## 💡 Tips for Success

1. **Start Simple:** Create an account, add a few jobs, practice the Kanban board
2. **Test Everything:** Try all CRUD operations before deployment
3. **Keep Backups:** If using local MongoDB, backup your data
4. **Use Different Passwords:** Use strong passwords in production
5. **Monitor Logs:** Check backend terminal for any errors

---

**You're all set! Enjoy tracking your job applications! 🎉**

For any issues, check the troubleshooting section or refer to the main README.md file.
