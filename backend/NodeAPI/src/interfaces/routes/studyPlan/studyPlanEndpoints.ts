import { RoutePaths } from "../constants/RoutePaths";

export const studyPlanEndpoints = {
    ROOT: "/",
    BY_ID: "/:id",
    BY_USER_ID: RoutePaths.USER + "/:userId",
    GENERATE: RoutePaths.GENERATE,
    ANALYSIS: "/analysis",
    SUGGESTIONS: "/suggestions",
}