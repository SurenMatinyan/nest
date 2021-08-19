import { IsNotEmpty, IsString } from "class-validator"


export class UserCreateDTO {

    @IsNotEmpty()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string

}