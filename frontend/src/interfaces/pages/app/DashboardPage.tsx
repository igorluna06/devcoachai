import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../application/contexts/AuthContext'
import { useStudyPlanContext } from '../../../application/contexts/StudyPlanContext'
import { Flame, Plus} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const displayName = user?.name ?? ''
  const firstName = displayName.split(' ')[0] || 'amigo'
  const { plans, fetchPlans } = useStudyPlanContext()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const id = localStorage.getItem('userId')
    if (id) fetchPlans(id)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Greeting */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          {getGreeting()}, {firstName}! 👋
        </h1>
        <p className="text-[#888888]">Você está evoluindo a cada dia. Continue assim!</p>
      </div>

      {/* Streak Card */}
      <div className="p-8 rounded-2xl border border-[#6366f1] bg-gradient-to-br from-[#6366f1]/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-[#6366f1] flex items-center justify-center">
            <Flame size={32} className="text-white" />
          </div>
          <div>
            <div className="text-sm text-[#888888] uppercase tracking-wider">Seu Streak</div>
            <div className="text-5xl font-bold text-white">3</div>
            <div className="text-sm text-[#888888]">dias em sequência 🔥</div>
          </div>
        </div>
      </div>

      {/* Active Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Meus planos ativos</h2>
          <Link
            to="/onboarding"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-medium hover:bg-[#4f52d4] transition"
          >
            <Plus size={18} />
            Novo plano
          </Link>
        </div>

        {plans.length === 0 ? (
          <div className="rounded-2xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm p-12 text-center">
            <p className="text-[#888888] mb-4">Nenhum plano ativo ainda</p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#6366f1] text-white font-medium hover:bg-[#4f52d4] transition"
            >
              Gerar meu primeiro plano
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Link
                key={plan.id}
                to={`/plans/${plan.id}`}
                className="group rounded-2xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm p-6 hover:border-[#333333] transition"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4">
                  <div className="text-xl font-semibold text-white group-hover:text-[#6366f1] transition">
                    {plan.title}
                  </div>
                  <div className="text-sm text-[#888888]">
                    {plan.language} • {plan.level}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#888888]">Progresso</span>
                    <span className="text-white font-semibold">{Math.round(plan.progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#6366f1] to-[#4f52d4] transition-all"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Total de módulos', value: '12' },
          { label: 'Concluídos', value: '4' },
          { label: 'Horas estudadas', value: '24h' }
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl border border-[#1a1a1a] bg-black/50">
            <div className="text-sm text-[#888888] mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
