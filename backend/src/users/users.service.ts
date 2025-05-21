import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_NOT_FOUND } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(
    id: string,
    withPassword = true,
  ): Promise<UserEntity | Omit<UserEntity, 'password'>> {
    const user = await this.repository.findOneBy({
      id,
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: __password, ...rest } = user;
    if (withPassword) {
      return user;
    }
    return { ...rest } as Omit<UserEntity, 'password'>;
  }

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
