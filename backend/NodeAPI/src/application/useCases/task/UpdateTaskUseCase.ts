import { Task } from "../../../domain/entities/Task";
import { InvalidEstimatedMinutesError, TaskNotFound } from "../../../domain/errors/TaskError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { validateDescription } from "../../../utils/validators/descriptionValidator";
import { validateTitle } from "../../../utils/validators/titleValidator";
import { UpdateTaskDTO } from "../../DTOs/task/UpdateTaskDTO";

export class UpdateTaskUseCase{

    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async execute(data: UpdateTaskDTO): Promise<Task>{

        if (!data.taskId || data.taskId <= 0) {
            throw new InvalidIdError();
        }

        const taskFound = await this.taskRepository.findById(data.taskId);

        if(!taskFound){
            throw new TaskNotFound();
        }

        if(data.title !== undefined){
            validateTitle(data.title);
            taskFound.setTitle(data.title);
        }

        if(data.description !== undefined){
            validateDescription(data.description);
            taskFound.setDescription(data.description);
        }

        if(data.completed !== undefined){
            taskFound.complete();
        }

        if(data.estimatedMinutes !== undefined){
            if(data.estimatedMinutes <= 0){
                throw new InvalidEstimatedMinutesError();
            }

            taskFound.setEstimatedMinutes(data.estimatedMinutes);
        }

        const updatedTask = await this.taskRepository.update(taskFound);

        if(!updatedTask){
            throw new TaskNotFound();
        }

        return updatedTask;

    }
}