import { validateTitle } from "../../utils/validators/titleValidator";
import { validateOrder } from "../../utils/validators/validateOrder";

export class Module{

    private moduleId: number | undefined;
    private moduleTitle: string;
    private order: number;
    private studyPlanId: number;

    private constructor(moduleTitle: string, order: number, studyPlanId: number, moduleId?: number) {
        this.moduleId = moduleId;
        this.moduleTitle = moduleTitle;
        this.order = order;
        this.studyPlanId = studyPlanId;
    }

    static create(moduleTitle: string, order: number, studyPlanId: number): Module {
        validateTitle(moduleTitle);
        validateOrder(order);
        return new Module(moduleTitle, order, studyPlanId);
    }

    static restore(moduleTitle: string, order: number, studyPlanId: number, moduleId: number): Module {
        return new Module(moduleTitle, order, studyPlanId, moduleId);
    }

    getModuleId(): number | undefined{return this.moduleId;}
    getModuleTitle(): string{return this.moduleTitle;}
    getOrder(): number{return this.order;}
    getStudyPlanId(): number{return this.studyPlanId;}

    setModuleTitle(moduleTitle: string): void{
        validateTitle(moduleTitle);
        this.moduleTitle = moduleTitle;
    }
    
    setOrder(order: number): void{
        validateOrder(order);
        this.order = order;
    }
}