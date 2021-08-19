import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private readonly jwtService: JwtService) {}

 async canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization']
    if(!authorization)  throw new UnauthorizedException({message: 'user is not logged in'})
    const bearer = authorization.split(' ')[0]
    const token = authorization.split(' ')[1]
    if(bearer !== 'Bearer' || !token){
      throw new UnauthorizedException({message: 'user is not logged in'})
    }
    const user  = await this.userService.verify(token)
    request.user = user
    return true
  }
}
