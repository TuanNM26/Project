import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class PayloadCreateLessonDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUUID()
  created_by: string;

  @IsUUID()
  course_id: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class CreateLessonDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  index: number;

  @IsUUID()
  created_by: string;

  @IsUUID()
  course_id: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class UpdateLessonInfoDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @Min(1)
  index: number;
}
