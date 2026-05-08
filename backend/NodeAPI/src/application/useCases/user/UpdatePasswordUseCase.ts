import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { InvalidOldPasswordError, UserNotFound } from "../../../domain/errors/UserError";
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

        await user.setPassword(data.newPassword);
        await this.userRepository.update(user);
    }
}