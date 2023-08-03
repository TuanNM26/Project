import { IsUUID } from 'class-validator';

export class BuyCoursePayloadDto {
  @IsUUID()
  course_id: string;
}

export class BuyCourseDto {
  @IsUUID()
  course_id: string;
  @IsUUID()
  user_id: string;
}
