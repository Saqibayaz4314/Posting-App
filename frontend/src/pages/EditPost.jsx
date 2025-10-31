import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postAPI } from '../services/api'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await postAPI.getPost(id)
      if (response.data.success) {
        setContent(response.data.post.content)
      }
    } catch (error) {
      setError('Failed to load post')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setUpdating(true)
    try {
      const response = await postAPI.updatePost(id, content)
      if (response.data.success) {
        navigate('/profile')
      }
    } catch (error) {
      setError('Failed to update post')
      console.error(error)
    } finally {
      setUpdating(false)
    }
  }

  const handleLogout = () => {
    navigate('/logout')
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="w-full flex justify-end p-6">
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* Center content */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-zinc-800/60 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Edit Your Post</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?" 
              className="w-full min-h-[120px] p-4 text-white placeholder-zinc-400 bg-zinc-900 border border-zinc-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            
            <button 
              type="submit"
              disabled={updating || !content.trim()}
              className="w-full py-3 bg-yellow-500 text-black font-medium rounded-xl cursor-pointer hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? 'Updating...' : 'Update Post'}
            </button>
          </form>

          <button 
            onClick={() => navigate('/profile')}
            className="w-full mt-3 py-3 bg-zinc-700 text-white font-medium rounded-xl cursor-pointer hover:bg-zinc-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPost
