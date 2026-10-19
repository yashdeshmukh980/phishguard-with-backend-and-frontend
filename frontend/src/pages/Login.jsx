import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem(
        'user',
        JSON.stringify({ name: res.data.name, email: res.data.email, role: res.data.role })
      )
      navigate('/scan')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-slate-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">PhishGuard</h1>
        <h2 className="text-lg text-slate-200 mb-4">Log in</h2>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

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
          className="w-full p-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
        >
          Log in
        </button>

        <p className="mt-4 text-sm text-slate-400 text-center">
          No account?{' '}
          <Link to="/register" className="text-emerald-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}