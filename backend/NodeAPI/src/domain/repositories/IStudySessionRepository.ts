import { StudySession } from "../entities/StudySession";

export interface IStudySessionRepository{
    create(studySession: StudySession): Promise<StudySession>;
    findById(id: number): Promise<StudySession | null>;
    findAll(): Promise<StudySession[]>;
    findByUserId(userId: number): Promise<StudySession[]>;
    delete(id: number): Promise<void>;
}