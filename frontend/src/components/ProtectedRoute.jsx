import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function ProtectedRoute() {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <Outlet />
    </div>
  )
}