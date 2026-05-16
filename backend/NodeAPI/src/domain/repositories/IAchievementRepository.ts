import { Achievement } from "../entities/Achievement";

export interface IAchievementRepository {
    create(achievement: Achievement): Promise<Achievement>;
    findById(id: number): Promise<Achievement | null>;
    findAll(): Promise<Achievement[]>;
    findByUserId(userId: number): Promise<Achievement[]>;
    delete(id: number): Promise<void>;
}