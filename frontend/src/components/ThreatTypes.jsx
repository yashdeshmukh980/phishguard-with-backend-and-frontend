import { ShieldAlert } from 'lucide-react'

const types = [
  { key: 'PHISHING', label: 'Phishing', color: 'bg-red-400' },
  { key: 'MALWARE', label: 'Malware', color: 'bg-yellow-400' },
  { key: 'SUSPICIOUS_DOMAIN', label: 'Suspicious Domain', color: 'bg-purple-400' },
  { key: 'CREDENTIAL_HARVESTING', label: 'Credential Harvesting', color: 'bg-sky-400' },
  { key: 'OTHER', label: 'Others', color: 'bg-slate-400' },
]

export default function ThreatTypes({ scans }) {
  const flagged = scans.filter((s) => s.category)
  const total = flagged.length

  const rows = types
    .map((t) => {
      const n = flagged.filter((s) => s.category === t.key).length
      return { ...t, n, pct: total ? Math.round((n / total) * 100) : 0 }
    })
    .sort((a, b) => b.n - a.n)

  return (
    <section className="bg-panel border border-line rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <ShieldAlert className="text-brand" size={22} />
        <h3 className="text-lg font-semibold">Top Threat Types</h3>
      </div>

      {total === 0 ? (
        <p className="text-sm text-slate-400">
          Scan a risky link to see which kinds of threats show up.
        </p>
      ) : (
        <ul className="space-y-4">
          {rows.map((r) => (
            <li key={r.key}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="flex items-center gap-2 text-slate-200">
                  <span className={'w-2.5 h-2.5 rounded-full ' + r.color} />
                  {r.label}
                </span>
                <span className="text-slate-300">{r.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-ink">
                <div className={'h-2 rounded-full ' + r.color} style={{ width: r.pct + '%' }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}