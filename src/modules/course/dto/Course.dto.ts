import { IsEnum, IsIn, IsNumber, IsOptional, IsString, IsUUID, Max, Min, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CourseModel } from '../model/Course.model';
import { StatusCourse } from '../enum/courseEnum';

export class CreateCourseDto {
  @IsUUID()
  id: string;

  @IsString()
  created_by: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // @IsString()
  // // @Min(0)
  // price: string;

  @Validate(IsString, { each: true })
  price: string | number;
}

export class MyCoursesFilerDto {
  @IsUUID()
  @IsOptional()
  created_by?: string;
  @IsEnum(StatusCourse)
  status: StatusCourse;

  @Type(() => Number)
  @IsNumber()
  @Max(100)
  @Min(1)
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    title: 'Limit',
    format: 'int32',
    default: 10,
  })
  limit: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({
    minimum: 0,
    title: 'Page',
    format: 'int32',
    default: 0,
  })
  offset: number;
}

export class ListCourseFilerDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsUUID()
  @IsOptional()
  created_by?: string;

  @IsString()
  @IsIn(['1', '0'])
  @IsOptional()
  is_free?: string;

  @Type(() => Number)
  @IsNumber()
  @Max(100)
  @Min(1)
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    title: 'Limit',
    format: 'int32',
    default: 10,
  })
  limit: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({
    minimum: 0,
    title: 'Page',
    format: 'int32',
    default: 0,
  })
  offset: number;
}

export class CoursesResponseDto {
  data: CourseModel[];
  pagination: { offset: number; limit: number; total: number };
}
