import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService]
})
export class AuthModule {}
