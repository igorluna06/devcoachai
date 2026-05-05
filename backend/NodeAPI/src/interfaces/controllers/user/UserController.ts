import {NextFunction, Request, Response} from "express";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUserUseCase";
import { CreateUserDTO } from "../../../application/DTOs/user/CreateUserDTO";
import { HttpStatusCode } from "../../constants/HttpStatusCode";

export class UserController{

    private createUserUseCase: CreateUserUseCase;

    constructor(createUserUseCase: CreateUserUseCase){
        this.createUserUseCase = createUserUseCase;
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        try{
            const userData: CreateUserDTO = req.body;
            const newUser = await this.createUserUseCase.execute(userData);
            res.status(HttpStatusCode.CREATED).json(newUser);
        } catch (error) {
            next(error);
        }
    }
}