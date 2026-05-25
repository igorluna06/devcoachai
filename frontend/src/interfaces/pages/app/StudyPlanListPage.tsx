import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, BookOpen } from 'lucide-react'
import { useStudyPlanContext } from '../../../application/contexts/StudyPlanContext'

export default function StudyPlanListPage() {
  const { plans, fetchPlans } = useStudyPlanContext()

  useEffect(() => {
    const id = localStorage.getItem('userId')
    if (id) fetchPlans(id)
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Meus planos</h1>
        <Link
          to="/onboarding"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6366f1] text-white font-medium hover:bg-[#4f52d4] transition"
        >
          <Plus size={18} />
          Novo plano
        </Link>
      </div>

      {plans.length === 0 ? (
        <div className="rounded-2xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm p-12 text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-[#555555]" />
          <p className="text-[#888888] mb-4">Nenhum plano criado ainda</p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#6366f1] text-white font-medium hover:bg-[#4f52d4] transition"
          >
            Criar meu primeiro plano
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Link
              key={p.id}
              to={`/plans/${p.id}`}
              className="group rounded-2xl border border-[#1a1a1a] bg-black/50 backdrop-blur-sm p-6 hover:border-[#6366f1] hover:bg-black/70 transition"
            >
              <div className="mb-4">
                <div className="text-xl font-semibold text-white group-hover:text-[#6366f1] transition">{p.title}</div>
                <div className="text-sm text-[#888888]">
                  {p.language} • {p.level}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#888888]">Progresso</span>
                  <span className="text-white font-semibold">{Math.round(p.progress)}%</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6366f1] to-[#4f52d4]"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
