import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';;
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => (
      {
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn:  configService.get('JWT_EXP') || '60s' }
      }
    )
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
