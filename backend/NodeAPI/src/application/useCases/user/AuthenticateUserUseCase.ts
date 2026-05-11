import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { InvalidCredentialsError} from "../../../domain/errors/UserError";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";
import { AuthenticateUserDTO } from "../../DTOs/user/AuthenticateUserDTO";
import { generateToken } from "../../../utils/helper/jwtHelper";

export class AuthenticateUserUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: AuthenticateUserDTO): Promise<{ token: string }> {
        if (!data.email || !data.password) {
            throw new MissingRequiredFieldsError();
        }

        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const passwordMatch = await user.checkPassword(data.password);
        if (!passwordMatch) {
            throw new InvalidCredentialsError();
        }

        const token = generateToken({
            userId: user.getUserId() as number,
            email: user.getEmail()
        });

        return { token };
    }
}