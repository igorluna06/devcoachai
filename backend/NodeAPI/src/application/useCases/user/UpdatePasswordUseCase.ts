import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { InvalidOldPasswordError, SamePasswordError, UserNotFound } from "../../../domain/errors/UserError";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";
import { UpdatePasswordDTO } from "../../DTOs/user/UpdatePasswordDTO";

export class UpdatePasswordUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: UpdatePasswordDTO): Promise<void> {
        if (!data.userId || !data.oldPassword || !data.newPassword) {
            throw new MissingRequiredFieldsError();
        }

        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new UserNotFound();
        }

        const passwordMatch = await user.checkPassword(data.oldPassword);
        if (!passwordMatch) {
            throw new InvalidOldPasswordError();
        }

        const isSamePassword = await user.checkPassword(data.newPassword);
        if (isSamePassword) {
            throw new SamePasswordError();
        }

        await user.setPassword(data.newPassword);
        await this.userRepository.update(user);
    }
}