import {  Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [UserModule],
    providers: [AuthGuard],
    exports: [AuthGuard]
  })
export class AuthModule {}
