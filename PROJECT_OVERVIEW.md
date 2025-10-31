# VibeShare - Project Overview

## 🎯 What This Project Does

VibeShare is a social posting application where users can:
- Create an account and login
- Post their thoughts and ideas
- Like/unlike posts from themselves
- Edit their posts
- Upload a profile picture
- View their dashboard with all their posts

## 🏗️ Architecture

### Backend (Express.js API)
- **Location**: Root directory
- **Port**: 3000
- **Database**: MongoDB (localhost:27017)
- **Key Files**:
  - `index.js` - Main API server with all endpoints
  - `models/user.js` - User database schema
  - `models/post.js` - Post database schema
  - `config/multerconfig.js` - File upload configuration

### Frontend (React + Vite)
- **Location**: `frontend/` directory
- **Port**: 5173
- **Key Folders**:
  - `src/pages/` - All page components
  - `src/components/` - Reusable components
  - `src/context/` - Authentication state management
  - `src/services/` - API communication layer

## 🔄 Data Flow

```
User Action (React)
    ↓
API Request (Axios)
    ↓
Express Endpoint
    ↓
MongoDB Query (Mongoose)
    ↓
JSON Response
    ↓
Update UI (React State)
```

## 🔐 Authentication Flow

```
Register/Login
    ↓
Server generates JWT token
    ↓
Token stored in HTTP-only cookie
    ↓
Every API request includes cookie
    ↓
Server validates token
    ↓
Grant/Deny access
```

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String,
  name: String,
  email: String,
  password: String (hashed),
  age: Number,
  profilepic: String (filename),
  posts: [PostId]
}
```

### Post Collection
```javascript
{
  _id: ObjectId,
  user: UserId (ref),
  content: String,
  date: Date,
  likes: [UserId]
}
```

## 🎨 Pages

1. **Register** (`/`) - Create new account
2. **Login** (`/login`) - User authentication
3. **Register Success** (`/registered`) - Confirmation page
4. **Profile** (`/profile`) - Main dashboard (Protected)
5. **Edit Post** (`/edit/:id`) - Modify existing post (Protected)
6. **Profile Upload** (`/profile/upload`) - Change profile picture (Protected)

## 🔧 Technology Stack

### Backend
- Express.js 5.1.0
- MongoDB + Mongoose 8.18.2
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- CORS for cross-origin requests

### Frontend
- React 18.3.1
- Vite 5.4.1 (Build tool)
- React Router 6.26.0 (Navigation)
- Axios 1.7.2 (HTTP client)
- Tailwind CSS (Styling via CDN)

## 📂 File Structure

```
Posting App/
│
├── config/
│   └── multerconfig.js          # File upload setup
│
├── models/
│   ├── user.js                  # User schema
│   └── post.js                  # Post schema
│
├── public/
│   └── images/uploads/          # Profile pictures
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── RegisterSuccess.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── EditPost.jsx
│   │   │   └── ProfileUpload.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── views/                       # Old EJS templates (not used)
├── index.js                     # Main backend server
├── package.json                 # Backend dependencies
├── README.md                    # Full documentation
├── QUICKSTART.md               # Quick start guide
├── MIGRATION.md                # Migration details
├── PROJECT_OVERVIEW.md         # This file
└── start-app.bat               # Windows startup script
```

## 🚀 Quick Commands

### Install Dependencies
```powershell
# Backend
cd "c:\Users\SAMEER\Desktop\Backend projects\Posting App"
npm install

# Frontend
cd "c:\Users\SAMEER\Desktop\Backend projects\Posting App\frontend"
npm install
```

### Start Servers
```powershell
# Method 1: Double-click start-app.bat

# Method 2: Manual
# Terminal 1
npm start

# Terminal 2
cd frontend
npm run dev
```

### Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

## 🔍 Key Features Implementation

### User Registration
- Form validation
- Password hashing with bcrypt
- Automatic login after registration
- JWT token generation

### User Login
- Credential verification
- JWT token creation
- Cookie-based session
- Redirect to profile on success

### Profile Dashboard
- Display user information
- Show all user posts (newest first)
- Create new posts
- Like/unlike functionality
- Edit and delete options

### Post Management
- Create posts with validation
- Edit existing posts
- Delete posts
- Like/unlike posts
- Real-time updates

### Profile Picture Upload
- File upload with Multer
- Preview before upload
- Store in public/images/uploads/
- Update user profile

## 🛡️ Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication
- HTTP-only cookies (prevents XSS)
- Protected API routes
- CORS configuration
- Input validation
- User authorization checks

## 📱 Responsive Design

All pages are responsive using Tailwind CSS:
- Mobile-first approach
- Flexible layouts
- Consistent dark theme (zinc colors)
- Smooth transitions and hover effects

## 🧪 Testing Guide

1. **Registration Flow**
   - Go to http://localhost:5173
   - Fill registration form
   - Check success page
   - Verify redirect to login

2. **Login Flow**
   - Enter credentials
   - Check profile page loads
   - Verify user data displays

3. **Post Creation**
   - Type content in textarea
   - Click "Create Post"
   - Verify post appears in list

4. **Like Functionality**
   - Click like button
   - Check counter updates
   - Click again to unlike

5. **Edit Post**
   - Click edit button
   - Modify content
   - Save changes
   - Verify updates

6. **Profile Upload**
   - Go to upload page
   - Select image file
   - Upload and check profile pic updates

7. **Logout**
   - Click logout button
   - Verify redirect to login
   - Check protected routes are blocked

## 🐛 Common Issues

### MongoDB Connection Error
- Solution: Start MongoDB with `mongod` command

### Port Already in Use
- Solution: Kill process or change port in config

### CORS Error
- Solution: Check backend CORS settings match frontend URL

### Cookie Not Set
- Solution: Verify `withCredentials: true` in API calls

### Profile Picture Not Loading
- Solution: Check file exists in `public/images/uploads/`

## 📈 Performance Considerations

- JWT tokens reduce database queries
- Context API prevents prop drilling
- React Router provides client-side routing
- Vite offers fast hot module replacement
- Multer handles file uploads efficiently

## 🔮 Future Enhancements

- [ ] Add post comments
- [ ] Implement user following system
- [ ] Add image uploads for posts
- [ ] Real-time notifications with WebSockets
- [ ] User search functionality
- [ ] Post pagination
- [ ] Dark/Light theme toggle
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile pages
- [ ] Post sharing
- [ ] Hashtags and mentions

## 📚 Resources

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Project Status**: ✅ Complete and Ready to Use
**Version**: 1.0.0
**Last Updated**: October 31, 2025
