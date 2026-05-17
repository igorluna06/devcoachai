import { Task } from "../../../domain/entities/Task";
import { ModuleNotFound } from "../../../domain/errors/ModuleError";
import { InvalidEstimatedMinutesError } from "../../../domain/errors/TaskError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { validateDescription } from "../../../utils/validators/descriptionValidator";
import { validateTaskType } from "../../../utils/validators/taskTypeValidator";
import { validateTitle } from "../../../utils/validators/titleValidator";
import { CreateTaskDTO } from "../../DTOs/task/CreateTaskDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateTaskUseCase {

    private taskRepository: ITaskRepository;
    private moduleRepository: IModuleRepository;

    constructor(taskRepository: ITaskRepository, moduleRepository: IModuleRepository) {
        this.taskRepository = taskRepository;
        this.moduleRepository = moduleRepository;
    }

    async execute(data: CreateTaskDTO): Promise<Task> {

        if(!data.title || !data.moduleId || !data.type) {
            throw new MissingRequiredFieldsError();
        }

        if(!Number.isInteger(data.moduleId) || data.moduleId <= 0) {
            throw new InvalidIdError();
        }

        const module = await this.moduleRepository.findById(data.moduleId);

        if (!module) {
            throw new ModuleNotFound();
        }

        validateTitle(data.title);

        validateTaskType(data.type);

        if(data.description) {
            validateDescription(data.description);
        }

        if (data.estimatedMinutes !== undefined) {
            if (!Number.isInteger(data.estimatedMinutes) || data.estimatedMinutes <= 0) {
                throw new InvalidEstimatedMinutesError();
            }
        }

        return this.taskRepository.create(Task.create(
            data.title,
            data.moduleId,
            data.type,
            data.description,
            data.estimatedMinutes,
        ));
    }
}