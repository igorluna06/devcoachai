import { Achievement } from "../../domain/entities/Achievement";
import { IAchievementRepository } from "../../domain/repositories/IAchievementRepository";
import { PrismaAchievementMapper } from "../database/prisma/mappers/PrismaAchievementMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaAchievementRepository implements IAchievementRepository {

    async create(achievement: Achievement): Promise<Achievement> {
        const created = await prisma.achievement.create({
            data: {
                title: achievement.getTitle(),
                description: achievement.getDescription(),
                type: achievement.getType(),
                userId: achievement.getUserId(),
                unlockedAt: achievement.getUnlockedAt(),
            }
        });
        return PrismaAchievementMapper.toDomain(created);
    }

    async findById(id: number): Promise<Achievement | null> {
        const found = await prisma.achievement.findUnique({ where: { id } });
        if (!found) return null;
        return PrismaAchievementMapper.toDomain(found);
    }

    async findAll(): Promise<Achievement[]> {
        const achievements = await prisma.achievement.findMany();
        return achievements.map(a => PrismaAchievementMapper.toDomain(a));
    }

    async findByUserId(userId: number): Promise<Achievement[]> {
        const achievements = await prisma.achievement.findMany({ where: { userId } });
        return achievements.map(a => PrismaAchievementMapper.toDomain(a));
    }

    async delete(id: number): Promise<void> {
        await prisma.achievement.delete({ where: { id } });
    }
}