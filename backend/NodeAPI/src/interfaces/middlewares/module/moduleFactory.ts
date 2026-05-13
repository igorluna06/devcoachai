import { CreateModuleUseCase } from "../../../application/useCases/module/CreateModuleUseCase";
import { GetModuleByIdUseCase } from "../../../application/useCases/module/GetModuleByIdUseCase";
import { PrismaModuleRepository } from "../../../infrastructure/repositories/PrismaModuleRepository";
import { PrismaStudyPlanRepository } from "../../../infrastructure/repositories/PrismaStudyPlanRepository";
import { ModuleController } from "../../controllers/module/ModuleController";

const moduleRepository = new PrismaModuleRepository();
const studyPlanRepository = new PrismaStudyPlanRepository();

export const moduleController = new ModuleController(
    new CreateModuleUseCase(moduleRepository, studyPlanRepository),
    new GetModuleByIdUseCase(moduleRepository)
);