import { StudySession } from "../../../domain/entities/StudySession";
import { InvalidMinutesStudied, InvalidTasksCompleted } from "../../../domain/errors/StudySessionError";
import { UserNotFound } from "../../../domain/errors/UserError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IStudySessionRepository } from "../../../domain/repositories/IStudySessionRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { CreateStudySessionDTO } from "../../DTOs/StudySession/CreateStudySessionDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateStudySessionUseCase{

    private studySessionRepository: IStudySessionRepository;
    private userRepository: IUserRepository;

    constructor(
        studySessionRepository: IStudySessionRepository,
        userRepository: IUserRepository
    ){
        this.studySessionRepository = studySessionRepository;
        this.userRepository = userRepository;
    }

    async execute(data: CreateStudySessionDTO): Promise<StudySession>{

        if(!data.minutesStudied || data.tasksCompleted == undefined || !data.userId){
            throw new MissingRequiredFieldsError();
        }

        if(!Number.isInteger(data.userId) || data.userId <= 0){
            throw new InvalidIdError();
        }

        const userFound = await this.userRepository.findById(data.userId);

        if(!userFound){
            throw new UserNotFound();
        }

        if(data.minutesStudied <= 0){
            throw new InvalidMinutesStudied();
        }

        if (data.tasksCompleted < 0){
            throw new InvalidTasksCompleted();
        }         

        return this.studySessionRepository.create(StudySession.create(
            data.minutesStudied,
            data.tasksCompleted,
            data.userId
        ));
    }
}