import { RoutePaths } from "../constants/RoutePaths";

export const AchievementEndpoints = {
    ROOT: "/",
    BY_ID: "/:id",
    BY_USER_ID: RoutePaths.USER + "/:userId",
} as const;