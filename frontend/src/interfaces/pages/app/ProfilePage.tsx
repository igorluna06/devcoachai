import React from 'react'
import { useAuth } from '../../../application/contexts/AuthContext'
import { User, Mail, Trophy, BookOpen, Award } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Perfil</h1>

      {/* User Card */}
      <div className="p-8 rounded-2xl border border-[#1a1a1a] bg-black/50">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#4f52d4] flex items-center justify-center text-white font-bold text-4xl flex-shrink-0">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-[#6366f1]" />
              <div className="text-2xl font-bold text-white">{user?.name}</div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Mail size={16} className="text-[#888888]" />
              <div className="text-[#888888]">{user?.email}</div>
            </div>
            {user?.birthDate && (
              <div className="text-sm text-[#555555]">Membro desde {new Date().getFullYear()}</div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Suas estatísticas</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Trophy, label: 'Streak atual', value: '3', desc: 'dias' },
            { icon: BookOpen, label: 'Planos', value: '2', desc: 'ativos' },
            { icon: Award, label: 'Certificados', value: '1', desc: 'ganho' }
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="p-4 rounded-xl border border-[#1a1a1a] bg-black/50">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={18} className="text-[#6366f1]" />
                  <span className="text-[#888888] text-sm">{stat.label}</span>
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-[#555555]">{stat.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Conquistas</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { emoji: '🎯', name: 'Primeiro passo' },
            { emoji: '⚡', name: 'Em chamas' },
            { emoji: '🏆', name: 'Campeão' }
          ].map((badge, i) => (
            <div key={i} className="p-4 rounded-xl border border-[#1a1a1a] bg-black/50 text-center">
              <div className="text-4xl mb-2">{badge.emoji}</div>
              <div className="text-sm font-medium text-white">{badge.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
