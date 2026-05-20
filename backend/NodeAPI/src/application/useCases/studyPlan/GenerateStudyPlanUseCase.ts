import { generateContent } from "../../../utils/helper/geminiHelper";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { StudyPlan } from "../../../domain/entities/StudyPlan";
import { Module } from "../../../domain/entities/Module";
import { Task } from "../../../domain/entities/Task";
import {UserNotFoundError } from "../../../domain/errors/UserError";
import { GenerateStudyPlanDTO } from "../../DTOs/studyPlan/GenerateStudyPlanDTO";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { TaskType } from "../../../domain/enums/TaskType";
import { AI_PROMPTS } from "../../../infrastructure/constants/AIConstants";
import { AIParseError } from "../../../infrastructure/errors/AIError";

export class GenerateStudyPlanUseCase {

    private studyPlanRepository: IStudyPlanRepository;
    private moduleRepository: IModuleRepository;
    private taskRepository: ITaskRepository;
    private userRepository: IUserRepository;

    constructor(
        studyPlanRepository: IStudyPlanRepository,
        moduleRepository: IModuleRepository,
        taskRepository: ITaskRepository,
        userRepository: IUserRepository
    ) {
        this.studyPlanRepository = studyPlanRepository;
        this.moduleRepository = moduleRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    async execute(data: GenerateStudyPlanDTO): Promise<StudyPlan> {

        if (!data.userId || data.userId <= 0) throw new InvalidIdError();

        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFoundError();

        const prompt = this.buildPrompt(data);
        const response = await generateContent(prompt);
        const parsed = this.parseResponse(response);

        const studyPlan = await this.studyPlanRepository.create(
            StudyPlan.create(
                data.userId,
                parsed.title,
                data.recommendedLanguage,
                data.level,
                parsed.description,
                parsed.estimatedDays
            )
        );

        let moduleOrder = 1;
        for (const moduleData of parsed.modules) {
            const module = await this.moduleRepository.create(
                Module.create(
                    moduleData.title,
                    moduleOrder++,
                    studyPlan.getStudyPlanId()!,
                    moduleData.description,
                    moduleData.estimatedHours
                )
            );

            for (const taskData of moduleData.tasks) {
                await this.taskRepository.create(
                    Task.create(
                        taskData.title,
                        module.getModuleId()!,
                        taskData.type as TaskType,
                        taskData.description,
                        taskData.estimatedMinutes
                    )
                );
            }
        }

        return studyPlan;
    }

    private buildPrompt(data: GenerateStudyPlanDTO): string {
    return AI_PROMPTS.GENERATE_STUDY_PLAN(
        data.goal,
        data.preference,
        data.region,
        data.experienceLevel,
        data.recommendedLanguage,
        data.recommendedStack,
        data.level
    );
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