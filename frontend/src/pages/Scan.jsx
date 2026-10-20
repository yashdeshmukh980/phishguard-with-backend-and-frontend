import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link2, Search } from 'lucide-react'
import api from '../api/api'
import { categorize, styles, reasonText } from '../utils/verdict'

export default function Scan() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleScan = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const res = await api.post('/scans', { url })
      setResult(res.data)
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
      } else {
        setError('Scan failed. Check the URL and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const st = result ? styles[categorize(result.verdict)] : null

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-1">Scan Link</h2>
      <p className="text-slate-400 mb-6">
        Paste a link to check it for phishing, malware and other threats.
      </p>

      <form onSubmit={handleScan} className="bg-panel border border-line rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 bg-ink border border-line rounded-full px-4 focus-within:border-brand">
            <Link2 size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="flex-1 bg-transparent py-3 outline-none text-white placeholder-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand text-ink font-semibold hover:opacity-90 disabled:opacity-50"
          >
            <Search size={18} />
            {loading ? 'Scanning...' : 'Scan'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {result && (
        <div className={'mt-6 rounded-2xl border p-6 ' + st.bg + ' ' + st.border}>
          <p className="text-slate-400 text-sm">Verdict</p>
          <p className={'text-3xl font-bold mb-3 ' + st.text}>{result.verdict}</p>
          <p className="text-slate-400 text-sm">Risk score</p>
          <p className="text-2xl font-semibold mb-4">{result.score}</p>

          <p className="text-slate-400 text-sm mb-2">Reasons</p>
          <ul className="list-disc list-inside space-y-1 text-slate-200">
            {(result.reasons || []).map((r, i) => (
              <li key={i}>{reasonText(r)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}