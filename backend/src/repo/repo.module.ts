import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { RepoController } from './repo.controller';
import { RepoProviders } from './repo.providers';
import { RepoService } from './repo.service';

@Module({
  controllers: [RepoController],
  providers: [...RepoProviders, RepoService, JwtService],
  imports: [DatabaseModule, HttpModule, UsersModule],
})
export class RepoModule {}
