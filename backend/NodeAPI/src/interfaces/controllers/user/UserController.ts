import {NextFunction, Request, Response} from "express";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUserUseCase";
import { CreateUserDTO } from "../../../application/DTOs/user/CreateUserDTO";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { UpdateUserDTO } from "../../../application/DTOs/user/UpdateUserDTO";
import { UpdateUserUseCase } from "../../../application/useCases/user/UpdateUserUseCase";
import { UpdatePasswordUseCase } from "../../../application/useCases/user/UpdatePasswordUseCase";
import { GetUserByIdUseCase } from "../../../application/useCases/user/GetUserByIdUseCase";
import { GetAllUserUseCase } from "../../../application/useCases/user/GetAllUserUseCase";
import { GetUserByEmailUseCase } from "../../../application/useCases/user/GetUserByEmailUseCase";
import { DeleteUserUseCase } from "../../../application/useCases/user/DeleteUserUseCase";
import { AuthenticateUserUseCase } from "../../../application/useCases/user/AuthenticateUserUseCase";
import { UserSuccessMessages } from "../../constants/SucessMessages";

export class UserController{

    private createUserUseCase: CreateUserUseCase;
    private updateUserUseCase: UpdateUserUseCase;
    private getUserByIdUseCase: GetUserByIdUseCase;
    private getAllUserUseCase: GetAllUserUseCase;
    private getUserByEmailUseCase: GetUserByEmailUseCase;
    private deleteUserUseCase: DeleteUserUseCase;
    private updatePasswordUseCase: UpdatePasswordUseCase;
    private authenticateUserUseCase: AuthenticateUserUseCase;

    constructor(
        createUserUseCase: CreateUserUseCase,
        updateUserUseCase: UpdateUserUseCase,
        getUserByIdUseCase: GetUserByIdUseCase,
        getAllUserUseCase: GetAllUserUseCase,
        getUserByEmailUseCase: GetUserByEmailUseCase,
        deleteUserUseCase: DeleteUserUseCase,
        updatePasswordUseCase: UpdatePasswordUseCase,
         authenticateUserUseCase: AuthenticateUserUseCase
    ){
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.getAllUserUseCase = getAllUserUseCase
        this.getUserByEmailUseCase = getUserByEmailUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.updatePasswordUseCase = updatePasswordUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        try{
            const userData: CreateUserDTO = req.body;
            const newUser = await this.createUserUseCase.execute(userData);
            res.status(HttpStatusCode.CREATED).json({message: UserSuccessMessages.USER_CREATED, user: newUser});
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
            res.status(HttpStatusCode.OK).json({message: UserSuccessMessages.USER_UPDATED, user: updatedUser});
        } catch (error) {
            next(error);
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, oldPassword, newPassword } = req.body;
            await this.updatePasswordUseCase.execute({
                userId: Number(userId),
                oldPassword,
                newPassword
            });
            res.status(HttpStatusCode.OK).json({ message: UserSuccessMessages.PASSWORD_UPDATED});
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

    async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const { email } = req.params;
            const user = await this.getUserByEmailUseCase.execute(email.toString());
            res.status(HttpStatusCode.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const userId: number = Number(req.params.id);
            await this.deleteUserUseCase.execute(userId);
            res.status(HttpStatusCode.OK).json({message: UserSuccessMessages.USER_DELETED});
        } catch (error) {
            next(error);
        }
    }

    async authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const { token } = await this.authenticateUserUseCase.execute({ email, password });
            res.status(HttpStatusCode.OK).json({ token });
        } catch (error) {
            next(error);
        }
    }
}