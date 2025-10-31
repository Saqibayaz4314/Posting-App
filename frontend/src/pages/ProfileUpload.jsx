import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userAPI } from '../services/api'

function ProfileUpload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await userAPI.uploadProfilePic(formData)
      if (response.data.success) {
        navigate('/profile')
      }
    } catch (error) {
      setError('Failed to upload image')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-zinc-800 w-full max-w-md rounded-2xl shadow-lg p-8">
        <h3 className="text-3xl font-semibold mb-6 text-center">Upload Profile Picture</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {preview && (
          <div className="mb-4 flex justify-center">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              type="file" 
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-black hover:file:bg-blue-400 file:cursor-pointer"
            />
          </div>

          <button 
            type="submit"
            disabled={uploading || !file}
            className="w-full py-3 rounded-lg bg-blue-500 text-black font-medium cursor-pointer hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link className="text-blue-400 hover:underline" to="/profile">Back to Profile</Link>
        </p>
      </div>
    </div>
  )
}

export default ProfileUpload
