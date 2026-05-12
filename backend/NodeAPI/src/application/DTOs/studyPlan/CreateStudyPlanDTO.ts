import { Language } from "../../../domain/enums/Language";

export interface CreateStudyPlanDTO{
    userId: number,
    title: string,
    Language: Language
}