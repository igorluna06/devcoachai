import { CreateModuleUseCase } from "../../../application/useCases/module/CreateModuleUseCase";
import { DeleteModuleUseCase } from "../../../application/useCases/module/deleteModuleUseCase";
import { GetAllModuleUseCase } from "../../../application/useCases/module/GetAllModuleUseCase";
import { GetModuleByIdUseCase } from "../../../application/useCases/module/GetModuleByIdUseCase";
import { GetModuleByStudyPlanIdUseCase } from "../../../application/useCases/module/GetModuleByStudyPlanIdUseCase";
import { PrismaModuleRepository } from "../../../infrastructure/repositories/PrismaModuleRepository";
import { PrismaStudyPlanRepository } from "../../../infrastructure/repositories/PrismaStudyPlanRepository";
import { ModuleController } from "../../controllers/module/ModuleController";

const moduleRepository = new PrismaModuleRepository();
const studyPlanRepository = new PrismaStudyPlanRepository();

export const moduleController = new ModuleController(
    new CreateModuleUseCase(moduleRepository, studyPlanRepository),
    new GetModuleByIdUseCase(moduleRepository),
    new GetAllModuleUseCase(moduleRepository),
    new DeleteModuleUseCase(moduleRepository),
    new GetModuleByStudyPlanIdUseCase(moduleRepository, studyPlanRepository)
);