import { RoutePaths } from "../constants/RoutePaths";
import { studyPlanEndpoints } from "../studyPlan/studyPlanEndpoints";

export const moduleEndpoints = {
    ROOT: "/",
    BY_ID: "/:id",
    BY_STUDY_PLAN_ID: RoutePaths.STUDY_PLAN + "/:studyPlanId"
} as const;