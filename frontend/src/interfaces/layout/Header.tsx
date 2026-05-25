import React, { useState } from 'react'
import { Bell, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../application/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header({ title }: { title?: string }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-[#1a1a1a] bg-black/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-white p-2">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-[#0a0a0a] text-[#888888] hover:text-white transition">
            <Bell size={20} />
          </button>

          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-[#888888] hover:text-white hover:bg-[#0a0a0a] transition text-sm"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
