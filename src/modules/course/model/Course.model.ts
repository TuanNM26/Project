import {
  BelongsTo,
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
import { StatusCourse } from '../enum/courseEnum';
import { LessonModel } from '../../lesson/model/Lesson.model';
import { QuestionModel } from '../../question/model/Question.model';

@Table({
  modelName: 'courses',
})
export class CourseModel extends Model<CourseModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column
  created_by: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @Column({
    type: DataType.ENUM({ values: Object.keys(StatusCourse) }),
    allowNull: false,
    defaultValue: StatusCourse.DRAFT,
  })
  status: StatusCourse;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => UserModel)
  author_detail: UserModel;

  @HasMany(() => LessonModel)
  lessons: LessonModel[];

  @HasMany(() => QuestionModel)
  questions: QuestionModel[];
}
