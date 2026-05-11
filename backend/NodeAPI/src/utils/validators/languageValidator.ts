import { Language } from "../../domain/enums/Language";
import { InvalidLanguageError } from "../../domain/errors/StudyPlanError";

export function validateLanguage(language: string): void {
    if (!Object.values(Language).includes(language as Language)) {
        throw new InvalidLanguageError();
    }
}