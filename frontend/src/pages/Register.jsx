import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    age: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(formData)
      navigate('/registered')
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-zinc-800 w-full max-w-md rounded-2xl shadow-lg p-8">
        <h3 className="text-3xl font-semibold mb-6 text-center">Create Account</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input 
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            type="text" 
            placeholder="Username" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input 
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            type="text" 
            placeholder="Name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input 
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            type="password" 
            placeholder="Password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input 
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            type="email" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input 
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            type="number" 
            placeholder="Age" 
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-500 text-black font-medium cursor-pointer hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account? 
          <Link className="text-blue-400 hover:underline ml-1" to="/login">Go to Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
