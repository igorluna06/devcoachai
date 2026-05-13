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
    createModule(moduleData: Module): Promise<Module> {
        throw new Error("Method not implemented.");
    }
    updateModule(id: number, moduleData: Module): Promise<Module | null> {
        throw new Error("Method not implemented.");
    }
    deleteModule(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}