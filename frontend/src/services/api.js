import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// API methods
export const authAPI = {
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  checkAuth: () => api.get('/check-auth')
}

export const userAPI = {
  getProfile: () => api.get('/profile'),
  uploadProfilePic: (formData) => {
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export const postAPI = {
  createPost: (content) => api.post('/post', { content }),
  getPost: (id) => api.get(`/post/${id}`),
  updatePost: (id, content) => api.put(`/post/${id}`, { content }),
  deletePost: (id) => api.delete(`/post/${id}`),
  likePost: (id) => api.post(`/like/${id}`)
}

export default api
