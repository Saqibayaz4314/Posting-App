import { createContext, useState, useContext, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await authAPI.checkAuth()
      if (response.data.success) {
        setUser(response.data.user)
      }
    } catch (error) {
      console.log('Not authenticated')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const response = await authAPI.login(credentials)
    if (response.data.success) {
      setUser(response.data.user)
      return response.data
    }
    throw new Error(response.data.message)
  }

  const register = async (userData) => {
    const response = await authAPI.register(userData)
    if (response.data.success) {
      setUser(response.data.user)
      return response.data
    }
    throw new Error(response.data.message)
  }

  const logout = async () => {
    await authAPI.logout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
