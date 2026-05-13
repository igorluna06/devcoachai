import { Module } from "../../domain/entities/Module";
import { IModuleRepository } from "../../domain/repositories/IModuleRepository";
import { PrismaModuleMapper } from "../database/prisma/mappers/PrismaModuleMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaModuleRepository implements IModuleRepository {
    async getModuleById(id: number): Promise<Module | null> {
        const moduleFound = await prisma.module.findUnique({
            where: { id }
        });
        if(!moduleFound) return null;
        return PrismaModuleMapper.toDomain(moduleFound);
    }
    getAllModules(): Promise<Module[]> {
        throw new Error("Method not implemented.");
    }
    getModuleByStudyPlanId(studyPlanId: number): Promise<Module[]> {
        throw new Error("Method not implemented.");
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
    update(id: number, module: Module): Promise<Module | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}