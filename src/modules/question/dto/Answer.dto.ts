import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AnswerDto {
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsBoolean()
  is_correct: boolean;

  @IsString()
  @IsOptional()
  question_id?: string;
}
