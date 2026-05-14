import { Task } from "../entities/Task";

export interface ITaskRepository{
    create(task: Task): Promise<Task>;
    findById(taskId: number): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    findByModuleId(moduleId: number): Promise<Task[]>;
    findByType(type: string): Promise<Task[]>;
    findByDifficultyRating(difficultyRating: number): Promise<Task[]>;
    update(task: Task): Promise<void>;
    delete(taskId: number): Promise<void>;
}