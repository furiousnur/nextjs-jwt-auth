import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users/users.service';
import { User } from '../typeorm/entities/User';
import { Profile } from '../typeorm/entities/Profile';

@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
