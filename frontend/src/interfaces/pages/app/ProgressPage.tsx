import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../infrastructure/http/api'
import { TrendingUp, AlertCircle, Lightbulb } from 'lucide-react'

export default function ProgressPage() {
  const { planId } = useParams()
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    if (!planId) return
    api.get(`/studyplan/${planId}/analysis`).then((res) => setSummary(res.data)).catch(() => {})
  }, [planId])

  const progress = summary?.progress ?? 0
  const getStatus = (p: number) => {
    if (p < 20) return { label: 'Começando', color: 'bg-[#ef4444]' }
    if (p < 50) return { label: 'Em progresso', color: 'bg-[#f59e0b]' }
    if (p < 90) return { label: 'Quase lá', color: 'bg-[#3b82f6]' }
    return { label: 'Concluído', color: 'bg-[#22c55e]' }
  }

  const status = getStatus(progress)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Seu progresso</h1>

      {/* Overall Progress */}
      <div className="p-8 rounded-2xl border border-[#1a1a1a] bg-gradient-to-br from-black/50 to-black/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[#888888] text-sm mb-2">Progresso geral</div>
            <div className="text-6xl font-bold text-white">{Math.round(progress)}%</div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${status.color} text-white font-semibold`}>
              {status.label}
            </div>
          </div>
        </div>
        <div className="w-full h-4 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#4f52d4] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Módulos totais', value: '12' },
          { label: 'Módulos concluídos', value: '4' },
          { label: 'Horas estudadas', value: '24h' }
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl border border-[#1a1a1a] bg-black/50">
            <div className="text-[#888888] text-sm mb-2">{stat.label}</div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Sugestões da IA</h2>
        <div className="space-y-3">
          {[
            { icon: Lightbulb, text: 'Continue com o módulo de React. Você está indo bem!' },
            { icon: TrendingUp, text: 'Pratique mais exercícios de TypeScript para solidificar os conceitos.' },
            { icon: AlertCircle, text: 'Você está tendo dificuldade com async/await. Revise esta parte.' }
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex gap-3 p-4 rounded-xl border border-[#1a1a1a] bg-black/50">
                <Icon size={20} className="text-[#6366f1] flex-shrink-0 mt-0.5" />
                <p className="text-[#888888]">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
