import { Module } from './Module'

export type StudyPlan = {
  id: number
  studyPlanId?: number
  title: string
  language: string
  level: string
  progress: number
  modules?: Module[]
}