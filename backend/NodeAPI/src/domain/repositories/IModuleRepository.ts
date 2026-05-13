import { Module } from "../entities/Module";

export interface IModuleRepository {
    getModuleById(id: number): Promise<Module | null>;
    getAllModules(): Promise<Module[]>;
    getModuleByStudyPlanId(studyPlanId: number): Promise<Module[]>;
    create(moduleData: Module): Promise<Module>;
    update(id: number, moduleData: Module): Promise<Module | null>;
    delete(id: number): Promise<void>;
}