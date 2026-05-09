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
        console.log("data:", data);
        if (!data.email || !data.password) {
            throw new MissingRequiredFieldsError();
        }

        const user = await this.userRepository.findByEmail(data.email);
        console.log("user encontrado:", user);
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const passwordMatch = await user.checkPassword(data.password);
        console.log("passwordMatch:", passwordMatch);
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