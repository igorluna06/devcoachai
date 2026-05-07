import {NextFunction, Request, Response} from "express";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUserUseCase";
import { CreateUserDTO } from "../../../application/DTOs/user/CreateUserDTO";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { UpdateUserDTO } from "../../../application/DTOs/user/UpdateUserDTO";
import { UpdateUserUseCase } from "../../../application/useCases/user/UpdateUserUseCase";
import { GetUserByIdUseCase } from "../../../application/useCases/user/GetUserByIdUseCase";
import { GetAllUserUseCase } from "../../../application/useCases/user/GetAllUserUseCase";

export class UserController{

    private createUserUseCase: CreateUserUseCase;
    private updateUserUseCase: UpdateUserUseCase;
    private getUserByIdUseCase: GetUserByIdUseCase;
    private getAllUserUseCase: GetAllUserUseCase;

    constructor(
        createUserUseCase: CreateUserUseCase,
        updateUserUseCase: UpdateUserUseCase,
        getUserByIdUseCase: GetUserByIdUseCase,
        getAllUserUseCase: GetAllUserUseCase
    ){
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.getAllUserUseCase = getAllUserUseCase
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

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, name, email, birthDate } = req.body;
            const updatedData: UpdateUserDTO = {
            id: Number(id),
            name,
            email,
            birthDate: birthDate ? new Date(birthDate) : undefined
        };
            const updatedUser = await this.updateUserUseCase.execute(updatedData);
            res.status(HttpStatusCode.OK).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const userId: number = Number(req.params.id);
            const user = await this.getUserByIdUseCase.execute(userId);
            res.status(HttpStatusCode.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    async getAllUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const users = await this.getAllUserUseCase.execute();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}