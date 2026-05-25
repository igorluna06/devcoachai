import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../application/contexts/AuthContext'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(name, birthDate, email, password)
      navigate('/onboarding')
    } catch (e: any) {
        console.log('ERRO COMPLETO:', e)
        console.log('RESPOSTA:', e.response)
        console.log('DADOS:', e.response?.data)
        toast.error('Failed to create account')
    throw e
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="text-2xl font-bold text-white">&lt;/&gt; DevCoachAI</div>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Criar conta</h1>
            <p className="text-[#888888]">Comece sua jornada de aprendizado hoje mesmo.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#555555] focus:border-[#6366f1] focus:outline-none transition"
                placeholder="Seu nome"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Data de nascimento</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#555555] focus:border-[#6366f1] focus:outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#555555] focus:border-[#6366f1] focus:outline-none transition"
                placeholder="seu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#555555] focus:border-[#6366f1] focus:outline-none transition"
                  placeholder="Sua senha (min. 8 caracteres)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6366f1] text-white rounded-lg font-medium hover:bg-[#4f52d4] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1a1a1a]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-[#888888]">ou</span>
            </div>
          </div>

          {/* Login link */}
          <div className="text-center text-sm">
            <span className="text-[#888888]">Já tem conta? </span>
            <Link to="/login" className="text-[#6366f1] font-medium hover:underline">
              Faça login
            </Link>
          </div>
        </div>

        {/* Footer link */}
        <div className="mt-6 text-center text-sm">
          <Link to="/" className="text-[#888888] hover:text-white transition">
            ← Voltar para home
          </Link>
        </div>
      </div>
    </div>
  )
}
