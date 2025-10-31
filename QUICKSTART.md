# Quick Start Guide

## Step 1: Start MongoDB
Ensure MongoDB is running on your system:
```bash
mongod
```

## Step 2: Start Backend Server
Open Terminal 1:
```bash
cd "c:\Users\SAMEER\Desktop\Backend projects\Posting App\backend"
npm start
```

Backend will run on: http://localhost:3000

## Step 3: Start Frontend Server
Open Terminal 2:
```bash
cd "c:\Users\SAMEER\Desktop\Backend projects\Posting App\frontend"
npm run dev
```

Frontend will run on: http://localhost:5173

## OR: Use the Startup Script
Just double-click `start-app.bat` in the root folder!

## Step 4: Open Application
Navigate to http://localhost:5173 in your browser

## Default Flow:
1. Register a new account at `/` (home page)
2. You'll be redirected to `/registered` success page
3. Click "Go To Login" or navigate to `/login`
4. Login with your credentials
5. You'll be redirected to `/profile` - your dashboard
6. Create posts, like posts, edit posts, and upload profile picture!

## Available Routes:
- `/` - Register
- `/login` - Login
- `/registered` - Registration success
- `/profile` - User dashboard (protected)
- `/profile/upload` - Upload profile picture (protected)
- `/edit/:id` - Edit post (protected)

## Test Users:
Create your own users through the registration form!

## Troubleshooting:
If you encounter any issues:
1. Make sure MongoDB is running
2. Check both servers are running without errors
3. Clear browser cookies if authentication issues occur
4. Check the README.md for detailed troubleshooting
