import { StudySession } from "../../domain/entities/StudySession";
import { IStudySessionRepository } from "../../domain/repositories/IStudySessionRepository";
import { PrismaStudySessionMapper } from "../database/prisma/mappers/PrismaStudySessionMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaStudySessionRepository implements IStudySessionRepository{
    async create(studySession: StudySession): Promise<StudySession> {
        const studyPlanCreated = await prisma.studySession.create({
            data:{
                date: studySession.getDateSession(),
                minutesStudied: studySession.getMinutesStudied(),
                tasksCompleted: studySession.getTasksCompleted(),
                userId: studySession.getUserId()
            }
        });
        return PrismaStudySessionMapper.toDomain(studyPlanCreated);
    }
    findById(id: number): Promise<StudySession | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<StudySession[]> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: number): Promise<StudySession[]> {
        throw new Error("Method not implemented.");
    }
    update(studySession: StudySession): Promise<StudySession | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

}