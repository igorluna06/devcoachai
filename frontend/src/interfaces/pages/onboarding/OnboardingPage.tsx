import React, { useState } from 'react'
import { useStudyPlanContext } from '../../../application/contexts/StudyPlanContext'
import { useAuth } from '../../../application/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [level, setLevel] = useState<'ZERO' | 'BEGINNER' | 'INTERMEDIATE'>('BEGINNER')
  const [goal, setGoal] = useState<'FRONTEND' | 'BACKEND' | 'MOBILE' | 'DEVOPS' | 'AI' | 'GAMES'>('FRONTEND')
  const [preference, setPreference] = useState<'MORE_JOBS' | 'MODERN_TECH' | 'BOTH'>('BOTH')
  const [region, setRegion] = useState('')
  const [loading, setLoading] = useState(false)
  const { generatePlan } = useStudyPlanContext()
  const { user } = useAuth()
  const navigate = useNavigate()

  const next = () => setStep((s) => Math.min(4, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handleGenerate = async () => {
    if (!user) return
    setLoading(true)
    const payload = {
      userId: user.id,
      goal,
      preference,
      region,
      experienceLevel: level
    }
    try {
      await generatePlan(payload)
      navigate('/dashboard')
    } catch (e) {
      setLoading(false)
    }
  }

  const levels = [
    { id: 'ZERO', label: 'Zero', desc: 'Nunca codei' },
    { id: 'BEGINNER', label: 'Iniciante', desc: 'Primeiros passos' },
    { id: 'INTERMEDIATE', label: 'Intermediário', desc: 'Já tenho base' }
  ]

  const goals = [
    { id: 'FRONTEND', label: 'Frontend' },
    { id: 'BACKEND', label: 'Backend' },
    { id: 'MOBILE', label: 'Mobile' },
    { id: 'DEVOPS', label: 'DevOps' },
    { id: 'AI', label: 'AI/ML' },
    { id: 'GAMES', label: 'Games' }
  ]

  const preferences = [
    { id: 'MORE_JOBS', label: 'Mais oportunidades' },
    { id: 'MODERN_TECH', label: 'Tech moderna' },
    { id: 'BOTH', label: 'Ambos' }
  ]

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Crie seu plano personalizado</h1>
          <p className="text-[#888888]">4 perguntas rápidas para montar o plano ideal para você</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white">Passo {step} de 4</span>
            <span className="text-sm text-[#888888]">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6366f1] to-[#4f52d4] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm p-8 mb-8 min-h-[400px] flex flex-col">
          {/* Step 1 - Level */}
          {step === 1 && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Qual é seu nível?</h2>
              <p className="text-[#888888]">Escolha a opção que melhor descreve sua experiência com programação</p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id as any)}
                    className={`p-4 rounded-xl border-2 text-left transition ${
                      level === l.id
                        ? 'border-[#6366f1] bg-[#6366f1]/10'
                        : 'border-[#1a1a1a] bg-black/30 hover:border-[#333333]'
                    }`}
                  >
                    <div className="font-semibold text-white">{l.label}</div>
                    <div className="text-sm text-[#888888]">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - Goal */}
          {step === 2 && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Qual é seu objetivo?</h2>
              <p className="text-[#888888]">O que você quer aprender a fazer?</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id as any)}
                    className={`p-4 rounded-xl border-2 text-center transition ${
                      goal === g.id
                        ? 'border-[#6366f1] bg-[#6366f1]/10 text-white'
                        : 'border-[#1a1a1a] bg-black/30 text-[#888888] hover:border-[#333333]'
                    }`}
                  >
                    <div className="font-semibold">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 - Preference & Region */}
          {step === 3 && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Qual sua preferência?</h2>
              <p className="text-[#888888]">Prioriza mais oportunidades ou tecnologia moderna?</p>
              <div className="grid grid-cols-1 gap-3 mt-4">
                {preferences.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPreference(p.id as any)}
                    className={`p-3 rounded-lg border-2 text-left transition ${
                      preference === p.id
                        ? 'border-[#6366f1] bg-[#6366f1]/10'
                        : 'border-[#1a1a1a] bg-black/30 hover:border-[#333333]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Region */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-2">De onde você é? (Opcional)</label>
                <input
                  placeholder="Digite sua região ou país"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-[#555555] focus:border-[#6366f1] focus:outline-none transition"
                />
              </div>
            </div>
          )}

          {/* Step 4 - Summary */}
          {step === 4 && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Resumo do seu plano</h2>
              <div className="space-y-3 mt-4">
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
                  <div className="text-sm text-[#888888]">Nível</div>
                  <div className="text-lg font-semibold text-white">{levels.find((l) => l.id === level)?.label}</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
                  <div className="text-sm text-[#888888]">Objetivo</div>
                  <div className="text-lg font-semibold text-white">{goal}</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
                  <div className="text-sm text-[#888888]">Preferência</div>
                  <div className="text-lg font-semibold text-white">
                    {preferences.find((p) => p.id === preference)?.label}
                  </div>
                </div>
                {region && (
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
                    <div className="text-sm text-[#888888]">Região</div>
                    <div className="text-lg font-semibold text-white">{region}</div>
                  </div>
                )}
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/30 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Recomendação</div>
                    <div className="text-sm text-[#888888]">
                      Nossa IA vai analisar seu perfil e recomendar as melhores linguagens e frameworks para seus objetivos.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-[#888888] disabled:opacity-40 disabled:cursor-not-allowed hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <button
            onClick={step === 4 ? handleGenerate : next}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#6366f1] text-white rounded-lg font-medium hover:bg-[#4f52d4] transition disabled:opacity-50"
          >
            {step === 4 ? (loading ? 'Gerando...' : 'Gerar plano') : 'Próximo'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
