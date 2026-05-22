import { Module } from "../entities/Module";

export interface IModuleRepository {
    create(moduleData: Module): Promise<Module>;
    findById(id: number): Promise<Module | null>;
    findAll(): Promise<Module[]>;
    findByStudyPlanId(studyPlanId: number): Promise<Module[]>;
    findNextModule(studyPlanId: number, currentOrder: number): Promise<Module | null>;
    update(moduleData: Module): Promise<Module | null>;
    delete(id: number): Promise<void>;
}