import { StudySession as PrismaStudySession } from "@prisma/client";
import { StudySession } from "../../../../domain/entities/StudySession";

export class PrismaStudySessionMapper{
    static toDomain(prismaStudySession: PrismaStudySession): StudySession{
        return StudySession.restore(
            prismaStudySession.id,
            prismaStudySession.minutesStudied,
            prismaStudySession.tasksCompleted,
            prismaStudySession.userId,
            prismaStudySession.date
        );
    }
}