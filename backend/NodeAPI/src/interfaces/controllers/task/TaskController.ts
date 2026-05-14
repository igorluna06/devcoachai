import { CreateTaskUseCase } from "../../../application/useCases/task/CreateTaskUseCase";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { TaskSuccessMessages } from "../../constants/SucessMessages";
import { GetTaskByIdUseCase } from "../../../application/useCases/task/GetTaskByIdUseCase";
import { GetAllTaskUseCase } from "../../../application/useCases/task/GetAllTaskUseCase";

export class TaskController {

    private createTaskUseCase: CreateTaskUseCase;
    private getTaskByIdUseCase: GetTaskByIdUseCase;
    private getAllTaskUseCase: GetAllTaskUseCase;

    constructor(
        createTaskUseCase: CreateTaskUseCase,
        getTaskByIdUseCase: GetTaskByIdUseCase,
        getAllTaskUseCase: GetAllTaskUseCase
    ) {
        this.createTaskUseCase = createTaskUseCase;
        this.getTaskByIdUseCase = getTaskByIdUseCase;
        this.getAllTaskUseCase = getAllTaskUseCase;
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

    async getAllTask(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const tasks = await this.getAllTaskUseCase.execute();
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    }
}