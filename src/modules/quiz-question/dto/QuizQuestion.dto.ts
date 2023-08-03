import { IsOptional, IsString, IsUUID } from 'class-validator';

export class QuizQuestionDto {
  @IsUUID()
  result_id: string;

  @IsUUID()
  question_id: string;

  @IsString()
  @IsOptional()
  selected_answer?: string;
}
