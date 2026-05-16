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
    async findById(id: number): Promise<StudySession | null> {
        const studySession  = await prisma.studySession.findUnique({
            where:{id}
        });

        if(!studySession) return null;
        return PrismaStudySessionMapper.toDomain(studySession);
    }
    async findAll(): Promise<StudySession[]> {
        const studySessions = await prisma.studySession.findMany();
        return studySessions.map(studySession => PrismaStudySessionMapper.toDomain(studySession));
    }
    async findByUserId(userId: number): Promise<StudySession[]> {
        const studySessions = await prisma.studySession.findMany({
            where: {userId}
        });
        return studySessions.map(studySession => PrismaStudySessionMapper.toDomain(studySession));
    }
    update(studySession: StudySession): Promise<StudySession | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

}