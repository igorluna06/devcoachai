import { User } from "../../../domain/entities/User";
import { InvalidEmailError, UserNotFoundError } from "../../../domain/errors/UserError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { validateEmail } from "../../../utils/validators/emailValidator";

export class GetUserByEmailUseCase{

    private userRepository: IUserRepository;
    
        constructor(userRepository: IUserRepository){
            this.userRepository = userRepository;
        }
    
        async execute(email: string): Promise<User>{
    
            if(!email || !validateEmail(email)){
                throw new InvalidEmailError();
            }
    
            const userFound = await this.userRepository.findByEmail(email);
    
            if(!userFound){
                throw new UserNotFoundError();
            }
    
            return userFound;
        }
}