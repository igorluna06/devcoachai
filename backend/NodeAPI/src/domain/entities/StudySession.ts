import { InvalidMinutesStudiedError,InvalidTasksCompletedError } from "../errors/StudySessionError";

export class StudySession {

    private studySessionId: number | undefined;
    private dateSession: Date;
    private minutesStudied: number;
    private tasksCompleted: number;
    private userId: number;

    private constructor(
        minutesStudied: number,
        tasksCompleted: number,
        userId: number,
        dateSession?: Date,
        studySessionId?: number
    ) {
        this.minutesStudied = minutesStudied;
        this.tasksCompleted = tasksCompleted;
        this.userId = userId;
        this.dateSession = dateSession ?? new Date();
        this.studySessionId = studySessionId;
    }

    static create(minutesStudied: number, tasksCompleted: number, userId: number): StudySession {
        if (minutesStudied <= 0) throw new InvalidMinutesStudiedError();
        if (tasksCompleted < 0) throw new InvalidTasksCompletedError();
        return new StudySession(minutesStudied, tasksCompleted, userId);
    }

    static restore(
        studySessionId: number,
        minutesStudied: number,
        tasksCompleted: number,
        userId: number,
        dateSession: Date
    ): StudySession {
        return new StudySession(minutesStudied, tasksCompleted, userId, dateSession, studySessionId);
    }

    getStudySessionId(): number | undefined { return this.studySessionId; }
    getDateSession(): Date { return this.dateSession; }
    getMinutesStudied(): number { return this.minutesStudied; }
    getTasksCompleted(): number { return this.tasksCompleted; }
    getUserId(): number { return this.userId; }

}