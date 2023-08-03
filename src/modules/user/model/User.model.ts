import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { WalletModel } from '../../wallet/model/Wallet.model';
import { CourseModel } from '../../course/model/Course.model';

@Table({
  modelName: 'users',
})
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ example: 1, description: 'ID of user' })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: 'test_user', description: 'Username' })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: 'test@gmail.com', description: 'Email' })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: '09019293412', description: 'Phone number' })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({ example: 'Test', description: 'First name' })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({ example: 'Test', description: 'Last name' })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({ example: 'Test', description: 'Role' })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({ example: 'Test', description: 'Date of birth' })
  date_of_birth: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({ example: 'Test', description: 'Avatar of user' })
  avatar: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_deleted: string;

  @CreatedAt
  @ApiProperty({ example: '13/03/2023', description: 'Date create' })
  created_at: Date;

  @UpdatedAt
  @ApiProperty({ example: '13/03/2023', description: 'Date create' })
  updated_at: Date;

  @HasOne(() => WalletModel)
  wallet: WalletModel;

  @HasMany(() => CourseModel)
  courses: CourseModel;

  transformToResponse() {
    const { wallet, ...user } = JSON.parse(JSON.stringify(this));
    delete user.password;
    if (!wallet) {
      return { user, wallet: null };
    }
    return {
      user,
      wallet,
    };
  }
}
