import { InvalidIdError, UserNotFound } from "../../../domain/errors/UserError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class DeleteUserUseCase{

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<void>{

        if(!userId || userId <= 0){
            throw new InvalidIdError();
        }
        
        const userFound = await this.userRepository.findById(userId);
        
        if(!userFound){
            throw new UserNotFound();
        }

        await this.userRepository.delete(userId);
    }
}