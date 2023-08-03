import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { AnswerDto } from './Answer.dto';
import { Type } from 'class-transformer';
import { QuestionType } from '../enum/Question.enum';

export class CreateQuestionDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsUUID()
  created_by: string;

  @IsUUID()
  course_id: string;

  @IsUUID()
  lesson_id: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;
  @IsEnum(QuestionType)
  type: QuestionType;
  @IsArray()
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

export class QuestionRecordDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsUUID()
  created_by: string;

  @IsUUID()
  course_id: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class BulkInsertQuestionDto {
  questions: CreateQuestionDto[];
}
