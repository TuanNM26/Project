import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { UserModel } from '../../user/model/User.model';

@Table({ modelName: 'wallet' })
export class WalletModel extends Model<WalletModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column
  user_id: string;

  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  current_balance: number;

  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  previous_balance: number;

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
