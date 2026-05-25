import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../../infrastructure/http/api'
import { Module } from '../../../domain/entities/Module'
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react'

export default function StudyPlanDetailPage() {
  const { planId } = useParams()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!planId) return
    setLoading(true)
    api
      .get(`/module/studyplan/${planId}`)
      .then((res) => setModules(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [planId])

  const completedModules = modules.filter((m) => m.isCompleted).length
  const progress = modules.length > 0 ? (completedModules / modules.length) * 100 : 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Módulos do plano</h1>
        <Link
          to={`/progress/${planId}`}
          className="px-4 py-2 rounded-lg border border-[#1a1a1a] text-[#888888] hover:text-white hover:border-[#333333] transition text-sm"
        >
          Ver progresso detalhado
        </Link>
      </div>

      {/* Overall Progress */}
      <div className="p-6 rounded-xl border border-[#1a1a1a] bg-black/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#888888]">Progresso geral</span>
          <span className="text-white font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#4f52d4] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {modules.length === 0 ? (
          <div className="text-center py-8 text-[#888888]">Carregando módulos...</div>
        ) : (
          modules.map((m, i) => (
            <Link
              key={m.id}
              to={m.isLocked ? '#' : `/plans/${planId}/modules/${m.id}`}
              className={`group flex items-center gap-4 p-4 rounded-xl border-2 transition ${
                m.isLocked
                  ? 'border-[#1a1a1a] bg-black/30 opacity-50 cursor-not-allowed'
                  : m.isCompleted
                  ? 'border-[#22c55e]/50 bg-[#22c55e]/5 hover:border-[#22c55e]'
                  : 'border-[#1a1a1a] bg-black/50 hover:border-[#333333]'
              }`}
            >
              <div className="flex-shrink-0">
                {m.isCompleted ? (
                  <CheckCircle2 size={24} className="text-[#22c55e]" />
                ) : m.isLocked ? (
                  <Lock size={24} className="text-[#555555]" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-[#6366f1]" />
                )}
              </div>

              <div className="flex-1">
                <div className={`font-semibold transition ${m.isLocked ? 'text-[#555555]' : 'text-white group-hover:text-[#6366f1]'}`}>
                  {m.title}
                </div>
                {m.progress !== undefined && (
                  <div className="text-xs text-[#888888] mt-1">Progresso: {m.progress}%</div>
                )}
              </div>

              {!m.isLocked && <ArrowRight size={20} className="text-[#888888] group-hover:text-[#6366f1] transition" />}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
