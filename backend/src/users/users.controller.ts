import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/auth.jwt.guard';
import { UserId } from '../decorators/user-id/user-id.decorator';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @ApiBearerAuth()
  getMe(@UserId() id: string) {
    return this.usersService.findById(id, false);
  }
}
