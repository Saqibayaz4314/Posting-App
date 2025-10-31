const express = require('express')
const app = express()
const userModel = require("./models/user")
const postModel = require("./models/post")
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const path = require('path')
const multerconfig = require('./config/multerconfig')
const upload = require('./config/multerconfig')
const cors = require('cors')

// CORS configuration for React frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Vite ports
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

// API Routes

// Upload profile picture
app.post('/api/upload', isLoggedIn, upload.single("image"), async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.user.email})
        user.profilepic = req.file.filename;
        await user.save()
        res.json({ success: true, message: 'Profile picture updated', profilepic: user.profilepic })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Get user profile
app.get('/api/profile', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.user.email}).populate("posts");
        res.json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Like/Unlike a post
app.post('/api/like/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOne({_id: req.params.id}).populate("user");
        
        if(!post) {
            return res.status(404).json({ success: false, message: 'Post not found' })
        }

        const userIndex = post.likes.indexOf(req.user.userid)
        if(userIndex === -1){
            post.likes.push(req.user.userid)
        } else {
            post.likes.splice(userIndex, 1)
        }

        await post.save();
        res.json({ success: true, likes: post.likes.length, isLiked: userIndex === -1 })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Get post by ID
app.get('/api/post/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOne({_id: req.params.id}).populate("user");
        if(!post) {
            return res.status(404).json({ success: false, message: 'Post not found' })
        }
        res.json({ success: true, post })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Update post
app.put('/api/post/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOneAndUpdate(
            {_id: req.params.id, user: req.user.userid},
            {content: req.body.content},
            {new: true}
        )
        if(!post) {
            return res.status(404).json({ success: false, message: 'Post not found or unauthorized' })
        }
        res.json({ success: true, post })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Delete post
app.delete('/api/post/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOneAndDelete({_id: req.params.id, user: req.user.userid})
        if(!post) {
            return res.status(404).json({ success: false, message: 'Post not found or unauthorized' })
        }
        // Remove post from user's posts array
        await userModel.findByIdAndUpdate(req.user.userid, {
            $pull: { posts: req.params.id }
        })
        res.json({ success: true, message: 'Post deleted' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})


// Create post
app.post('/api/post', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.user.email})
        let {content} = req.body;
        
        if(!content || content.trim() === '') {
            return res.status(400).json({ success: false, message: 'Content is required' })
        }
        
        let post = await postModel.create({
            user: user._id,
            content
        });
        user.posts.push(post._id);
        await user.save();
        
        res.json({ success: true, post })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Register
app.post('/api/register', async (req, res) => {
    try {
        let {email, password, username, name, age} = req.body;
        
        let existingUser = await userModel.findOne({email})
        if(existingUser) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) {
                    return res.status(500).json({ success: false, message: err.message })
                }
                
                let user = await userModel.create({
                    username,
                    email,
                    age,
                    name,
                    password: hash
                });
                
                let token = jwt.sign({email: email, userid: user._id}, "secret");
                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: 'lax'
                })
                res.json({ 
                    success: true, 
                    message: 'User registered successfully',
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        name: user.name
                    }
                })
            })
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Login
app.post('/api/login', async (req, res) => {
    try {
        let {email, password} = req.body;
        
        let user = await userModel.findOne({email})
        if(!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        
        bcrypt.compare(password, user.password, function(err, result){
            if(err) {
                return res.status(500).json({ success: false, message: err.message })
            }
            
            if(result){
                let token = jwt.sign({email: email, userid: user._id}, "secret");
                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: 'lax'
                })
                res.json({ 
                    success: true, 
                    message: 'Login successful',
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        name: user.name,
                        profilepic: user.profilepic
                    }
                })
            } else {
                res.status(401).json({ success: false, message: "Invalid email or password" })
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Logout
app.post('/api/logout', (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.json({ success: true, message: 'Logged out successfully' })
})

// Check authentication status
app.get('/api/check-auth', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.user.email})
        res.json({ 
            success: true, 
            isAuthenticated: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                profilepic: user.profilepic
            }
        })
    } catch (error) {
        res.status(401).json({ success: false, isAuthenticated: false })
    }
})

function isLoggedIn (req, res, next) {
    const token = req.cookies.token;
    
    if(!token || token === "") {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    
    try {
        let data = jwt.verify(token, "secret")
        req.user = data;
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})