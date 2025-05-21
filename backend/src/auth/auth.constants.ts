import * as process from 'process';

export const INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password.';
export const USER_IS_EXIST = 'This user is already exist.';
export const ACCESS_DENIDED = 'Access denied.';

export const JwtConfig = {
  secret: process.env.SECRET_KEY,
  expiresIn: '1h',
};
