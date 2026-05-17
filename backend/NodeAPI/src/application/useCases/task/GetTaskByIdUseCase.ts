import { Task } from "../../../domain/entities/Task";
import { TaskNotFound} from "../../../domain/errors/TaskError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";

export class GetTaskByIdUseCase{

    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository =  taskRepository;
    }

    async execute(id: number): Promise<Task>{

        if(!id || id <= 0){
            throw new InvalidIdError();
        }

        const taskFound = await this.taskRepository.findById(id);

        if(!taskFound){
            throw new TaskNotFound();
        }

        return taskFound;
    }

}