import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { USER_NOT_FOUND } from 'src/users/users.constants';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import {
  INCORRECT_EMAIL_OR_PASSWORD,
  JwtConfig,
  USER_IS_EXIST,
} from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email.toLowerCase());
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!user || !validPassword) {
      throw new UnauthorizedException(INCORRECT_EMAIL_OR_PASSWORD);
    }
    return {
      email: user.email,
      id: user.id,
    };
  }

  async register(dto: CreateUserDto) {
    const { password, email, ...rest } = dto;
    const getUser = await this.usersService.findByEmail(email.toLowerCase());
    if (getUser) {
      throw new HttpException(USER_IS_EXIST, HttpStatus.BAD_REQUEST);
    }
    const newPassword = await bcrypt.hash(password, 8);
    const newUser = {
      ...rest,
      email: email.toLowerCase(),
      password: newPassword,
    };
    const user = await this.usersService.create(newUser);
    const payload = { id: user.id };

    return {
      token: this.jwtService.sign(payload, JwtConfig),
    };
  }

  async login(user: UserEntity) {
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const getUser = await this.usersService.findByEmail(
      user.email.toLowerCase(),
    );
    if (!getUser) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const payload = { id: getUser.id };
    return {
      token: this.jwtService.sign(payload, JwtConfig),
    };
  }
}
