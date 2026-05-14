import { RoutePaths } from "../constants/RoutePaths";

export const TaskEndpoints = {
    ROOT: "/",
    BY_ID: "/:id",
    BY_MODULE_ID: RoutePaths.MODULE + "/:moduleId",
    BY_TYPE: "/type/:taskType",
    COMPLETE: "/:id/complete"
} as const;