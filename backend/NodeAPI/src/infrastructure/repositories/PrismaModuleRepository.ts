import { Module } from "../../domain/entities/Module";
import { IModuleRepository } from "../../domain/repositories/IModuleRepository";
import { PrismaModuleMapper } from "../database/prisma/mappers/PrismaModuleMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaModuleRepository implements IModuleRepository {
    async findById(id: number): Promise<Module | null> {
        const moduleFound = await prisma.module.findUnique({
            where: { id }
        });
        if(!moduleFound) return null;
        return PrismaModuleMapper.toDomain(moduleFound);
    }
    async findAll(): Promise<Module[]> {
        const modules = await prisma.module.findMany();
        return modules.map(module => PrismaModuleMapper.toDomain(module));
    }
    async findByStudyPlanId(studyPlanId: number): Promise<Module[]> {
        const modules = await prisma.module.findMany({
            where: { studyPlanId }
        });
        return modules.map(module => PrismaModuleMapper.toDomain(module));
    }
    async create(module: Module): Promise<Module> {
        const moduleCreated = await prisma.module.create({
            data: {
                title: module.getModuleTitle(),
                order: module.getOrder(),
                studyPlanId: module.getStudyPlanId()
            }
        });
        return PrismaModuleMapper.toDomain(moduleCreated);
    }
    async update(module: Module): Promise<Module | null> {
        const id = module.getModuleId();

        if(!id) return null;

        const moduleUpdated = await prisma.module.update({
            where: { id },
            data: {
                title: module.getModuleTitle(),
            }
        });

        return PrismaModuleMapper.toDomain(moduleUpdated);
    }
    async delete(id: number): Promise<void> {
        await prisma.module.delete({
            where: { id }
        });
    }
}