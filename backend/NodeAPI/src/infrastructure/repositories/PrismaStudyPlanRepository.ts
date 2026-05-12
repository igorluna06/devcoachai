import { Language } from "@prisma/client";
import { StudyPlan } from "../../domain/entities/StudyPlan";
import { IStudyPlanRepository } from "../../domain/repositories/IStudyPlanRepository";
import { PrismaStudyPlanMapper } from "../database/prisma/mappers/PrismaStudyPlanMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaStudyPlanRepository implements IStudyPlanRepository{
    
    async create(studyPlan: StudyPlan): Promise<StudyPlan> {
        const created = await prisma.studyPlan.create({
            data: {
                title: studyPlan.getTitle(),
                language: studyPlan.getLanguage() as Language,
                userId: studyPlan.getUserId(),
            }
        });

        return PrismaStudyPlanMapper.toDomain(created);
    }

    findById(id: number): Promise<StudyPlan | null> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: number): Promise<StudyPlan[]> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<StudyPlan[]> {
        throw new Error("Method not implemented.");
    }
    update(studyPlan: StudyPlan): Promise<StudyPlan | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}