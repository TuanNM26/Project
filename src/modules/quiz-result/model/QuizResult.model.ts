import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { CourseModel } from '../../course/model/Course.model';
import { LessonModel } from '../../lesson/model/Lesson.model';
import { UserModel } from '../../user/model/User.model';
import { ApiProperty } from '@nestjs/swagger';
import { STATUS_RESULT } from '../enum/QuizResult.enum';

@Table({
  modelName: 'quiz-results',
})
export class QuizResultModel extends Model<QuizResultModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => CourseModel)
  @Column
  course_id: string;

  @ForeignKey(() => LessonModel)
  @Column
  lesson_id: string;

  @ForeignKey(() => UserModel)
  @Column
  user_id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_submit: boolean;

  @Column({
    type: DataType.NUMBER,
  })
  started_at: number;

  @Column({
    type: DataType.NUMBER,
    defaultValue: 0,
  })
  total_correct: number;

  @Column({
    type: DataType.ENUM({ values: Object.keys(STATUS_RESULT) }),
    defaultValue: STATUS_RESULT.DOING,
  })
  status: STATUS_RESULT;
  @CreatedAt
  @ApiProperty({ example: '13/03/2023', description: 'Date create' })
  created_at: Date;

  @UpdatedAt
  @ApiProperty({ example: '13/03/2023', description: 'Date create' })
  updated_at: Date;
}
