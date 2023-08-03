import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { UserModel } from '../../user/model/User.model';
import { CourseModel } from '../../course/model/Course.model';

@Table({ tableName: 'user_courses' })
export class UserCourseModel extends Model<UserCourseModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column
  user_id: string;

  @ForeignKey(() => CourseModel)
  @Column
  course_id: string;

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
