import { CreateTaskUseCase } from "../../../application/useCases/task/CreateTaskUseCase";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { TaskSuccessMessages } from "../../constants/SucessMessages";
import { GetTaskByIdUseCase } from "../../../application/useCases/task/GetTaskByIdUseCase";
import { GetAllTaskUseCase } from "../../../application/useCases/task/GetAllTaskUseCase";
import { GetTaskByModuleIdUseCase } from "../../../application/useCases/task/GetTaskByModuleIdUseCase";
import { GetTaskByTypeUseCase } from "../../../application/useCases/task/GetTaskByTypeUseCase";
import { TaskType } from "../../../domain/enums/TaskType";
import { DeleteTaskUseCase } from "../../../application/useCases/task/DeleteTaskUseCase";
import { UpdateTaskUseCase } from "../../../application/useCases/task/UpdateTaskUseCase";
import { CompleteTaskUseCase } from "../../../application/useCases/task/CompleteTaskUseCase";
import { GenerateTasksUseCase } from "../../../application/useCases/task/GenerateTasksUseCase";


export class TaskController {

    private createTaskUseCase: CreateTaskUseCase;
    private getTaskByIdUseCase: GetTaskByIdUseCase;
    private getAllTaskUseCase: GetAllTaskUseCase;
    private getTaskByModuleIdUseCase: GetTaskByModuleIdUseCase;
    private getTaskByTypeUseCase: GetTaskByTypeUseCase;
    private deleteTaskUseCase: DeleteTaskUseCase;
    private updateTaskUseCase: UpdateTaskUseCase;
    private completeTaskUseCase: CompleteTaskUseCase;
    private generateTasksUseCase: GenerateTasksUseCase;

    constructor(
        createTaskUseCase: CreateTaskUseCase,
        getTaskByIdUseCase: GetTaskByIdUseCase,
        getAllTaskUseCase: GetAllTaskUseCase,
        getTaskByModuleIdUseCase: GetTaskByModuleIdUseCase,
        getTaskByTypeUseCase: GetTaskByTypeUseCase,
        deleteTaskUseCase: DeleteTaskUseCase,
        updateTaskUseCase: UpdateTaskUseCase,
        completeTaskUseCase: CompleteTaskUseCase,
        generateTasksUseCase: GenerateTasksUseCase
    ) {
        this.createTaskUseCase = createTaskUseCase;
        this.getTaskByIdUseCase = getTaskByIdUseCase;
        this.getAllTaskUseCase = getAllTaskUseCase;
        this.getTaskByModuleIdUseCase = getTaskByModuleIdUseCase;
        this.getTaskByTypeUseCase = getTaskByTypeUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
        this.updateTaskUseCase = updateTaskUseCase;
        this.completeTaskUseCase = completeTaskUseCase;
        this.generateTasksUseCase = generateTasksUseCase;
    }

    async createTask(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const data = req.body;
            const createdTask = await this.createTaskUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({message: TaskSuccessMessages.TASK_CREATED, task: createdTask});
        } catch (error) {
            next(error);
        }
    }

    async generateTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const moduleId: number = Number(req.params.id);
            const tasks = await this.generateTasksUseCase.execute(moduleId);
            res.status(HttpStatusCode.CREATED).json({ message: TaskSuccessMessages.TASK_CREATED, tasks });
        } catch (error) {
            next(error);
        }
    }

    async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const taskId: number = Number(req.params.id);
            const task = await this.getTaskByIdUseCase.execute(taskId);
            res.status(HttpStatusCode.OK).json(task);
        } catch (error) {
            next(error);
        }
    }

    async getAllTask(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const tasks = await this.getAllTaskUseCase.execute();
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async getTaskByModuleId(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const moduleId: number = Number(req.params.moduleId);
            const tasks = await this.getTaskByModuleIdUseCase.execute(moduleId);
            res.status(HttpStatusCode.OK).json(tasks);
        } catch (error) {
            next(error);
        }
    }
    
    async getTaskByType(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const type = req.params.taskType as TaskType;
            const tasks = await this.getTaskByTypeUseCase.execute(type);
            res.status(HttpStatusCode.OK).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const id: number = Number(req.params.id);
            await this.deleteTaskUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({message: TaskSuccessMessages.TASK_DELETED});
        } catch (error) {
            next(error);
        }
    }
    
    async updateTask(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const data = req.body;
            const updatedTask = await this.updateTaskUseCase.execute(data);
            res.status(HttpStatusCode.OK).json({message: TaskSuccessMessages.TASK_UPDATED, studyPlan: updatedTask});
        } catch (error) {
            next(error);
        }
    }

    async completeTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const taskId: number = Number(req.params.id);
        const userId: number = (req as any).user.userId;
        const task = await this.completeTaskUseCase.execute(taskId, userId);
        res.status(HttpStatusCode.OK).json({ message: TaskSuccessMessages.TASK_COMPLETED, task });
    } catch (error) {
        next(error);
    }
}
}