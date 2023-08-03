import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateQuizDto {
  @IsUUID()
  lesson_id: string;

  @IsUUID()
  @IsOptional()
  created_by?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  total_time: number;

  @IsNumber()
  @Min(0)
  number_question: number;

  @IsNumber()
  @Min(0)
  pass_score: number;
}

export class QueryQuizDto {
  @IsUUID()
  lesson_id: string;
}

export class ResponseQuizDetailDto {
  @IsUUID()
  id: string;
  @IsUUID()
  lesson_id: string;
  @IsUUID()
  created_by: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  pass_score: number;
  @IsNumber()
  total_time: number;
  @IsNumber()
  total_question: number;
  @IsNumber()
  total_question_bank: number;
}

export class PayloadUpdateInfoQuiz {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsOptional()
  pass_score?: number;
  @IsNumber()
  @IsOptional()
  total_time?: number;
  @IsNumber()
  @IsOptional()
  total_question?: number;
}
