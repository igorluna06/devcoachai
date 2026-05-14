export interface UpdateStudyPlanDTO {
    studyPlanId: number;
    title?: string;
    description?: string;
    estimatedDays?: number;
    isActive?: boolean;
}