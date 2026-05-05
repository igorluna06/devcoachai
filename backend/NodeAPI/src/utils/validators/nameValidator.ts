import { InvalidNameError } from "../../domain/errors/UserError";
import { containsOnlyLettersAndSpaces } from "./stringValidator";

export function validateName(name: string){
    if(!name || name.trim().length === 0){
        throw new InvalidNameError("Nome não pode ser vazio!");
    }

    if(!containsOnlyLettersAndSpaces(name)){
        throw new InvalidNameError("Nome apenas pode conter letras e espaços!")
    }

    if(name.length < 3){
        throw new InvalidNameError("Mínimo 3 caracteres!");
    }
}