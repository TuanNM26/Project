import { Injectable, Logger } from '@nestjs/common';
import { IEmailService } from './Email.service.interface';
import * as nodemailer from 'nodemailer';
import { BaseError, ERROR_CODE } from '../../../BaseError';
import { STATUS_CODE } from '../../../BaseController';

@Injectable()
export class EmailServiceImplementation implements IEmailService {
  private readonly logger = new Logger(EmailServiceImplementation.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    console.log(process.env.EMAIL);
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendEmail(message: any): Promise<void> {
    try {
      await this.transporter.sendMail(message);
      this.logger.log('Send email success');
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw new BaseError(ERROR_CODE.ERROR_SEND_EMAIL, STATUS_CODE.SERVER_INTERNAL_ERROR);
    }
  }
}
