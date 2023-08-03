export interface IEmailService {
  sendEmail(message: any): Promise<void>;
}

export const IEmailService = Symbol('IEmailService');
