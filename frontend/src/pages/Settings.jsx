import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export default function Settings() {
  const navigate = useNavigate()

  let user = {}
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}')
  } catch (e) {
    user = {}
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const rows = [
    ['Name', user.name],
    ['Email', user.email],
    ['Role', user.role],
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="bg-panel border border-line rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Account</h3>
        <dl className="space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-slate-400 text-sm">{label}</dt>
              <dd className="text-slate-100 text-sm">{value || '-'}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-slate-500 mt-4">Changing your password will be added later.</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 text-sm"
      >
        <LogOut size={18} />
        Log out
      </button>
    </div>
  )
}