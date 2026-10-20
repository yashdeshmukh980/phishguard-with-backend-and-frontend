import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { categorize, styles, dateOf } from '../utils/verdict'

const filters = ['all', 'safe', 'suspicious', 'malicious']

export default function History() {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/scans', { params: { size: 200 } })
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

  const shown = scans.filter((s) => filter === 'all' || categorize(s.verdict) === filter)

  const formatDate = (s) => {
    const d = dateOf(s)
    return d ? d.toLocaleString() : ''
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-1">Scan History</h2>
      <p className="text-slate-400 mb-5">Every link you have checked, newest first.</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              'px-4 py-2 rounded-full text-sm capitalize border ' +
              (filter === f
                ? 'bg-brand/15 text-brand border-brand/40'
                : 'bg-panel text-slate-300 border-line hover:text-white')
            }
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && shown.length === 0 && (
        <p className="text-slate-400">No scans to show here yet.</p>
      )}

      <div className="space-y-3">
        {shown.map((s, i) => {
          const st = styles[categorize(s.verdict)]
          return (
            <div
              key={s.id || i}
              className="bg-panel border border-line rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="truncate text-slate-100">{s.url}</p>
                <p className="text-xs text-slate-400 mt-1">{formatDate(s)}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={'inline-block px-3 py-1 rounded-full text-xs font-semibold border ' + st.bg + ' ' + st.border + ' ' + st.text}>
                  {s.verdict}
                </span>
                <p className="text-sm text-slate-300 mt-1">Score: {s.score}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}