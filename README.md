# Job Application Tracker

A comprehensive MERN stack application for tracking job applications with a Kanban board visualization. Manage your job search with features like drag-and-drop application tracking, priority levels, tags, and authentication.

## 🚀 Features

### Core Features
- **User Authentication**: JWT-based secure authentication with password hashing
- **Job Application CRUD**: Create, read, update, and delete job applications
- **Kanban Board**: Visualize applications across different stages (Applied, Interview, Offer, Rejected)
- **Drag and Drop**: Move applications between stages easily
- **Multi-user Support**: Each user has their own private job board

### Advanced Features
- **Priority Levels**: Mark applications as Low, Medium, or High priority
- **Tags & Labels**: Add custom tags for better organization (Remote, Internship, Full-time, etc.)
- **Job Details**: 
  - Company name and job title
  - Location and job type
  - Salary information
  - Interview dates
  - Detailed notes
  - Job URL
- **Statistics Dashboard**: View counts by status
- **Date Tracking**: Track when applications were submitted, interview dates, and offer dates
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js**: REST API server
- **MongoDB**: Database with Mongoose ORM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **express-validator**: Input validation

### Frontend
- **React 18**: UI framework
- **Redux Toolkit**: State management
- **Axios**: HTTP client
- **react-beautiful-dnd**: Drag-and-drop functionality
- **react-router-dom**: Client-side routing
- **CSS3**: Styling with modern CSS

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (locally or MongoDB Atlas account)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd eadproject
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/job-tracker
# JWT_SECRET=your_secret_key_here
# PORT=5000

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will open at `http://localhost:3000`

### 4. MongoDB Setup (if using local MongoDB)

```bash
# On Windows, MongoDB is typically installed as a service
# Make sure MongoDB service is running:
# Services > MongoDB Server (running)

# Or start MongoDB manually
mongod
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Job Applications
- `GET /api/jobs` - Get all jobs for current user
  - Query params: `status`, `sortBy`
- `POST /api/jobs` - Create new job application
- `GET /api/jobs/:id` - Get single job application
- `PUT /api/jobs/:id` - Update job application
- `DELETE /api/jobs/:id` - Delete job application
- `GET /api/jobs/stats/summary` - Get statistics

## 🔐 Authentication

The application uses JWT-based authentication:

1. **Register**: Create a new account with username, email, and password
2. **Login**: Receive JWT token valid for 7 days
3. **Protected Routes**: Include token in Authorization header: `Bearer <token>`
4. **Token Storage**: Stored in localStorage for persistence

## 📊 Project Structure

```
eadproject/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── JobApplication.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── jobs.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── KanbanBoard.js
│   │   │   ├── JobCard.js
│   │   │   └── JobModal.js
│   │   ├── redux/
│   │   │   ├── authSlice.js
│   │   │   ├── jobsSlice.js
│   │   │   └── store.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── .gitignore
│   └── public/
└── README.md
```

## 🎯 Usage Guide

### Getting Started
1. Register a new account
2. Log in with your credentials
3. Click "Add Job Application" to start tracking

### Adding Applications
- Fill in the job details
- Set priority level
- Add tags for organization
- Include interview dates if scheduled
- Add notes about the position

### Managing Applications
- **Drag & Drop**: Move cards between stages
- **Edit**: Click the edit icon on any card
- **Delete**: Click the delete icon to remove
- **View Details**: Click on a card to see full details

### Staying Organized
- Use tags to categorize (Remote, Startup, etc.)
- Set priorities to focus on important opportunities
- Add interview dates and notes for follow-up
- Monitor progress in each stage

## 🧪 Testing the Application

### Test Account
- Email: `test@example.com`
- Username: `testuser`
- Password: `password123`

Or create your own account during registration.

### Sample Workflow
1. Register/Login
2. Add 3-4 job applications at different stages
3. Test drag-and-drop between columns
4. Edit an application (change status, add notes)
5. Delete an application
6. Log out and log back in to verify data persistence

## 🚀 Deployment

### Deploy Backend (Heroku/Render)
```bash
cd backend
# Create Procfile
echo "web: npm start" > Procfile

# Deploy to Heroku
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the build folder to Vercel or Netlify
```

## 🔄 Future Enhancements

- [ ] Email notifications for interview reminders
- [ ] LinkedIn job posting integration
- [ ] Google Calendar sync
- [ ] Resume/Cover letter file uploads (GridFS)
- [ ] Analytics and insights dashboard
- [ ] Dark mode theme
- [ ] Shared boards for team tracking
- [ ] Interview question banks
- [ ] Salary comparison tools

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
# Windows: Services > MongoDB
# Mac: brew services list
# Linux: sudo systemctl status mongod
```

### Port Already in Use
```bash
# Change PORT in .env or kill the process using the port
# On Windows: netstat -ano | findstr :5000
# On Mac/Linux: lsof -i :5000
```

### CORS Issues
- Ensure backend is running on correct port
- Check that frontend proxy is configured correctly
- Verify API URLs in frontend services

## 📞 Support & Contribution

Feel free to fork, modify, and improve this project. For issues or feature requests, create an issue in the repository.

## 📄 License

This project is open source and available under the MIT License.

---

**Happy job hunting! 🎉**
