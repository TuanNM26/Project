import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../enum/User.enum';

export class UserRegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEnum(UserRoles)
  role: UserRoles;

  @IsString()
  date_of_birth: string;
}

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  date_of_birth?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
