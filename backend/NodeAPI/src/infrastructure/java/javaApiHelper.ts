import { JAVA_API_CONSTANTS } from "../constants/JavaApiConstants";
import { JavaApiError } from "../errors/JavaApiError";

export async function getProgressAnalysis(studyPlanId: number) {
    try {
        const response = await fetch(
            JAVA_API_CONSTANTS.BASE_URL + JAVA_API_CONSTANTS.ENDPOINTS.ANALYZE(studyPlanId)
        );
        if (!response.ok) throw new JavaApiError();
        return response.json();
    } catch {
        throw new JavaApiError();
    }
}

export async function getSuggestions(studyPlanId: number) {
    try {
        const response = await fetch(
            JAVA_API_CONSTANTS.BASE_URL + JAVA_API_CONSTANTS.ENDPOINTS.SUGGESTIONS(studyPlanId)
        );
        if (!response.ok) throw new JavaApiError();
        return response.json();
    } catch {
        throw new JavaApiError();
    }
}