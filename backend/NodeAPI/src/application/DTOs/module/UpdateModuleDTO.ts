export interface UpdateModuleDTO {
    moduleId: number;
    title?: string;
    description?: string;
    estimatedHours?: number;
    isCompleted?: boolean;
}