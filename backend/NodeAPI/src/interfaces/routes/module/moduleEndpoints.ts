import { studyPlanEndpoints } from "../studyPlan/studyPlanEndpoints";

export const moduleEndpoints = {
    ROOT: "/",
    BY_ID: "/:id",
    BY_STUDY_PLAN_ID: studyPlanEndpoints.ROOT + "/:studyPlanId"
} as const;