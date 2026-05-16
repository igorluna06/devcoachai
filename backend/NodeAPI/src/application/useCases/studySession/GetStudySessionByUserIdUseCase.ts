import { StudySession } from "../../../domain/entities/StudySession";
import { InvalidIdError, UserNotFound } from "../../../domain/errors/UserError";
import { IStudySessionRepository } from "../../../domain/repositories/IStudySessionRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetStudySessionByUserIdUseCase{

    private studySessionRepository: IStudySessionRepository;
    private userRepository: IUserRepository;

    constructor(studySessionRepository: IStudySessionRepository,userRepository: IUserRepository){
        this.studySessionRepository = studySessionRepository;
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<StudySession[]>{

        if(!userId || userId <= 0){
            throw new InvalidIdError();
        }

        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new UserNotFound();
        }

        const studySessions = await this.studySessionRepository.findByUserId(userId);

        return studySessions;

    }
}