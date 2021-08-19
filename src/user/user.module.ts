import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature( [User] ), JwtModule.register({
    secret: process.env.PRIVATE_KEY || "123czxc12122",
    signOptions: {
      expiresIn: '24h'
    }
  }),
],
  controllers: [UserController],
  providers: [UserService, JwtModule],
  exports: [UserService, JwtModule]
})
export class UserModule {}
