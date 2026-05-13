import { Module } from "../entities/Module";

export interface IModuleRepository {
    getModuleById(id: number): Promise<Module | null>;
    getAllModules(): Promise<Module[]>;
    getModuleByStudyPlanId(studyPlanId: number): Promise<Module[]>;
    createModule(moduleData: Module): Promise<Module>;
    updateModule(id: number, moduleData: Module): Promise<Module | null>;
    deleteModule(id: number): Promise<void>;
}