import { RoutePaths } from "../constants/RoutePaths";

export const CertificateEndpoints = {
    ROOT: "/",
    BY_ID: "/:id",
    BY_USER_ID: RoutePaths.USER + "/:userId",
    BY_STUDY_PLAN_ID: RoutePaths.STUDY_PLAN + "/:studyPlanId",
} as const;