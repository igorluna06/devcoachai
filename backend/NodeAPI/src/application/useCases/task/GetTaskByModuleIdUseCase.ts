import { Task } from "../../../domain/entities/Task";
import { ModuleNotFoundError } from "../../../domain/errors/ModuleError";
import { TaskNotFoundError } from "../../../domain/errors/TaskError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";

export class GetTaskByModuleIdUseCase{

    private taskRepository: ITaskRepository;
    private moduleRepository: IModuleRepository;

    constructor(taskRepository: ITaskRepository, moduleRepository: IModuleRepository){
        this.taskRepository = taskRepository;
        this.moduleRepository = moduleRepository;
    }

    async execute(moduleId: number): Promise<Task[]>{
        
        if(!moduleId || moduleId <= 0){
            throw new InvalidIdError();
        }

        const module = await this.moduleRepository.findById(moduleId);

        if(!module){
            throw new ModuleNotFoundError();
        }

        const task = await this.taskRepository.findByModuleId(moduleId);

        if(!task){
            throw new TaskNotFoundError();
        }

        return task;
    }
}