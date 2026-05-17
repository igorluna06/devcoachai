import { Preference } from "../../domain/enums/Preference";
import { InvalidPreferenceError } from "../../domain/errors/OnboardingError";

export function validatePreference(preference: string): void {
    if (!Object.values(Preference).includes(preference as Preference)) {
        throw new InvalidPreferenceError();
    }
}