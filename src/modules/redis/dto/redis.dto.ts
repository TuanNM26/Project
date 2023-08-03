import { IsEmail, IsUUID } from 'class-validator';

export class ValueForgotPassword {
  @IsEmail()
  email: string;

  @IsUUID()
  token: string;
}
