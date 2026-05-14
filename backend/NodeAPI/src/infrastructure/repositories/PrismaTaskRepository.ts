import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { PrismaTaskMapper } from "../database/prisma/mappers/PrismaTaskMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaTaskRepository implements ITaskRepository {
    async create(task: Task): Promise<Task> {
        const taskCreated = await prisma.task.create({
            data: {
                title: task.getTitle(),
                moduleId: task.getModuleId(),
                type: task.getType(),
                description: task.getDescription(),
                isCompleted: task.getIsCompleted(), 
                estimatedMinutes: task.getEstimatedMinutes(),
                difficultyRating: task.getDifficultyRating(),
            }
        });
        return PrismaTaskMapper.toDomain(taskCreated);
    }
    async findById(id: number): Promise<Task | null> {
        const task = await prisma.task.findUnique({
            where:{id}
        });
        if(!task){
            return null;
        }
        return PrismaTaskMapper.toDomain(task);
    }
    async findAll(): Promise<Task[]> {
        const tasks = await prisma.task.findMany();
        return tasks.map(task => PrismaTaskMapper.toDomain(task));
    }
    findByModuleId(moduleId: number): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    findByType(type: string): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    findByDifficultyRating(difficultyRating: number): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    update(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(taskId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}