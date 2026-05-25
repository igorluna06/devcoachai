import React, { useState } from 'react'
import { useAuth } from '../../../application/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Lock, LogOut, Trash2, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white">Configurações</h1>

      {/* Personal Data */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Dados pessoais</h2>
        <div className="p-6 rounded-xl border border-[#1a1a1a] bg-black/50 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#888888] mb-2">Nome</label>
            <input
              type="text"
              value={user?.name}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-[#555555]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#888888] mb-2">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-[#555555]"
            />
          </div>
          <div className="text-sm text-[#555555] pt-2">
            Para alterar seus dados, entre em contato com nosso suporte.
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Segurança</h2>
        <div className="p-6 rounded-xl border border-[#1a1a1a] bg-black/50">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg border border-[#1a1a1a] hover:border-[#333333] transition text-[#888888] hover:text-white">
            <Lock size={20} />
            <div className="text-left">
              <div className="font-medium">Alterar senha</div>
              <div className="text-sm text-[#555555]">Atualize sua senha regularmente</div>
            </div>
          </button>
        </div>
      </section>

      {/* Account */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Conta</h2>
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-4 rounded-xl border border-[#1a1a1a] hover:border-[#333333] hover:bg-[#0a0a0a] transition text-[#888888] hover:text-white"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-3 w-full p-4 rounded-xl border border-[#ef4444]/30 hover:border-[#ef4444] hover:bg-[#ef4444]/5 transition text-[#ef4444]"
            >
              <Trash2 size={20} />
              <span className="font-medium">Deletar conta</span>
            </button>
          ) : (
            <div className="p-4 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/5 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#ef4444]">Deletar sua conta?</div>
                  <p className="text-sm text-[#888888] mt-1">
                    Esta ação é permanente. Todos seus dados, planos e certificados serão perdidos.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-[#1a1a1a] hover:border-[#333333] text-[#888888] transition"
                >
                  Cancelar
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-[#ef4444] text-white font-medium hover:bg-[#dc2626] transition">
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
