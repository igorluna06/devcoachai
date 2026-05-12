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

    async findById(id: number): Promise<StudyPlan | null> {
        const studyPlanFound = await prisma.studyPlan.findUnique(
            {where:{id}}
        )
        if(!studyPlanFound) return null;
        return PrismaStudyPlanMapper.toDomain(studyPlanFound);
    }
    findByUserId(userId: number): Promise<StudyPlan[]> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<StudyPlan[]> {
        const studyPlans = await prisma.studyPlan.findMany();
        return studyPlans.map(studyPlan => PrismaStudyPlanMapper.toDomain(studyPlan));
    }
    update(studyPlan: StudyPlan): Promise<StudyPlan | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<void> {
        await prisma.studyPlan.delete({
            where:{id}
        })
    }

}