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

    getUserId(): number | undefined{return this.userId;}
    getUserName(): string{return this.userName;}
    getBirthDate(): Date{return this.birthDate};
    getEmail(): string{return this.email};
    getPasswordHash(): string{return this.passwordHash};
    getCreatedAt(): Date{return this.createdAt};

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

    toJSON(): object {
        return {
        userId: this.userId,
        userName: this.userName,
        birthDate: this.birthDate.toISOString(),
        email: this.email,
        age: this.getAge(),
        createdAt: this.createdAt.toISOString(),
        };
    }

    toString(): string {
        return USER_LABELS.TO_STRING(this.userId, this.userName, this.email);
    }

}