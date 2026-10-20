import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Mail, Lock } from 'lucide-react'
import api from '../api/api'

export default function Login() {
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
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem(
        'user',
        JSON.stringify({ name: res.data.name, email: res.data.email, role: res.data.role })
      )
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm bg-panel border border-line p-8 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="text-brand mb-2" size={44} />
          <h1 className="text-3xl font-bold text-white">
            Phish<span className="text-brand">Guard</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Stay safe. Scan before you click.</p>
        </div>

        <h2 className="text-lg text-slate-200 mb-4">Log in</h2>

        {error && (
          <p className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 mb-3 bg-ink border border-line rounded-xl px-4 focus-within:border-brand">
          <Mail size={18} className="text-slate-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-transparent py-3 outline-none text-white placeholder-slate-500"
          />
        </div>
        <div className="flex items-center gap-3 mb-5 bg-ink border border-line rounded-xl px-4 focus-within:border-brand">
          <Lock size={18} className="text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex-1 bg-transparent py-3 outline-none text-white placeholder-slate-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-brand text-ink font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className="mt-5 text-sm text-slate-400 text-center">
          No account?{' '}
          <Link to="/register" className="text-brand hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}