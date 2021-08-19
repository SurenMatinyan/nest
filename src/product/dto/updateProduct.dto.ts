import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateProductDTO {

    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}