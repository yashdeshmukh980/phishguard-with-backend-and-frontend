import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

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

  const verdictColor = (verdict) => {
    const v = String(verdict).toUpperCase()
    if (v.includes('SAFE')) return 'text-emerald-400'
    if (v.includes('SUSPICIOUS')) return 'text-yellow-400'
    return 'text-red-400'
  }

  const reasonText = (r) =>
    typeof r === 'string' ? r : r.description || r.message || r.reason || JSON.stringify(r)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <form onSubmit={handleScan} className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <label className="block mb-2 text-slate-200">Enter a link to scan</label>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-50"
        >
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 bg-slate-800 p-6 rounded-xl shadow-lg">
          <p className="text-slate-400 text-sm">Verdict</p>
          <p className={'text-3xl font-bold mb-2 ' + verdictColor(result.verdict)}>
            {result.verdict}
          </p>
          <p className="text-slate-400 text-sm">Risk score</p>
          <p className="text-2xl font-semibold mb-4">{result.score}</p>

          <p className="text-slate-400 text-sm mb-2">Reasons</p>
          <ul className="list-disc list-inside space-y-1">
            {(result.reasons || []).map((r, i) => (
              <li key={i}>{reasonText(r)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}