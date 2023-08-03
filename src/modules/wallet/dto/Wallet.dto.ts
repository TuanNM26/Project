import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class WalletRegisterDto {
  @IsString()
  id: string;

  @IsNumber()
  current_balance: number;

  @IsNumber()
  previous_balance: number;

  @IsBoolean()
  is_deleted: boolean;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}

export class WalletUpdateDto {
  @IsNumber()
  @IsOptional()
  current_balance?: number;

  @IsNumber()
  @IsOptional()
  previous_balance?: number;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}
