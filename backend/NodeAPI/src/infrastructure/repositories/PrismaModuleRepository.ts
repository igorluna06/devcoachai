import { Module } from "../../domain/entities/Module";
import { IModuleRepository } from "../../domain/repositories/IModuleRepository";

export class PrismaModuleRepository implements IModuleRepository {
    getModuleById(id: number): Promise<Module | null> {
        throw new Error("Method not implemented.");
    }
    getAllModules(): Promise<Module[]> {
        throw new Error("Method not implemented.");
    }
    getModuleByStudyPlanId(studyPlanId: number): Promise<Module[]> {
        throw new Error("Method not implemented.");
    }
    create(moduleData: Module): Promise<Module> {
        throw new Error("Method not implemented.");
    }
    update(id: number, moduleData: Module): Promise<Module | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}