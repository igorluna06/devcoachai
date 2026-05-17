import { UserOnboarding } from "../../domain/entities/UserOnboarding";
import { IUserOnboardingRepository } from "../../domain/repositories/IUserOnboardingRepository";
import { PrismaUserOnboardingMapper } from "../database/prisma/mappers/PrismaUserOnboardingMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaUserOnboardingRepository implements IUserOnboardingRepository {

    async create(onboarding: UserOnboarding): Promise<UserOnboarding> {
        const created = await prisma.userOnboarding.create({
            data: {
                goal: onboarding.getGoal(),
                preference: onboarding.getPreference(),
                region: onboarding.getRegion(),
                experienceLevel: onboarding.getExperienceLevel(),
                recommendedLanguage: onboarding.getRecommendedLanguage(),
                recommendedStack: onboarding.getRecommendedStack(),
                userId: onboarding.getUserId(),
                completedAt: onboarding.getCompletedAt(),
            }
        });
        return PrismaUserOnboardingMapper.toDomain(created);
    }

    async findById(id: number): Promise<UserOnboarding | null> {
        const found = await prisma.userOnboarding.findUnique({ where: { id } });
        if (!found) return null;
        return PrismaUserOnboardingMapper.toDomain(found);
    }

    async findByUserId(userId: number): Promise<UserOnboarding | null> {
        const found = await prisma.userOnboarding.findUnique({ where: { userId } });
        if (!found) return null;
        return PrismaUserOnboardingMapper.toDomain(found);
    }

    async update(onboarding: UserOnboarding): Promise<UserOnboarding | null> {
        const id = onboarding.getOnboardingId();
        if (!id) return null;
        const updated = await prisma.userOnboarding.update({
            where: { id },
            data: {
                completedAt: onboarding.getCompletedAt(),
            }
        });
        return PrismaUserOnboardingMapper.toDomain(updated);
    }

    async delete(id: number): Promise<void> {
        await prisma.userOnboarding.delete({ where: { id } });
    }
}