import React, { createContext, useContext, useState } from 'react'
import { StudyPlan } from '../../domain/entities/StudyPlan'
import api from '../../infrastructure/http/api'
import toast from 'react-hot-toast'
import { mapStudyPlan } from '../../infrastructure/mappers/StudyPlanMapper'

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
            const data = res.data ?? []
            setPlans(Array.isArray(data) ? data.map(mapStudyPlan) : [])
        } catch (e) {
            toast.error('Erro ao carregar planos de estudo.')
        } finally {
            setLoading(false)
        }
    }

    const generatePlan = async (payload: any) => {
        setLoading(true)
        try {
            const res = await api.post('/studyplan/generate', payload)
            const plan = mapStudyPlan(res.data.studyPlan ?? res.data)
            setPlans((p) => [plan, ...p])
            toast.success('Plano de estudos gerado com sucesso!')
            return plan
        } catch (e) {
            toast.error('Erro ao gerar plano.')
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