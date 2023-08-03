import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserModel } from '../../user/model/User.model';
import { CourseModel } from '../../course/model/Course.model';
import { ApiProperty } from '@nestjs/swagger';
import { QuizModel } from '../../quiz/model/Quiz.model';

@Table({
  modelName: 'lessons',
})
export class LessonModel extends Model<LessonModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  @ForeignKey(() => CourseModel)
  @Column
  course_id: string;

  @ForeignKey(() => UserModel)
  @Column
  created_by: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  index: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_deleted: boolean;

  @CreatedAt
  @ApiProperty({ example: '13/03/2023', description: 'Date create' })
  created_at: Date;

  @UpdatedAt
  @ApiProperty({ example: '13/03/2023', description: 'Date create' })
  updated_at: Date;

  @BelongsTo(() => CourseModel)
  course_detail: CourseModel;

  @HasOne(() => QuizModel)
  quiz: QuizModel;
}
