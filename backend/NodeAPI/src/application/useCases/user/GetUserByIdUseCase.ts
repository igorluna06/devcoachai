import { User } from "../../../domain/entities/User";
import { UserNotFound } from "../../../domain/errors/UserError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetUserByIdUseCase{

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<User>{

        if(!userId || userId <= 0){
            throw new InvalidIdError();
        }

        const userFound = await this.userRepository.findById(userId);

        if(!userFound){
            throw new UserNotFound();
        }

        return userFound;
    }
}