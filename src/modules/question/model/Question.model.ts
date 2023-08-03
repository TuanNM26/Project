import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserModel } from '../../user/model/User.model';
import { CourseModel } from '../../course/model/Course.model';
import { QuestionType } from '../enum/Question.enum';
import { LessonModel } from '../../lesson/model/Lesson.model';
import { AnswerModel } from './Answer.model';

@Table({ tableName: 'questions' })
export class QuestionModel extends Model<QuestionModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column
  created_by: string;

  @ForeignKey(() => CourseModel)
  @Column
  course_id: string;

  @ForeignKey(() => LessonModel)
  @Column
  lesson_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  question: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM({ values: Object.keys(QuestionType) }),
  })
  type: QuestionType;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_deleted: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => AnswerModel)
  answers: AnswerModel[];
}
