import { Task } from "../../../../domain/entities/Task";
import { Task as PrismaTask, TaskType as PrismaTaskType, DifficultyRating as PrismaDifficultyRating } from "@prisma/client";
import { TaskType } from "../../../../domain/enums/TaskType";
import { DifficultyRating } from "../../../../domain/enums/DifficultyRating";

const taskTypeMap: Record<PrismaTaskType, TaskType> = {
    THEORY: TaskType.THEORY,
    PRACTICE: TaskType.PRACTICE,
    PROJECT: TaskType.PROJECT,
};

const difficultyRatingMap: Record<PrismaDifficultyRating, DifficultyRating> = {
    EASY: DifficultyRating.EASY,
    MEDIUM: DifficultyRating.MEDIUM,
    HARD: DifficultyRating.HARD,
};

export class PrismaTaskMapper {
    static toDomain(prismaTask: PrismaTask): Task {
        return Task.restore(
            prismaTask.id,
            prismaTask.title,
            prismaTask.moduleId,
            taskTypeMap[prismaTask.type],
            prismaTask.description,
            prismaTask.isCompleted,
            prismaTask.estimatedMinutes,
            prismaTask.difficultyRating ? difficultyRatingMap[prismaTask.difficultyRating] : null
        );
    }
}