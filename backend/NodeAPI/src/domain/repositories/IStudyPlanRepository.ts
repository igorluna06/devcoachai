import { StudyPlan } from "../entities/StudyPlan";

export interface IStudyPlanRepository{
    create(studyPlan: StudyPlan): Promise<StudyPlan>;
    findById(id: number): Promise<StudyPlan | null>;
    findByUserId(userId: number): Promise<StudyPlan[]>;
    findAll(): Promise<StudyPlan[]>;
    update(studyPlan: StudyPlan): Promise<StudyPlan | null>;
    delete(id: number): Promise<void>;
}