export interface CreateModuleDTO {
    moduleTitle: string;
    order: number;
    studyPlanId: number;
    description?: string;
    estimatedHours?: number;
}