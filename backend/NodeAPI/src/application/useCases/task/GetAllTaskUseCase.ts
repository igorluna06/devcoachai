import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";

export class GetAllTaskUseCase{

    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository
    }

    async execute(): Promise<Task[]>{
        return await this.taskRepository.findAll();
    }
}