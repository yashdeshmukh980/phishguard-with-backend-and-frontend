import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function History() {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/scans')
        const list = Array.isArray(res.data) ? res.data : res.data.content || []
        setScans(list)
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        } else {
          setError('Could not load your history.')
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [navigate])

  const verdictColor = (verdict) => {
    const v = String(verdict).toUpperCase()
    if (v.includes('SAFE')) return 'text-emerald-400'
    if (v.includes('SUSPICIOUS')) return 'text-yellow-400'
    return 'text-red-400'
  }

  const formatDate = (s) => {
    const raw = s.createdAt || s.scannedAt
    return raw ? new Date(raw).toLocaleString() : ''
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Scan history</h2>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && scans.length === 0 && (
        <p className="text-slate-400">No scans yet. Go to the Scan page and check a link.</p>
      )}

      <div className="space-y-3">
        {scans.map((s, i) => (
          <div key={s.id || i} className="bg-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-slate-100">{s.url}</p>
              <p className="text-xs text-slate-400">{formatDate(s)}</p>
            </div>
            <div className="text-right shrink-0">
              <p className={'font-bold ' + verdictColor(s.verdict)}>{s.verdict}</p>
              <p className="text-sm text-slate-300">Score: {s.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}