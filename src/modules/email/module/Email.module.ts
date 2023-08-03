import { Module } from '@nestjs/common';
import { IEmailService } from '../service/Email.service.interface';
import { EmailServiceImplementation } from '../service/Email.service.implementation';

@Module({
  providers: [
    {
      provide: IEmailService,
      useClass: EmailServiceImplementation,
    },
  ],
  exports: [IEmailService],
})
export class EmailModule {}
