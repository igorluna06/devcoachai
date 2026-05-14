import { validateDescription } from "../../utils/validators/descriptionValidator";
import { validateDifficultyRating } from "../../utils/validators/difficultyRatingValidator";
import { validateTaskType } from "../../utils/validators/taskTypeValidator";
import { validateTitle } from "../../utils/validators/titleValidator";
import { DifficultyRating } from "../enums/DifficultyRating";
import { TaskType } from "../enums/TaskType";
import { InvalidEstimatedMinutesError } from "../errors/TaskError";

export class Task {

    private taskId: number | undefined;
    private title: string;
    private description: string | null;
    private type: TaskType;
    private completed: boolean;
    private estimatedMinutes: number | null;
    private difficultyRating: DifficultyRating | null;
    private moduleId: number;

    private constructor(
        title: string,
        moduleId: number,
        type: TaskType,
        description: string | null = null,
        completed: boolean = false,
        estimatedMinutes: number | null = null,
        difficultyRating: DifficultyRating | null = null,
        taskId?: number
    ) {
        this.title = title;
        this.moduleId = moduleId;
        this.description = description;
        this.type = type;
        this.completed = completed;
        this.estimatedMinutes = estimatedMinutes;
        this.difficultyRating = difficultyRating;
        this.taskId = taskId;
    }

    static create(
        title: string,
        moduleId: number,
        type: TaskType,
        description?: string | null,
        estimatedMinutes?: number | null,
    ): Task {
        validateTitle(title);
        validateTaskType(type);
        if (description) validateDescription(description);
        if (estimatedMinutes !== undefined && estimatedMinutes !== null) {
            if (estimatedMinutes <= 0) throw new InvalidEstimatedMinutesError();
        }
        return new Task(title, moduleId, type, description, false, estimatedMinutes);
    }

    static restore(
        taskId: number,
        title: string,
        moduleId: number,
        type: TaskType,
        description: string | null = null,
        completed: boolean = false,
        estimatedMinutes: number | null = null,
        difficultyRating: DifficultyRating | null = null
    ): Task {
        return new Task(title, moduleId, type, description, completed, estimatedMinutes, difficultyRating, taskId);
    }

    getTaskId(): number | undefined { return this.taskId; }
    getTitle(): string { return this.title; }
    getDescription(): string | null { return this.description; }
    getIsCompleted(): boolean { return this.completed; }
    getModuleId(): number { return this.moduleId; }
    getType(): TaskType { return this.type; }
    getEstimatedMinutes(): number | null { return this.estimatedMinutes; }
    getDifficultyRating(): DifficultyRating | null { return this.difficultyRating; }

    setTitle(title: string): void {
        validateTitle(title);
        this.title = title;
    }

    setDescription(description: string): void {
        validateDescription(description);
        this.description = description;
    }

    setType(type: TaskType): void {
        validateTaskType(type);
        this.type = type;
    }

    setEstimatedMinutes(minutes: number): void {
        if (minutes <= 0) throw new InvalidEstimatedMinutesError();
        this.estimatedMinutes = minutes;
    }

    setDifficultyRating(rating: DifficultyRating): void {
        validateDifficultyRating(rating);
        this.difficultyRating = rating;
    }

    complete(): void { this.completed = true; }
    uncomplete(): void { this.completed = false; }
}