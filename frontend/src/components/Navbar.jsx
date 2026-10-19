import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
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

  const linkClass = ({ isActive }) =>
    'px-3 py-2 rounded-lg text-sm ' +
    (isActive ? 'bg-slate-700 text-emerald-400' : 'text-slate-300 hover:text-white')

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-emerald-400 mr-4">PhishGuard</span>
          <NavLink to="/scan" className={linkClass}>Scan</NavLink>
          <NavLink to="/history" className={linkClass}>History</NavLink>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 hidden sm:inline">{user.name}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}