import React, { createContext, useContext, useState } from 'react'
import { StudyPlan } from '../../domain/entities/StudyPlan'
import api from '../../infrastructure/http/api'
import toast from 'react-hot-toast'

type StudyPlanContextType = {
  plans: StudyPlan[]
  loading: boolean
  fetchPlans: (userId: string) => Promise<void>
  generatePlan: (payload: any) => Promise<StudyPlan>
}

const StudyPlanContext = createContext<StudyPlanContextType | undefined>(undefined)

export const StudyPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<StudyPlan[]>([])
  const [loading, setLoading] = useState(false)

  const fetchPlans = async (userId: string) => {
    setLoading(true)
    try {
      const res = await api.get(`/studyplan/user/${userId}`)
      setPlans(res.data ?? [])
    } catch (e) {
      toast.error('Failed to load study plans')
    } finally {
      setLoading(false)
    }
  }

  const generatePlan = async (payload: any) => {
    setLoading(true)
    try {
      const res = await api.post('/studyplan/generate', payload)
      const plan: StudyPlan = res.data
      setPlans((p) => [plan, ...p])
      toast.success('Study plan generated')
      return plan
    } catch (e) {
      toast.error('Failed to generate plan')
      throw e
    } finally {
      setLoading(false)
    }
  }

  return (
    <StudyPlanContext.Provider value={{ plans, loading, fetchPlans, generatePlan }}>
      {children}
    </StudyPlanContext.Provider>
  )
}

export const useStudyPlanContext = () => {
  const ctx = useContext(StudyPlanContext)
  if (!ctx) throw new Error('useStudyPlanContext must be used inside StudyPlanProvider')
  return ctx
}
