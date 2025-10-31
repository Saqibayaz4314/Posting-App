# VibeShare - Social Posting App

A full-stack social posting application migrated from EJS to React frontend with Express.js backend.

## 🚀 Project Structure

```
Posting App/
├── backend/
│   ├── config/
│   │   └── multerconfig.js      # File upload configuration
│   ├── models/
│   │   ├── user.js              # User model
│   │   └── post.js              # Post model
│   ├── public/
│   │   └── images/uploads/      # Uploaded profile pictures
│   ├── index.js                 # Express API server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── RegisterSuccess.jsx
    │   │   ├── Profile.jsx
    │   │   ├── EditPost.jsx
    │   │   └── ProfileUpload.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## ✨ Features

- **User Authentication**: Register, Login, and Logout with JWT tokens
- **Profile Management**: Upload and update profile pictures
- **Post Creation**: Create, edit, and delete posts
- **Social Interaction**: Like/Unlike posts
- **Real-time UI**: React-based responsive interface
- **Secure API**: Protected routes with JWT authentication

## 🛠️ Technologies

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd "c:\Users\SAMEER\Desktop\Backend projects\Posting App\backend"
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB (if not running):
```bash
mongod
```

4. Start the backend server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The backend API will run on `http://localhost:3000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd "c:\Users\SAMEER\Desktop\Backend projects\Posting App\frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/check-auth` - Check authentication status

### User
- `GET /api/profile` - Get user profile with posts
- `POST /api/upload` - Upload profile picture

### Posts
- `POST /api/post` - Create new post
- `GET /api/post/:id` - Get post by ID
- `PUT /api/post/:id` - Update post
- `DELETE /api/post/:id` - Delete post
- `POST /api/like/:id` - Like/Unlike post

## 🎨 UI Pages

1. **Register** (`/`) - User registration page
2. **Login** (`/login`) - User login page
3. **Register Success** (`/registered`) - Success message after registration
4. **Profile** (`/profile`) - User dashboard with posts (Protected)
5. **Edit Post** (`/edit/:id`) - Edit existing post (Protected)
6. **Profile Upload** (`/profile/upload`) - Upload profile picture (Protected)

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend generates JWT token and sets it as HTTP-only cookie
3. Frontend stores user data in AuthContext
4. Protected routes check authentication before rendering
5. API requests include credentials (cookies) automatically

## 🌟 Key Features Implemented

### Backend (API)
- Converted all EJS routes to JSON API endpoints
- Added CORS support for React frontend
- Implemented proper error handling
- JWT token validation middleware
- HTTP-only cookies for security

### Frontend (React)
- Context API for global authentication state
- Protected route wrapper component
- Axios interceptors for API calls
- React Router for navigation
- Form validation and error handling
- Responsive design with Tailwind CSS

## 📝 Environment Variables (Optional)

Create a `.env` file in the backend root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/miniproject
JWT_SECRET=secret
```

## 🚦 Running Both Servers

You need to run both backend and frontend servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd "c:\Users\username\Desktop\Posting App\backend"
npm start
```

**Terminal 2 (Frontend):**
```bash
cd "c:\Users\username\Desktop\\Posting App\frontend"
npm run dev
```

**OR: Use the startup script (Easy!):**
Just double-click `start-app.bat` in the root folder!

Then open your browser and navigate to `http://localhost:5173`

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:
- Backend: Change PORT in `.env` or `index.js`
- Frontend: Change port in `vite.config.js`

### CORS Errors
Ensure the backend CORS configuration includes the frontend URL:
```javascript
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `models/user.js` and `models/post.js`

### Cookie Not Being Set
- Ensure `withCredentials: true` in Axios config
- Check CORS credentials setting
- Verify cookie settings in backend

## 📄 License

ISC

## 👨‍💻 Author

Created as part of a backend-to-fullstack migration project.

---

## 🎯 Future Enhancements

- Add post comments
- Implement user following system
- Add image uploads for posts
- Real-time notifications
- User search functionality
- Post pagination
- Dark/Light theme toggle
