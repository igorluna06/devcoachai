import { InvalidRegionError } from "../../domain/errors/OnboardingError";

export function validateRegion(region: string): void {
    if (!region || region.trim().length === 0 || region.trim().length > 100) {
        throw new InvalidRegionError();
    }
}