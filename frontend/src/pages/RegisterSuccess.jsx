import { Link } from 'react-router-dom'

function RegisterSuccess() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-zinc-800 rounded-2xl shadow-lg p-10 text-center w-full max-w-md">
        <h3 className="text-3xl font-semibold mb-4">🎉 You are registered!</h3>
        <p className="text-zinc-400 mb-6">Your account has been created successfully.</p>
        
        <Link 
          to="/login"
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-400 transition rounded-lg text-black font-medium"
        >
          Go To Login
        </Link>
      </div>
    </div>
  )
}

export default RegisterSuccess
