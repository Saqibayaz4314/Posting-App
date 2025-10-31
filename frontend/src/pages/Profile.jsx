import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { userAPI, postAPI } from '../services/api'

function Profile() {
  const [userData, setUserData] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [posting, setPosting] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile()
      if (response.data.success) {
        setUserData(response.data.user)
      }
    } catch (error) {
      setError('Failed to load profile')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setPosting(true)
    try {
      const response = await postAPI.createPost(content)
      if (response.data.success) {
        setContent('')
        fetchProfile() // Refresh profile to show new post
      }
    } catch (error) {
      setError('Failed to create post')
      console.error(error)
    } finally {
      setPosting(false)
    }
  }

  const handleLike = async (postId) => {
    try {
      await postAPI.likePost(postId)
      fetchProfile() // Refresh to update like count
    } catch (error) {
      console.error('Failed to like post', error)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error && !userData) {
    return (
      <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-8 py-5 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <h2 className="text-2xl font-semibold tracking-wide">VibeShare</h2>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 rounded-md px-4 py-2 text-sm transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500 rounded-md overflow-hidden flex items-center justify-center text-2xl font-bold">
            {userData?.profilepic && userData.profilepic !== 'default.jpg' ? (
              <img 
                className="w-full h-full object-cover" 
                src={`http://localhost:3000/images/uploads/${userData.profilepic}`} 
                alt="Profile"
              />
            ) : (
              userData?.name?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <div>
            <h3 className="text-3xl">
              <span className="font-light">Hello</span>, <span className="font-semibold text-blue-400">{userData?.name}</span> 👋🏻
            </h3>
          </div>
        </div>
        
        <div className="mb-4">
          <Link 
            to="/profile/upload" 
            className="text-blue-400 hover:underline text-sm"
          >
            Upload Profile Picture
          </Link>
        </div>

        <p className="mb-6 text-zinc-400">Create your vibe, share your thoughts!</p>

        {/* Post Form */}
        <form onSubmit={handleCreatePost} className="mb-10 max-w-xl">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?" 
            className="block w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 resize-none outline-none focus:ring-2 focus:ring-blue-500 transition text-white"
            rows="3"
          />
          <button 
            type="submit"
            disabled={posting || !content.trim()}
            className="mt-3 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 rounded-lg font-medium cursor-pointer transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {posting ? 'Creating...' : '🚀 Create Post'}
          </button>
        </form>

        {/* Posts Section */}
        <div className="posts max-w-xl">
          <h3 className="text-zinc-400 mb-5">Your Posts</h3>
          
          <div className="space-y-6">
            {userData?.posts && userData.posts.length > 0 ? (
              [...userData.posts].reverse().map((post) => {
                const isLiked = post.likes.includes(user?.id)
                return (
                  <div key={post._id} className="post bg-zinc-800 rounded-xl p-5 border border-zinc-700 hover:border-blue-500 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-blue-400 font-medium">@{userData.username}</h4>
                      <small className="text-zinc-500">{post.likes.length} ❤️</small>
                    </div>
                    <p className="text-sm leading-relaxed mb-4">{post.content}</p>

                    {/* Buttons */}
                    <div className="flex gap-6 text-sm">
                      <button 
                        onClick={() => handleLike(post._id)}
                        className="text-blue-500 hover:underline"
                      >
                        {isLiked ? '👎 Unlike' : '👍 Like'}
                      </button>
                      <Link 
                        className="text-zinc-400 hover:text-yellow-400" 
                        to={`/edit/${post._id}`}
                      >
                        ✏️ Edit
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-zinc-500 text-center py-8">No posts yet. Create your first post!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
