import { IsUUID } from 'class-validator';

export class StartQuizPayloadDto {
  @IsUUID()
  course_id: string;
  @IsUUID()
  lesson_id: string;
}

export class StartQuizServiceDto {
  @IsUUID()
  course_id: string;
  @IsUUID()
  lesson_id: string;
  @IsUUID()
  user_id: string;
}
