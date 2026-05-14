import { validateTitle } from "../../utils/validators/titleValidator";

export class Task{

    private taskId: number | undefined;
    private title: string;
    private description: string | undefined;
    private completed: boolean;
    private moduleId: number;

    private constructor(title: string, moduleId: number, description?: string, completed: boolean = false, taskId?: number) {
        this.title = title;
        this.moduleId = moduleId;
        this.description = description;
        this.completed = completed;
        this.taskId = taskId;
    }

    static create(title: string, moduleId: number, description?: string, completed: boolean = false, taskId?: number): Task {
        return new Task(title, moduleId, description, completed, taskId);
    }

    static restore(taskId: number, title: string, moduleId: number, description?: string, completed: boolean = false): Task {
        return new Task(title, moduleId, description, completed, taskId);
    }

    getTaskId(): number | undefined { return this.taskId; }
    getTitle(): string { return this.title; }
    getDescription(): string | undefined { return this.description; }
    isCompleted(): boolean { return this.completed; }
    getModuleId(): number { return this.moduleId; }

    setTitle(title: string): void { 
        validateTitle(title);
        this.title = title; 
    }

    setDescription(description: string): void { 
        this.description = description; 
    }
}