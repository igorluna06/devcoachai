export type TaskType = 'THEORY' | 'PRACTICE' | 'PROJECT'

export type Task = {
  id: number
  title: string
  type: TaskType
  estimatedMinutes?: number
  completed: boolean
}
