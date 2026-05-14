import { TaskType } from "../../domain/enums/TaskType";
import { InvalidTaskTypeError } from "../../domain/errors/TaskError";

export function validateTaskType(type: string): void {
    if (!Object.values(TaskType).includes(type as TaskType)) {
        throw new InvalidTaskTypeError();
    }
}