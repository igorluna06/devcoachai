import { comparePassword, hashPassword } from "../../utils/helper/hashHelper";
import { validateEmail } from "../../utils/validators/emailValidator";
import { validateName } from "../../utils/validators/nameValidator";
import { validatePassword } from "../../utils/validators/passwordValidator";
import { USER_LABELS } from "../constants/UserConstants";
import { InvalidBirthDateError, InvalidEmailError} from "../errors/UserError";

export class User{

    private userId: number | undefined;
    private userName: string;
    private birthDate: Date;
    private email: string;
    private passwordHash: string;
    private streak: number = 0;
    private lastStudiedAt: Date | null = null;
    private createdAt: Date;

    private constructor(
        userName: string,
        birthDate: Date,
        email: string,
        password: string,
        userId? : number
    ){
        this.userId = userId;
        this.userName = userName;
        this.birthDate = birthDate;
        this.email = email;
        this.passwordHash = password;
        this.createdAt = new Date();
    }

    static async create(
        userName: string,
        birthDate: Date,
        email: string,
        password: string,
        userId?: number
    ): Promise<User> {
        validateName(userName);
        if (birthDate >= new Date()) throw new InvalidBirthDateError();
        validateEmail(email);
        validatePassword(password);
        const hashed = await hashPassword(password);
        return new User(userName, birthDate, email, hashed, userId);
    }

    static restore(
        userName: string,
        birthDate: Date,
        email: string,
        hashedPassword: string,
        userId: number,
        streak: number = 0,
        lastStudiedAt: Date | null = null
    ): User {
        const user = new User(userName, birthDate, email, hashedPassword, userId);
        user.streak = streak;
        user.lastStudiedAt = lastStudiedAt;
        return user;
    }

    getUserId(): number | undefined{return this.userId;}
    getUserName(): string{return this.userName;}
    getBirthDate(): Date{return this.birthDate};
    getEmail(): string{return this.email};
    getPasswordHash(): string{return this.passwordHash};
    getCreatedAt(): Date{return this.createdAt};
    getStreak(): number { return this.streak; }
    getLastStudiedAt(): Date | null { return this.lastStudiedAt; }

    setUserName(userName: string): void{
        validateName(userName);
        this.userName = userName.trim();
    }

    setBirthDate(birthDate: Date): void{
        if(birthDate >= new Date()) throw new InvalidBirthDateError();
        this.birthDate = birthDate;
    }

    setEmail(email: string): void{
        if(!email || !validateEmail(email)) {
            throw new InvalidEmailError();
        }
        this.email = email.toLowerCase();
    }

    incrementStreak(): void {
        this.streak++;
        this.lastStudiedAt = new Date();
    }

    resetStreak(): void {
        this.streak = 0;
    }

    async setPassword(password: string): Promise<void>{
        validatePassword(password);
        this.passwordHash = await hashPassword(password);
        
    }
    
    getAge(): number{
        const today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        const birthMonth = today.getMonth() - this.birthDate.getMonth();
        if(birthMonth > 0 || (birthMonth === 0 && today.getDate() < this.birthDate.getDate())){
            age--;
        }
        return age;
    }

    async checkPassword(password: string): Promise<boolean>{
        return await comparePassword(password, this.passwordHash);
    }

}