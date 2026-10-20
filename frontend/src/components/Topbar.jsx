import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export default function Topbar() {
  const navigate = useNavigate()

  let user = {}
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}')
  } catch (e) {
    user = {}
  }

  const name = user.name || 'there'
  const initials = (user.name || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const mobileLink = ({ isActive }) =>
    'px-3 py-2 rounded-lg text-sm border ' +
    (isActive ? 'bg-brand/15 text-brand border-brand/40' : 'text-slate-300 border-line')

  return (
    <header className="border-b border-line bg-ink/60 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">Welcome back, {name} 👋</h1>
          <p className="text-sm text-slate-400">Stay safe. Scan before you click.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 bg-panel border border-line rounded-full pl-2 pr-4 py-1.5">
            <span className="w-9 h-9 rounded-full bg-brand text-ink font-bold flex items-center justify-center text-sm">
              {initials}
            </span>
            <span className="text-sm text-slate-200">{user.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-panel hover:bg-line text-sm border border-line"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </div>

      <nav className="md:hidden flex gap-2 mt-4">
        <NavLink to="/dashboard" className={mobileLink}>Dashboard</NavLink>
        <NavLink to="/scan" className={mobileLink}>Scan</NavLink>
        <NavLink to="/history" className={mobileLink}>History</NavLink>
      </nav>
    </header>
  )
}