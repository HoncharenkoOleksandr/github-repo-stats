import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ACCESS_DENIDED } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.userService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException(ACCESS_DENIDED);
    }

    return {
      id: user.id,
    };
  }
}
