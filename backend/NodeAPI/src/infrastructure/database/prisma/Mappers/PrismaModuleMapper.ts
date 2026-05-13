import {Module as PrismaModule} from "@prisma/client";
import { Module } from "../../../../domain/entities/Module";

export class PrismaModuleMapper {
    static toDomain(prismaModule: PrismaModule): Module {
        return Module.restore(
            prismaModule.title,
            prismaModule.order,
            prismaModule.studyPlanId,
            prismaModule.id
        );
    }
}