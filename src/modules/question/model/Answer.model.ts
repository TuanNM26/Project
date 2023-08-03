import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { QuestionModel } from './Question.model';

@Table({ modelName: 'answers' })
export class AnswerModel extends Model<AnswerModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => QuestionModel)
  @Column
  question_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_correct: boolean;

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
