import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, TrendingUp, Trophy, Award, Settings, Flame } from 'lucide-react'
import { useAuth } from '../../application/contexts/AuthContext'

export default function Sidebar() {
  const { user } = useAuth()

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Meus Planos', href: '/plans' },
    { icon: TrendingUp, label: 'Progresso', href: '/progress' },
    { icon: Trophy, label: 'Conquistas', href: '#' },
    { icon: Award, label: 'Certificados', href: '#' },
    { icon: Settings, label: 'Configurações', href: '/settings' }
  ]

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen border-r border-[#1a1a1a] bg-black sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#1a1a1a]">
        <div className="text-lg font-bold text-white">&lt;/&gt; DevCoachAI</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-[#6366f1]/10 border border-[#6366f1] text-white'
                    : 'text-[#888888] hover:text-white hover:bg-[#0a0a0a]'
                }`
              }
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Streak & User */}
      <div className="p-4 border-t border-[#1a1a1a] space-y-3">
        <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-[#f59e0b]" />
            <span className="text-xs text-[#888888] font-medium uppercase">Streak</span>
          </div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-xs text-[#555555]">dias em sequência</div>
        </div>

        <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center text-white font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-[#555555] truncate">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
