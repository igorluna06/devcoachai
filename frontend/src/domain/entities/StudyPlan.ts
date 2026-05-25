import { Module } from './Module'

export type StudyPlan = {
  id: string
  title: string
  language: string
  level: string
  progress: number
  modules?: Module[]
}
