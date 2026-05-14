import { validateTitle } from "../../utils/validators/titleValidator";
import { validateOrder } from "../../utils/validators/validateOrder";
import { validateDescription } from "../../utils/validators/descriptionValidator";
import { InvalidEstimatedDaysError } from "../errors/StudyPlanError";

export class Module {

    private moduleId: number | undefined;
    private moduleTitle: string;
    private order: number;
    private studyPlanId: number;
    private description: string | null;
    private isCompleted: boolean;
    private estimatedHours: number | null;

    private constructor(
        moduleTitle: string,
        order: number,
        studyPlanId: number,
        moduleId?: number,
        description: string | null = null,
        isCompleted: boolean = false,
        estimatedHours: number | null = null
    ) {
        this.moduleId = moduleId;
        this.moduleTitle = moduleTitle;
        this.order = order;
        this.studyPlanId = studyPlanId;
        this.description = description;
        this.isCompleted = isCompleted;
        this.estimatedHours = estimatedHours;
    }

    static create(
        moduleTitle: string,
        order: number,
        studyPlanId: number,
        description?: string | null,
        estimatedHours?: number | null
    ): Module {
        validateTitle(moduleTitle);
        validateOrder(order);
        if (description) validateDescription(description);
        return new Module(moduleTitle, order, studyPlanId, undefined, description, false, estimatedHours);
    }

    static restore(
        moduleTitle: string,
        order: number,
        studyPlanId: number,
        moduleId: number,
        description: string | null = null,
        isCompleted: boolean = false,
        estimatedHours: number | null = null
    ): Module {
        return new Module(moduleTitle, order, studyPlanId, moduleId, description, isCompleted, estimatedHours);
    }

    getModuleId(): number | undefined { return this.moduleId; }
    getModuleTitle(): string { return this.moduleTitle; }
    getOrder(): number { return this.order; }
    getStudyPlanId(): number { return this.studyPlanId; }
    getDescription(): string | null { return this.description; }
    getIsCompleted(): boolean { return this.isCompleted; }
    getEstimatedHours(): number | null { return this.estimatedHours; }

    setModuleTitle(moduleTitle: string): void {
        validateTitle(moduleTitle);
        this.moduleTitle = moduleTitle;
    }

    setOrder(order: number): void {
        validateOrder(order);
        this.order = order;
    }

    setDescription(description: string): void {
        validateDescription(description);
        this.description = description;
    }

    setEstimatedHours(hours: number): void {
        if (hours <= 0) throw new InvalidEstimatedDaysError();
        this.estimatedHours = hours;
    }

    complete(): void { this.isCompleted = true; }
    uncomplete(): void { this.isCompleted = false; }
}