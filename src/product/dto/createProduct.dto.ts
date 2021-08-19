import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDTO {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}