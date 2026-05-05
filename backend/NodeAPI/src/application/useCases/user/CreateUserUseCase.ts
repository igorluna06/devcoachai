import { User } from "../../../domain/entities/User";
import { InvalidBirthDateError, InvalidEmailError } from "../../../domain/errors/UserError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { isValidDate } from "../../../utils/validators/dateValidator";
import { validateEmail } from "../../../utils/validators/emailValidator";
import { validateName } from "../../../utils/validators/nameValidator";
import { validatePassword } from "../../../utils/validators/passwordValidator";
import { CreateUserDTO } from "../../DTOs/user/CreateUserDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateUserUseCase{

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async execute(userData: CreateUserDTO): Promise<User>{
        if(!userData.userName || !userData.birthDate || !userData.email || !userData.password){
            throw new MissingRequiredFieldsError();
        }

        validateName(userData.userName);

        if(!isValidDate(userData.birthDate)){
            throw new InvalidBirthDateError();
        }

        const birthDate = new Date(`${userData.birthDate}`);

        if(birthDate >= new Date()){
            throw new InvalidBirthDateError();
        }

        if(!validateEmail(userData.email)){
            throw new InvalidEmailError();
        }

        validatePassword(userData.password);

        const newUser = await this.userRepository.create(await User.create(
            userData.userName,
            birthDate,
            userData.email,
            userData.password,
        ));

        return newUser;
    }
}