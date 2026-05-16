import { StudySession } from "../../../domain/entities/StudySession";
import { IStudySessionRepository } from "../../../domain/repositories/IStudySessionRepository";

export class GetAllStudySessionUseCase{

    private studySessionRepository: IStudySessionRepository;

    constructor(studySessionRepository: IStudySessionRepository){
        this.studySessionRepository = studySessionRepository;
    }

    async execute(): Promise<StudySession[]>{
        return await this.studySessionRepository.findAll();
    }
}