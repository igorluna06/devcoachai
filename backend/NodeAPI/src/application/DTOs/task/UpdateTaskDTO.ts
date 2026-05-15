export interface UpdateTaskDTO{
    taskId: number,
    title?: string,
    description?: string,
    completed?: boolean,
    estimatedMinutes?: number
}