import { AIService } from "../../../infrastructure/ai/AIService";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { Module } from "../../../domain/entities/Module";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { StudyPlanNotFoundError } from "../../../domain/errors/StudyPlanError";
import { AIParseError } from "../../../infrastructure/errors/AIError";
import { MODULE_PROMPTS } from "../../../infrastructure/ai/prompts/ModulePrompt";

export class GenerateModulesUseCase {

    private studyPlanRepository: IStudyPlanRepository;
    private moduleRepository: IModuleRepository;
    private aiService: AIService;

    constructor(
        studyPlanRepository: IStudyPlanRepository,
        moduleRepository: IModuleRepository,
        aiService: AIService
    ) {
        this.studyPlanRepository = studyPlanRepository;
        this.moduleRepository = moduleRepository;
        this.aiService = aiService;
    }

    async execute(studyPlanId: number): Promise<Module[]> {

        if (!studyPlanId || studyPlanId <= 0) throw new InvalidIdError();

        const studyPlan = await this.studyPlanRepository.findById(studyPlanId);
        if (!studyPlan) throw new StudyPlanNotFoundError();

        const prompt = MODULE_PROMPTS.GENERATE_MODULES(
            studyPlan.getLanguage(),
            studyPlan.getLevel(),
            studyPlan.getTitle(),
            studyPlan.getDescription() ?? ""
        );

        const response = await this.aiService.generate(prompt);
        const parsed = this.parseResponse(response);

        const modules: Module[] = [];
        let order = 1;

        for (const moduleData of parsed.modules) {
            const isFirstModule = order === 1;
            const module = await this.moduleRepository.create(
                Module.create(
                    moduleData.title,
                    order++,
                    studyPlanId,
                    moduleData.description,
                    moduleData.estimatedHours,
                    !isFirstModule
                )
            );
            modules.push(module);
        }

        return modules;
    }

    private parseResponse(response: string): any {
        try {
            const clean = response.replace(/```json|```/g, "").trim();
            return JSON.parse(clean);
        } catch {
            throw new AIParseError();
        }
    }
}