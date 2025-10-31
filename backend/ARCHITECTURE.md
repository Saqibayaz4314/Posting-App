# Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                    http://localhost:5173                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ React App (Vite)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      FRONTEND (React)                            │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐           │
│  │   Pages     │  │ Components  │  │   Context    │           │
│  │             │  │             │  │              │           │
│  │ • Register  │  │ • Protected │  │ • AuthContext│           │
│  │ • Login     │  │   Route     │  │              │           │
│  │ • Profile   │  │             │  │ (JWT State)  │           │
│  │ • Edit      │  │             │  │              │           │
│  │ • Upload    │  │             │  │              │           │
│  └─────────────┘  └─────────────┘  └──────────────┘           │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │           Services (API Layer)                   │          │
│  │  • Axios HTTP Client                             │          │
│  │  • authAPI, userAPI, postAPI                     │          │
│  │  • Base URL: http://localhost:3000/api           │          │
│  └──────────────────────────────────────────────────┘          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests (JSON)
                             │ with Cookies (JWT)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND API (Express)                         │
│                   http://localhost:3000                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              API Endpoints (/api/*)                     │   │
│  │                                                          │   │
│  │  Authentication:                                         │   │
│  │  • POST /api/register   - Create account                │   │
│  │  • POST /api/login      - User login                    │   │
│  │  • POST /api/logout     - User logout                   │   │
│  │  • GET  /api/check-auth - Verify token                  │   │
│  │                                                          │   │
│  │  User:                                                   │   │
│  │  • GET  /api/profile    - Get user + posts              │   │
│  │  • POST /api/upload     - Upload profile pic            │   │
│  │                                                          │   │
│  │  Posts:                                                  │   │
│  │  • POST   /api/post     - Create post                   │   │
│  │  • GET    /api/post/:id - Get post                      │   │
│  │  • PUT    /api/post/:id - Update post                   │   │
│  │  • DELETE /api/post/:id - Delete post                   │   │
│  │  • POST   /api/like/:id - Like/unlike                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Middleware                                  │   │
│  │  • CORS (allow React app)                               │   │
│  │  • Cookie Parser                                         │   │
│  │  • JSON Parser                                           │   │
│  │  • isLoggedIn (JWT verify)                              │   │
│  │  • Multer (file upload)                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Models (Mongoose)                           │   │
│  │  • User Model                                            │   │
│  │  • Post Model                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Mongoose ODM
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      MongoDB Database                            │
│                mongodb://localhost:27017/miniproject             │
│                                                                  │
│  ┌──────────────────┐          ┌──────────────────┐            │
│  │  users collection│          │  posts collection│            │
│  │                  │          │                  │            │
│  │  • _id           │          │  • _id           │            │
│  │  • username      │          │  • user (ref)    │            │
│  │  • email         │          │  • content       │            │
│  │  • password      │          │  • date          │            │
│  │  • name          │          │  • likes [refs]  │            │
│  │  • age           │          │                  │            │
│  │  • profilepic    │          │                  │            │
│  │  • posts [refs]  │          │                  │            │
│  └──────────────────┘          └──────────────────┘            │
└─────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                         DATA FLOW EXAMPLE
═══════════════════════════════════════════════════════════════════

User clicks "Create Post"
        │
        ▼
Profile.jsx collects content
        │
        ▼
postAPI.createPost(content) called
        │
        ▼
Axios POST to http://localhost:3000/api/post
  Headers: { Content-Type: 'application/json' }
  Credentials: true (includes JWT cookie)
  Body: { content: "Hello World" }
        │
        ▼
Express receives request at POST /api/post
        │
        ▼
isLoggedIn middleware checks JWT token
        │
        ▼
Token valid → req.user = { email, userid }
        │
        ▼
Find user in MongoDB
        │
        ▼
Create new post document
        │
        ▼
Add post ID to user's posts array
        │
        ▼
Save both documents
        │
        ▼
Return JSON: { success: true, post: {...} }
        │
        ▼
Axios receives response
        │
        ▼
Profile.jsx updates state
        │
        ▼
React re-renders with new post
        │
        ▼
User sees new post immediately!


═══════════════════════════════════════════════════════════════════
                      AUTHENTICATION FLOW
═══════════════════════════════════════════════════════════════════

1. User submits login form
   └→ Login.jsx

2. Axios POST /api/login
   └→ { email, password }

3. Backend validates credentials
   └→ bcrypt.compare(password, hashedPassword)

4. Generate JWT token
   └→ jwt.sign({ email, userid }, "secret")

5. Set HTTP-only cookie
   └→ res.cookie("token", token, { httpOnly: true })

6. Return user data
   └→ res.json({ success: true, user: {...} })

7. Frontend updates AuthContext
   └→ setUser(userData)

8. Subsequent requests include cookie automatically
   └→ withCredentials: true in Axios

9. isLoggedIn middleware verifies token
   └→ jwt.verify(token, "secret")

10. Grant access to protected endpoints
    └→ req.user = decoded data


═══════════════════════════════════════════════════════════════════
                       FOLDER STRUCTURE
═══════════════════════════════════════════════════════════════════

Posting App/
│
├── Backend Files (Root)
│   ├── index.js              ← Express API Server
│   ├── package.json          ← Backend dependencies
│   ├── config/
│   │   └── multerconfig.js   ← File upload config
│   ├── models/
│   │   ├── user.js           ← User schema
│   │   └── post.js           ← Post schema
│   └── public/
│       └── images/uploads/   ← Profile pictures
│
└── frontend/                 ← React App
    ├── package.json          ← Frontend dependencies
    ├── vite.config.js        ← Vite config
    ├── index.html            ← Entry HTML
    └── src/
        ├── main.jsx          ← React entry point
        ├── App.jsx           ← Router setup
        ├── index.css         ← Global styles
        ├── components/
        │   └── ProtectedRoute.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Register.jsx
        │   ├── Login.jsx
        │   ├── RegisterSuccess.jsx
        │   ├── Profile.jsx
        │   ├── EditPost.jsx
        │   └── ProfileUpload.jsx
        └── services/
            └── api.js        ← Axios setup


═══════════════════════════════════════════════════════════════════
                       TECH STACK SUMMARY
═══════════════════════════════════════════════════════════════════

Frontend:
  React 18.3.1        → UI Library
  Vite 5.4.1          → Build Tool
  React Router 6.26   → Navigation
  Axios 1.7.2         → HTTP Client
  Tailwind CSS        → Styling

Backend:
  Express 5.1.0       → Web Framework
  Mongoose 8.18.2     → MongoDB ODM
  JWT 9.0.2           → Authentication
  Bcrypt 6.0.0        → Password Hashing
  Multer 2.0.2        → File Uploads
  CORS 2.8.5          → Cross-Origin

Database:
  MongoDB             → NoSQL Database
  
```
