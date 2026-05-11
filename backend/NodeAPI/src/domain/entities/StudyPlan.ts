import { validateLanguage } from "../../utils/validators/languageValidator";
import { validateTitle } from "../../utils/validators/titleValidator";
import { Language } from "../enums/Language";

export class StudyPlan{

    private studyPlanId: number | undefined;
    private title: string;
    private userId: number;
    private language: Language;
    private createdAt: Date;

    private constructor(
        userId: number,
        title: string,
        language: Language,
        studyPlanId?: number 
    ){
        this.studyPlanId = studyPlanId;
        this.title = title;
        this.userId = userId;
        this.language = language;
        this.createdAt = new Date();
    }

    static create(userId: number, title: string, language: Language): StudyPlan {
        return new StudyPlan(userId, title, language);
    }

    static restore(userId: number, title: string, language: Language, studyPlanId: number): StudyPlan {
        return new StudyPlan(userId, title, language, studyPlanId);
    }

    getStudyPlanId(): number | undefined{return this.studyPlanId;}
    getUserId(): number{return this.userId;}
    getTitle(): string{return this.title;}
    getLanguage(): Language{return this.language;}
    getCreatedAt(): Date{return this.createdAt;}

    setLanguage(language: Language): void{
        validateLanguage(language);
        this.language = language;
    }

    setTitle(title: string): void{
        validateTitle(title);
        this.title = title;
    }

}