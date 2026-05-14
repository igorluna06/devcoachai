import { CreateTaskUseCase } from "../../../application/useCases/task/CreateTaskUseCase";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { TaskSuccessMessages } from "../../constants/SucessMessages";
import { GetTaskByIdUseCase } from "../../../application/useCases/task/GetTaskByIdUseCase";

export class TaskController {

    private createTaskUseCase: CreateTaskUseCase;
    private getTaskByIdUseCase: GetTaskByIdUseCase;

    constructor(
        createTaskUseCase: CreateTaskUseCase,
        getTaskByIdUseCase: GetTaskByIdUseCase
    ) {
        this.createTaskUseCase = createTaskUseCase;
        this.getTaskByIdUseCase = getTaskByIdUseCase;
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

    async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const taskId: number = Number(req.params.id);
            const task = await this.getTaskByIdUseCase.execute(taskId);
            res.status(HttpStatusCode.OK).json(task);
        } catch (error) {
            next(error);
        }
    }
}