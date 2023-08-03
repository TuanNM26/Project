import { SALT_ROUNDS } from './constants';
import * as bcrypt from 'bcrypt';

export const verifyPhoneNumber = (phone_number: string): boolean => {
  return phone_number.length <= 12 || !phone_number.startsWith('0');
};

export const hashingPassword = async (password: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
