import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/usercreate.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dto/userlogin.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService
    ) { }


    async signup(dto: UserCreateDTO) {
        try {
            const hash = await bcrypt.hash(dto.password, 10);
            const checkUser = await this.userRepo.findOne({ login: dto.login })
            if (checkUser) throw new Error("such user exists")
            const create = await this.userRepo.save({ login: dto.login, password: hash })
            if (create) {
                const token = await this.genereteToken(create)
                return { message: 'user create', token }
            }
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
        catch (e) {
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }

    async signin(dto: UserLoginDTO) {
        try {
            const user = await this.userRepo.findOne({login: dto.login})
            const passwordEquals = await bcrypt.compare(dto.password, user.password)
            if(user && passwordEquals) return this.genereteToken(user)
            throw new Error('wrong username or password')
        }
        catch (e) {
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }


    async genereteToken(user: User){
        return {token: this.jwtService.sign({login: user.login, id: user.id})}
    }

    async verify(token: any){
        return this.jwtService.verify(token)
    }

}
