import { InvalidUrl } from "../../domain/errors/CertificateError";

export function validateUrl(url: string): void {
    try {
        new URL(url);
    } catch {
        throw new InvalidUrl();
    }
}