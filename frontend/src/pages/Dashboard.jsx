import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Link2, Search, ShieldCheck, ShieldAlert, X, Check, Lightbulb, Clock, ChevronRight } from 'lucide-react'
import api from '../api/api'
import ThreatTypes from '../components/ThreatTypes'

const categorize = (verdict) => {
  const v = String(verdict || '').toUpperCase()
  if (v.includes('MALICIOUS') || v.includes('PHISHING') || v.includes('DANGER') || v.includes('UNSAFE')) return 'malicious'
  if (v.includes('SUSPICIOUS')) return 'suspicious'
  if (v.includes('SAFE')) return 'safe'
  return 'suspicious'
}

const styles = {
  safe: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: 'Safe' },
  suspicious: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', label: 'Suspicious' },
  malicious: { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', label: 'Malicious' },
}

const dateOf = (s) => {
  const raw = s.createdAt || s.scannedAt
  if (!raw) return null
  const d = new Date(raw)
  return isNaN(d.getTime()) ? null : d
}

const timeAgo = (d) => {
  if (!d) return ''
  const mins = Math.floor((Date.now() - d.getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return mins + ' min ago'
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return hrs + ' hours ago'
  return Math.floor(hrs / 24) + ' days ago'
}

const reasonText = (r) =>
  typeof r === 'string' ? r : r.description || r.message || r.reason || JSON.stringify(r)

function StatCard({ icon: Icon, label, value, week, cat }) {
  const st = cat ? styles[cat] : { text: 'text-brand', bg: 'bg-brand/15', border: 'border-brand/30' }
  return (
    <div className={'rounded-2xl border p-5 bg-panel ' + st.border}>
      <div className={'w-11 h-11 rounded-full flex items-center justify-center mb-3 ' + st.bg}>
        <Icon className={st.text} size={22} />
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
      <p className={'text-xs mt-2 ' + st.text}>{week} in last 7 days</p>
    </div>
  )
}

function Gauge({ pct, color }) {
  return (
    <svg viewBox="0 0 200 115" className="w-full max-w-[220px] mx-auto">
      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#17335f" strokeWidth="16" strokeLinecap="round" pathLength="100" />
      {pct > 0 && (
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray={pct + ' 100'}
        />
      )}
    </svg>
  )
}

export default function Dashboard() {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const forceLogout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }, [navigate])

  const load = useCallback(async () => {
    try {
      const res = await api.get('/scans', { params: { size: 1000 } })
      const list = Array.isArray(res.data) ? res.data : res.data.content || []
      setScans(list)
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        forceLogout()
      }
    } finally {
      setLoading(false)
    }
  }, [forceLogout])

  useEffect(() => {
    load()
  }, [load])

  const handleScan = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setScanning(true)
    try {
      const res = await api.post('/scans', { url })
      setResult(res.data)
      setUrl('')
      load()
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        forceLogout()
      } else {
        setError('Scan failed. Check the URL and try again.')
      }
    } finally {
      setScanning(false)
    }
  }

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const inWeek = (s) => {
    const d = dateOf(s)
    return d && d.getTime() > weekAgo
  }
  const count = (cat) => scans.filter((s) => categorize(s.verdict) === cat).length
  const weekCount = (cat) =>
    scans.filter((s) => inWeek(s) && (cat === 'all' || categorize(s.verdict) === cat)).length

  const last10 = scans.slice(0, 10)
  const avg = last10.length
    ? last10.reduce((sum, s) => sum + (Number(s.score) || 0), 0) / last10.length
    : 0
  const pct = Math.max(0, Math.min(100, Math.round(avg)))
  const level = pct < 30 ? 'Low' : pct < 60 ? 'Medium' : 'High'
  const levelColor = pct < 30 ? '#34d399' : pct < 60 ? '#facc15' : '#f87171'
  const levelText = pct < 30 ? 'text-emerald-400' : pct < 60 ? 'text-yellow-400' : 'text-red-400'

  const tips = [
    'Check the URL carefully and look for misspellings.',
    'Avoid clicking on unknown links or short URLs.',
    "Don't share your personal or login information.",
  ]

  const resultStyle = result ? styles[categorize(result.verdict)] : null

  return (
    <div className="p-4 md:p-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-panel border border-line rounded-2xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-white">Check Any Link</h2>
            <h2 className="text-3xl font-bold text-brand mb-3">for Threats</h2>
            <p className="text-sm text-slate-300 mb-5 max-w-md">
              Paste a link below and let PhishGuard analyze it for phishing, malware and other cyber threats.
            </p>
            <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-ink border border-line rounded-full px-4">
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
                disabled={scanning}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand text-ink font-semibold hover:opacity-90 disabled:opacity-50"
              >
                <Search size={18} />
                {scanning ? 'Scanning...' : 'Scan'}
              </button>
            </form>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

            {result && (
              <div className={'mt-5 rounded-xl border p-4 ' + resultStyle.bg + ' ' + resultStyle.border}>
                <div className="flex items-center justify-between gap-4">
                  <p className={'text-2xl font-bold ' + resultStyle.text}>{result.verdict}</p>
                  <p className="text-slate-200">Risk score: <span className="font-semibold">{result.score}</span></p>
                </div>
                {result.reasons && result.reasons.length > 0 && (
                  <ul className="list-disc list-inside mt-3 text-sm text-slate-200 space-y-1">
                    {result.reasons.map((r, i) => (
                      <li key={i}>{reasonText(r)}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>

          <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard icon={Link2} label="Total Scans" value={scans.length} week={weekCount('all')} />
            <StatCard icon={ShieldCheck} label="Safe Links" value={count('safe')} week={weekCount('safe')} cat="safe" />
            <StatCard icon={ShieldAlert} label="Suspicious Links" value={count('suspicious')} week={weekCount('suspicious')} cat="suspicious" />
            <StatCard icon={X} label="Malicious Links" value={count('malicious')} week={weekCount('malicious')} cat="malicious" />
          </section>

          <section className="bg-panel border border-line rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock className="text-brand" size={22} />
                <h3 className="text-lg font-semibold">Recent Scans</h3>
              </div>
              <Link to="/history" className="text-sm text-brand hover:underline">View All</Link>
            </div>

            {loading && <p className="text-slate-400 text-sm">Loading...</p>}
            {!loading && scans.length === 0 && (
              <p className="text-slate-400 text-sm">No scans yet. Paste a link above and click Scan.</p>
            )}

            {scans.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-line">
                      <th className="py-2 pr-4 font-normal">URL</th>
                      <th className="py-2 pr-4 font-normal">Result</th>
                      <th className="py-2 pr-4 font-normal">Risk Score</th>
                      <th className="py-2 font-normal">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scans.slice(0, 6).map((s, i) => {
                      const st = styles[categorize(s.verdict)]
                      return (
                        <tr key={s.id || i} className="border-b border-line/50 last:border-0">
                          <td className="py-3 pr-4 max-w-[220px]">
                            <div className="flex items-center gap-3">
                              <span className={'w-7 h-7 shrink-0 rounded-full flex items-center justify-center ' + st.bg}>
                                {categorize(s.verdict) === 'safe' ? (
                                  <Check size={14} className={st.text} />
                                ) : categorize(s.verdict) === 'malicious' ? (
                                  <X size={14} className={st.text} />
                                ) : (
                                  <ShieldAlert size={14} className={st.text} />
                                )}
                              </span>
                              <span className="truncate">{s.url}</span>
                            </div>
                          </td>
                          <td className={'py-3 pr-4 font-medium ' + st.text}>{s.verdict}</td>
                          <td className={'py-3 pr-4 ' + st.text}>{s.score}</td>
                          <td className="py-3 text-slate-400 whitespace-nowrap">{timeAgo(dateOf(s))}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-panel border border-line rounded-2xl p-6 text-center">
            <Gauge pct={pct} color={levelColor} />
            <p className="text-slate-300 mt-2">Overall Risk Level</p>
            <p className={'text-3xl font-bold ' + (scans.length ? levelText : 'text-slate-400')}>
              {scans.length ? level : 'No data'}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {scans.length
                ? 'Average score of your last ' + last10.length + ' scans: ' + pct
                : 'Scan a link to see your risk level.'}
            </p>
          </section>
          
          <ThreatTypes scans={scans} />
          <section className="bg-panel border border-line rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="text-brand" size={22} />
              <h3 className="text-lg font-semibold">Quick Tips</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              {tips.map((t) => (
                <li key={t} className="flex gap-2">
                  <ChevronRight size={16} className="text-brand shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}