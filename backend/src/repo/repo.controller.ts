import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/auth.jwt.guard';
import { UserId } from '../decorators/user-id/user-id.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AddRepoDto } from './dto/add-repo.dto';
import { RepoService } from './repo.service';

@Controller('repo')
@ApiTags('repo')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class RepoController {
  constructor(
    private readonly repoService: RepoService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiBody({ type: AddRepoDto })
  async addRepo(@Body('path') path: string, @UserId() userId: string) {
    const user = (await this.usersService.findById(
      userId,
      false,
    )) as UserEntity;
    return this.repoService.addRepo(path, user);
  }

  @Get()
  async getRepos(@UserId() userId: string) {
    const user = (await this.usersService.findById(
      userId,
      false,
    )) as UserEntity;
    return this.repoService.getUserRepos(user);
  }

  @Delete(':id')
  async removeRepo(@Param('id') id: string, @UserId() userId: string) {
    const user = (await this.usersService.findById(
      userId,
      false,
    )) as UserEntity;
    return this.repoService.remove(id, user);
  }

  @Patch(':id/refresh')
  async refreshRepo(@Param('id') id: string, @UserId() userId: string) {
    const user = (await this.usersService.findById(
      userId,
      false,
    )) as UserEntity;
    return this.repoService.refresh(id, user);
  }
}
