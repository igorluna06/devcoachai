import { User } from "../../../../domain/entities/User";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
    static toDomain(prismaUser: PrismaUser): User {
        return User.restore(
            prismaUser.name,
            prismaUser.birthDate,
            prismaUser.email,
            prismaUser.password,
            prismaUser.id
        );

    }
}