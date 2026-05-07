import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { PrismaUserMapper } from "../database/prisma/mappers/PrismaUserMapper";
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
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if(!user) {
            return null;
        }
        return PrismaUserMapper.toDomain(user);
    }
    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async update(user: User): Promise<User | null> {

        const id = user.getUserId();

        if(!id) return null;

        await prisma.user.update({
            where: {id},
            data: {
                name: user.getUserName(),
                email: user.getEmail(),
                birthDate: user.getBirthDate()
            }
        });

        return user;
    }
    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users.map(user => PrismaUserMapper.toDomain(user));
    }

}