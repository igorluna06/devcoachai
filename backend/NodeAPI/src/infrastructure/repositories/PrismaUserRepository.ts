import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaUserRepository implements IUserRepository{
    
    async create(user: User): Promise<User> {
        await prisma.user.create({
            data:{
                name: user.getUserName(),
                birthDate: user.getBirthDate(),
                email: user.getEmail(),
                password: user.getPasswordHash(),
                createdAt: user.getCreatedAt()
            }
        });
        return user; 
    }
    async findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async update(user: User): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}