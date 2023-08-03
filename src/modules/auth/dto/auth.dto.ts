import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRoles } from '../../user/enum/User.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEnum(UserRoles)
  role: UserRoles;

  @IsString()
  date_of_birth: string;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  newPassword: string;

  @IsUUID()
  token: string;

  @IsUUID()
  userId: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;
  @IsString()
  newPassword: string;
}
