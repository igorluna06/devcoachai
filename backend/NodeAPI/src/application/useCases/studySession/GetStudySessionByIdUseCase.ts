import { StudySession } from "../../../domain/entities/StudySession";
import { StudySessionNotFound } from "../../../domain/errors/StudySessionError";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { IStudySessionRepository } from "../../../domain/repositories/IStudySessionRepository";

export class GetStudySessionByIdUseCase{

    private studySessionRepository: IStudySessionRepository;

    constructor(studySessionRepository: IStudySessionRepository){
        this.studySessionRepository = studySessionRepository;
    }

    async execute(id: number): Promise<StudySession>{

        if(!id || id <= 0){
            throw new InvalidIdError();
        }

        const studySessionFound = await this.studySessionRepository.findById(id);

        if(!studySessionFound){
            throw new StudySessionNotFound();
        }

        return studySessionFound;
    }
}