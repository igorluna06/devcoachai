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

  const levels = [
    { id: 'ZERO', label: 'Iniciante', desc: 'Nunca codei antes' },
    { id: 'BEGINNER', label: 'Básico', desc: 'Já dei os primeiros passos' },
    { id: 'INTERMEDIATE', label: 'Intermediário', desc: 'Já tenho uma base sólida' }
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
    { id: 'MORE_JOBS', label: 'Mais oportunidades no mercado' },
    { id: 'MODERN_TECH', label: 'Tecnologia moderna e inovadora' },
    { id: 'BOTH', label: 'Equilíbrio entre os dois' }
  ]

  const languageMap: Record<string, string> = {
    FRONTEND: 'JAVASCRIPT',
    BACKEND: 'JAVASCRIPT',
    MOBILE: 'DART',
    DEVOPS: 'PYTHON',
    AI: 'PYTHON',
    GAMES: 'CSHARP'
  }

  const stackMap: Record<string, string> = {
    FRONTEND: 'React, Next.js, TailwindCSS',
    BACKEND: 'Node.js, Express, PostgreSQL',
    MOBILE: 'Flutter, Dart',
    DEVOPS: 'Docker, Linux, CI/CD',
    AI: 'Python, TensorFlow, PyTorch',
    GAMES: 'Unity, C#'
  }

  const levelMap: Record<string, string> = {
    ZERO: 'BEGINNER',
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'INTERMEDIATE'
  }

  const handleGenerate = async () => {
    if (!user) return
    setLoading(true)

    const payload = {
      userId: Number(user.id),  // converte pra number
      goal,
      preference,
      region: region || 'Brasil',
      experienceLevel: level,
      recommendedLanguage: languageMap[goal],
      recommendedStack: stackMap[goal],
      level: levelMap[level]
    }

    try {
      await generatePlan(payload)
      navigate('/dashboard')
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Crie seu plano personalizado</h1>
          <p className="text-[#888888]">4 perguntas rápidas para montar o plano ideal para você</p>
        </div>

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

        <div className="rounded-2xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm p-8 mb-8 min-h-[400px] flex flex-col">

          {step === 1 && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Qual é seu nível?</h2>
              <p className="text-[#888888]">Escolha a opção que melhor descreve sua experiência</p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id as 'ZERO' | 'BEGINNER' | 'INTERMEDIATE')}
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

          {step === 2 && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Qual é seu objetivo?</h2>
              <p className="text-[#888888]">O que você quer aprender a fazer?</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id as 'FRONTEND' | 'BACKEND' | 'MOBILE' | 'DEVOPS' | 'AI' | 'GAMES')}
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

          {step === 3 && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Qual sua preferência?</h2>
              <p className="text-[#888888]">Prioriza mais oportunidades ou tecnologia moderna?</p>
              <div className="grid grid-cols-1 gap-3 mt-4">
                {preferences.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPreference(p.id as 'MORE_JOBS' | 'MODERN_TECH' | 'BOTH')}
                    className={`p-3 rounded-lg border-2 text-left transition ${
                      preference === p.id
                        ? 'border-[#6366f1] bg-[#6366f1]/10 text-white'
                        : 'border-[#1a1a1a] bg-black/30 text-[#888888] hover:border-[#333333]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
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
                  <div className="text-lg font-semibold text-white">{goals.find((g) => g.id === goal)?.label}</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
                  <div className="text-sm text-[#888888]">Preferência</div>
                  <div className="text-lg font-semibold text-white">{preferences.find((p) => p.id === preference)?.label}</div>
                </div>
                {region && (
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
                    <div className="text-sm text-[#888888]">Região</div>
                    <div className="text-lg font-semibold text-white">{region}</div>
                  </div>
                )}
              </div>
              <div className="p-4 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/30 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Pronto para gerar</div>
                    <div className="text-sm text-[#888888]">
                      Nossa IA vai criar um plano completo com módulos e tarefas práticas para o seu perfil.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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