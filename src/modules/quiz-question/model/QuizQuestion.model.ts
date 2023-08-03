import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { QuestionModel } from '../../question/model/Question.model';
import { QuizResultModel } from '../../quiz-result/model/QuizResult.model';

@Table({
  modelName: 'quiz_questions',
})
export class QuizQuestionModel extends Model<QuizQuestionModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => QuizResultModel)
  @Column
  result_id: string;

  @ForeignKey(() => QuestionModel)
  @Column
  question_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  selected_answer: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
