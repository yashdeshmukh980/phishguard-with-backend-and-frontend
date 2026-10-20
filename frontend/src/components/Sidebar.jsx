import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Link2, History, ShieldAlert, Settings, ShieldCheck } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scan', label: 'Scan Link', icon: Link2 },
  { to: '/history', label: 'Scan History', icon: History },
  { to: '/threats', label: 'Threat Intelligence', icon: ShieldAlert },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition border ' +
    (isActive
      ? 'bg-brand/15 text-brand border-brand/40'
      : 'text-slate-300 hover:bg-panel hover:text-white border-transparent')

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between bg-ink border-r border-line p-5">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <ShieldCheck className="text-brand" size={32} />
          <span className="text-2xl font-bold text-white">
            Phish<span className="text-brand">Guard</span>
          </span>
        </div>

        <nav className="space-y-2">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3 bg-panel/60 border border-line rounded-xl p-4">
        <ShieldCheck className="text-brand" size={28} />
        <p className="text-xs text-slate-300">
          Safer Links.
          <br />A Safer You.
        </p>
      </div>
    </aside>
  )
}