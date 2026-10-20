export const categorize = (verdict) => {
  const v = String(verdict || '').toUpperCase()
  if (v.includes('MALICIOUS') || v.includes('PHISHING') || v.includes('DANGER') || v.includes('UNSAFE')) return 'malicious'
  if (v.includes('SUSPICIOUS')) return 'suspicious'
  if (v.includes('SAFE')) return 'safe'
  return 'suspicious'
}

export const styles = {
  safe: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
  suspicious: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30' },
  malicious: { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30' },
}

export const reasonText = (r) =>
  typeof r === 'string' ? r : r.description || r.message || r.reason || JSON.stringify(r)

export const dateOf = (s) => {
  const raw = s.createdAt || s.scannedAt
  if (!raw) return null
  const d = new Date(raw)
  return isNaN(d.getTime()) ? null : d
}

export const timeAgo = (d) => {
  if (!d) return ''
  const mins = Math.floor((Date.now() - d.getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return mins + ' min ago'
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return hrs + ' hours ago'
  return Math.floor(hrs / 24) + ' days ago'
}