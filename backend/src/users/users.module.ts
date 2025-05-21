import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [...UsersProviders, UsersService, JwtService],
  imports: [DatabaseModule],
  exports: [UsersService],
})
export class UsersModule {}
