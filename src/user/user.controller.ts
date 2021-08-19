import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserCreateDTO } from './dto/usercreate.dto';
import { UserLoginDTO } from './dto/userlogin.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('signup')
    signup(@Body() dto: UserCreateDTO){
       return this.userService.signup(dto)
    }

    @Post('signin')
    singin(@Body() dto: UserLoginDTO){
        return this.userService.signin(dto)
    }

}
