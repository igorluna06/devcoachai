import { Language, Level } from "@prisma/client";
import { StudyPlan } from "../../domain/entities/StudyPlan";
import { IStudyPlanRepository } from "../../domain/repositories/IStudyPlanRepository";
import { PrismaStudyPlanMapper } from "../database/prisma/mappers/PrismaStudyPlanMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaStudyPlanRepository implements IStudyPlanRepository {

    async create(studyPlan: StudyPlan): Promise<StudyPlan> {
        const created = await prisma.studyPlan.create({
            data: {
                title: studyPlan.getTitle(),
                description: studyPlan.getDescription(),
                language: studyPlan.getLanguage() as Language,
                level: studyPlan.getLevel() as Level,
                estimatedDays: studyPlan.getEstimatedDays(),
                isActive: studyPlan.getIsActive(),
                userId: studyPlan.getUserId(),
            }
        });

        return PrismaStudyPlanMapper.toDomain(created);
    }

    async findById(id: number): Promise<StudyPlan | null> {
        const studyPlanFound = await prisma.studyPlan.findUnique({ where: { id } });
        if (!studyPlanFound) return null;
        return PrismaStudyPlanMapper.toDomain(studyPlanFound);
    }

    async findByUserId(userId: number): Promise<StudyPlan[]> {
        const studyPlans = await prisma.studyPlan.findMany({ where: { userId } });
        return studyPlans.map(studyPlan => PrismaStudyPlanMapper.toDomain(studyPlan));
    }

    async findAll(): Promise<StudyPlan[]> {
        const studyPlans = await prisma.studyPlan.findMany();
        return studyPlans.map(studyPlan => PrismaStudyPlanMapper.toDomain(studyPlan));
    }

    async update(studyPlan: StudyPlan): Promise<StudyPlan | null> {
        const id = studyPlan.getStudyPlanId();
        if (!id) return null;

        return prisma.studyPlan.update({
            where: { id },
            data: {
                title: studyPlan.getTitle(),
                description: studyPlan.getDescription(),
                estimatedDays: studyPlan.getEstimatedDays(),
                isActive: studyPlan.getIsActive(),
            }
        }).then(result => PrismaStudyPlanMapper.toDomain(result));
    }

    async delete(id: number): Promise<void> {
        await prisma.studyPlan.delete({ where: { id } });
    }
}