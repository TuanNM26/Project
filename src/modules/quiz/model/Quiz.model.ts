import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { LessonModel } from '../../lesson/model/Lesson.model';
import { UserModel } from '../../user/model/User.model';
import { StatusQuiz } from '../enum/Quiz.enum';

@Table({
  modelName: 'quizzes',
})
export class QuizModel extends Model<QuizModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => LessonModel)
  @Column
  lesson_id: string;

  @ForeignKey(() => UserModel)
  @Column
  created_by: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  pass_score: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_time: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 10,
  })
  total_question: number;

  @Column({
    type: DataType.ENUM({ values: Object.keys(StatusQuiz) }),
    defaultValue: StatusQuiz.DRAFT,
  })
  status: StatusQuiz;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_deleted: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
