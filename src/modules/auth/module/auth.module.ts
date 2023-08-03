import { Module } from '@nestjs/common';
import { IAuthService } from '../service/Auth.service.interface';
import { AuthServiceImplementation } from '../service/Auth.service.implementation';
import { UserModule } from 'src/modules/user/module/User.module';
import { AuthController } from '../controller/Auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../../../common/constants';
import { WalletModule } from '../../wallet/module/Wallet.module';
import { RedisModule } from '../../redis/module/redis.module';
import { EmailModule } from '../../email/module/Email.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    WalletModule,
    RedisModule,
    EmailModule,
  ],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthServiceImplementation,
    },
  ],
  controllers: [AuthController],
  exports: [IAuthService],
})
export class AuthModule {}
