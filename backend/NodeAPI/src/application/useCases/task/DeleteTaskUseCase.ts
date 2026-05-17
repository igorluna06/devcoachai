import { TaskNotFound } from "../../../domain/errors/TaskError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";

export class DeleteTaskUseCase{

    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async execute(id: number): Promise<void>{

        if(!id || id <= 0){
            throw new InvalidIdError();
        }

        const taskFound = await this.taskRepository.findById(id);

        if(!taskFound){
            throw new TaskNotFound();
        }

        await this.taskRepository.delete(id);
    }
}