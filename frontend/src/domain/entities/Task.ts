export type TaskType = 'THEORY' | 'PRACTICE' | 'PROJECT'

export type Task = {
  id: string
  title: string
  type: TaskType
  estimatedMinutes?: number
  completed: boolean
}
