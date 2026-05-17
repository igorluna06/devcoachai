import { InvalidUrlError } from "../../domain/errors/CertificateError";

export function validateUrl(url: string): void {
    try {
        new URL(url);
    } catch {
        throw new InvalidUrlError();
    }
}