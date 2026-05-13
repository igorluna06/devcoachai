import { InvalidOrderError } from "../../domain/errors/ModuleError";

export function validateOrder(order: number): void {
    if (!Number.isInteger(order) || order < 1) {
        throw new InvalidOrderError();
    }
}