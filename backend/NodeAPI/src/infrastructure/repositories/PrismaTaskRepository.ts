
import { Task } from "../../domain/entities/Task";
import { TaskType } from "../../domain/enums/TaskType";
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
    async findByModuleId(moduleId: number): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            where:{moduleId}
        });
        return tasks.map(task => PrismaTaskMapper.toDomain(task));
    }
    async findByType(type: TaskType): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            where: {type}
        });

        return tasks.map(task => PrismaTaskMapper.toDomain(task));
    }
    update(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<void> {
        await prisma.task.delete({
            where: {id}
        });
    }
    
}