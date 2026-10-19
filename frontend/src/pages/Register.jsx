import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/register', { name, email, password })
      navigate('/login')
    } catch (err) {
      setError('Registration failed. This email may already be used.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-slate-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">PhishGuard</h1>
        <h2 className="text-lg text-slate-200 mb-4">Create account</h2>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-5 p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>

        <p className="mt-4 text-sm text-slate-400 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}