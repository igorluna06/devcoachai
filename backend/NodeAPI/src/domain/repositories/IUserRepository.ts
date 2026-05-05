import { User } from "../entities/User";

export interface IUserRepository{
    create(user: User): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User | null>;
    delete(id: number): Promise<void>;
    findAll(): Promise<User[]>;
}