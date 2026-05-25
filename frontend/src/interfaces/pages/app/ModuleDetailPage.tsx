import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../infrastructure/http/api'
import toast from 'react-hot-toast'
import { Task } from '../../../domain/entities/Task'
import { CheckCircle2, Circle, BookOpen, Code2, Zap, Clock } from 'lucide-react'

export default function ModuleDetailPage() {
  const { moduleId } = useParams()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    if (!moduleId) return
    setLoading(true)
    try {
      const res = await api.get(`/task/module/${moduleId}`)
      setTasks(res.data ?? [])
    } catch (e) {
      toast.error('Erro ao carregar tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [moduleId])

  const toggle = async (t: Task) => {
    try {
      await api.patch(`/task/${t.id}/complete`)
      await load()
      toast.success('Task atualizada')
    } catch (e) {
      toast.error('Erro ao atualizar task')
    }
  }

  const completedTasks = tasks.filter((t) => t.completed).length
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'THEORY':
        return <BookOpen size={18} />
      case 'PRACTICE':
        return <Code2 size={18} />
      case 'PROJECT':
        return <Zap size={18} />
      default:
        return <Circle size={18} />
    }
  }

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'THEORY':
        return 'text-[#3b82f6]'
      case 'PRACTICE':
        return 'text-[#22c55e]'
      case 'PROJECT':
        return 'text-[#f59e0b]'
      default:
        return 'text-[#888888]'
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Tasks do módulo</h1>

      {/* Progress */}
      <div className="p-6 rounded-xl border border-[#1a1a1a] bg-black/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#888888]">Progresso</span>
          <span className="text-white font-semibold">
            {completedTasks}/{tasks.length}
          </span>
        </div>
        <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#4f52d4] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8 text-[#888888]">Carregando tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-[#888888]">Nenhuma task neste módulo</div>
        ) : (
          tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggle(task)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition text-left ${
                task.completed
                  ? 'border-[#22c55e]/50 bg-[#22c55e]/5 hover:border-[#22c55e]'
                  : 'border-[#1a1a1a] bg-black/50 hover:border-[#333333]'
              }`}
            >
              <div className="flex-shrink-0">
                {task.completed ? (
                  <CheckCircle2 size={24} className="text-[#22c55e]" />
                ) : (
                  <Circle size={24} className="text-[#555555]" />
                )}
              </div>

              <div className="flex-1">
                <div className={`font-semibold ${task.completed ? 'line-through text-[#555555]' : 'text-white'}`}>
                  {task.title}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${getTaskTypeColor(task.type)}`}>
                    {getTaskTypeIcon(task.type)}
                    {task.type}
                  </span>
                  {task.estimatedMinutes && (
                    <span className="flex items-center gap-1 text-xs text-[#888888]">
                      <Clock size={14} />
                      {task.estimatedMinutes}m
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
