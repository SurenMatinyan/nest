import { IsNotEmpty, IsString } from "class-validator"


export class UserLoginDTO {

    @IsNotEmpty()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string

}