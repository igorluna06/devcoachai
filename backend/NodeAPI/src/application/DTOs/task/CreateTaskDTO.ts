import { TaskType } from "../../../domain/enums/TaskType";

export interface CreateTaskDTO {
    title: string;
    moduleId: number;
    type: TaskType;
    description?: string;
    estimatedMinutes?: number;
}