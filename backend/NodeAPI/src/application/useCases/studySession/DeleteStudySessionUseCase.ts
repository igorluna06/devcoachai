import { StudySessionNotFound } from "../../../domain/errors/StudySessionError";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { IStudySessionRepository } from "../../../domain/repositories/IStudySessionRepository";

export class DeleteStudySessionUseCase{
    
    private studySessionRepository: IStudySessionRepository;

    constructor(studySessionRepository: IStudySessionRepository){
        this.studySessionRepository = studySessionRepository;
    }

    async execute(id: number): Promise<void>{
        if(!id || id <= 0){
            throw new InvalidIdError();
        }

        const studySession = await this.studySessionRepository.findById(id);

        if(!studySession){
            throw new StudySessionNotFound();
        }

        await this.studySessionRepository.delete(id);
    }
}