import { RoutePaths } from "../constants/RoutePaths";

export const OnboardingEndpoints = {
    ROOT: "/",
    BY_ID: "/:id",
    BY_USER_ID: RoutePaths.USER + "/:userId",
    COMPLETE: "/:id/complete",
} as const;