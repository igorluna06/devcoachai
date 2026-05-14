import { TaskType } from "@prisma/client";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import { InvalidTaskTypeError } from "../../../domain/errors/TaskError";
import { validateTaskType } from "../../../utils/validators/taskTypeValidator";

export class GetTaskByTypeUseCase{

    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async execute(type: TaskType): Promise<Task[]>{

        if(!type){
            throw new InvalidTaskTypeError();
        }

        validateTaskType(type);

        const tasks = await this.taskRepository.findByType(type);

        return tasks;
    }
}