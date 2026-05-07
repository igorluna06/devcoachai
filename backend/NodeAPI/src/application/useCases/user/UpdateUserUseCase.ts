import { User } from "../../../domain/entities/User";
import { InvalidIdError, UserNotFound } from "../../../domain/errors/UserError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { isValidDate } from "../../../utils/validators/dateValidator";
import { validateEmail } from "../../../utils/validators/emailValidator";
import { validateName } from "../../../utils/validators/nameValidator";
import { UpdateUserDTO } from "../../DTOs/user/UpdateUserDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class UpdateUserUseCase{

    private userRepository: IUserRepository;

    constructor(userRepositoy: IUserRepository){
        this.userRepository = userRepositoy;
    }

    async execute(userData: UpdateUserDTO): Promise<User>{

        if(!Number.isInteger(userData.id) || userData.id <= 0){
            throw new InvalidIdError();
        }

        const userFound: User | null = await this.userRepository.findById(userData.id);

        if(!userFound){
            throw new UserNotFound();
        }

        if(!userData.name && !userData.email && !userData.birthDate){
            throw new MissingRequiredFieldsError();
        }

        if(userData.name !== undefined){
            validateName(userData.name);
            userFound.setUserName(userData.name);
        }

        if(userData.email !== undefined){
            validateEmail(userData.email);
            userFound.setEmail(userData.email);
        }

        if(userData.birthDate !== undefined){
            isValidDate(userData.birthDate.toISOString());
            userFound.setBirthDate(userData.birthDate);
        }

        const updatedUser = await this.userRepository.update(userFound);

        if(!updatedUser){
            throw new UserNotFound();
        }

        return updatedUser;

    }
}