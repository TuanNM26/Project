import { STATUS_CODE } from './BaseController';

export enum ERROR_CODE {
  SERVER_INTERNAL_ERROR = 10000,
  EXISTED_USER = 10001,
  EXISTED_PHONE = 10002,
  EXISTED_EMAIL = 10003,
  EXISTED_USERNAME = 10004,
  INVALID_PHONE = 10005,
  UPDATE_USER_FAIL = 10006,
  INVALID_PASSWORD = 10007,
  USER_NOT_FOUND = 10008,

  CANNOT_CREATE_USER = 10009,
  CANNOT_CREATE_WALLET = 10010,
  INVALID_DATA_UPDATE = 10011,

  COURSE_NOT_FOUND = 10012,
  INVALID_ID_USER = 10013,
  INVALID_ID_PRICE = 10014,
  WALLET_NOT_FOUND = 10015,
  REQUEST_IN_PROGRESS = 10016,
  ERROR_SEND_EMAIL = 10017,
  RESET_PASSWORD_INVALID_TOKEN = 10018,
  INVALID_FILE = 10019,
  INVALID_INDEX_LESSON = 10020,
  INVALID_USERNAME = 10021,
  LESSON_NOT_FOUND = 10022,
  CANNOT_CREATE_QUESTION = 10023,
  INVALID_ANSWER = 10025,
  QUESTION_NOT_FOUND = 10026,
  INSUFFICIENT_BALANCE = 10027,
  UPDATE_WALLET_FAIL = 10028,
  BUY_COURSE_FAIL = 10029,
  CANNOT_BUY_COURSE = 10030,

  QUIZ_NOT_FOUND = 10031,
  UPDATE_LESSON_FAIL = 10032,
}

const MessageErrorMapping: Record<number, string> = {
  [ERROR_CODE.SERVER_INTERNAL_ERROR]: 'Internal server error',
  [ERROR_CODE.EXISTED_USER]: 'Phone number, username and email already existed!',
  [ERROR_CODE.EXISTED_PHONE]: 'Phone number already existed!',
  [ERROR_CODE.EXISTED_EMAIL]: 'Email already existed!',
  [ERROR_CODE.EXISTED_USERNAME]: 'Username already existed!',
  [ERROR_CODE.INVALID_PHONE]: 'Invalid phone number.',
  [ERROR_CODE.UPDATE_USER_FAIL]: 'Update user info fail',
  [ERROR_CODE.INVALID_PASSWORD]: 'Invalid password',
  [ERROR_CODE.USER_NOT_FOUND]: 'User not found',
  [ERROR_CODE.CANNOT_CREATE_USER]: 'Cannot create user',
  [ERROR_CODE.CANNOT_CREATE_WALLET]: 'Cannot create wallet',
  [ERROR_CODE.INVALID_DATA_UPDATE]: 'Invalid data update',
  [ERROR_CODE.COURSE_NOT_FOUND]: 'Course not found',
  [ERROR_CODE.INVALID_ID_USER]: 'Invalid user ID',
  [ERROR_CODE.INVALID_ID_PRICE]: 'Invalid price',
  [ERROR_CODE.WALLET_NOT_FOUND]: 'Wallet not found',
  [ERROR_CODE.REQUEST_IN_PROGRESS]: 'Have request in progress. Please try again!',
  [ERROR_CODE.ERROR_SEND_EMAIL]: 'Have error when send email',
  [ERROR_CODE.RESET_PASSWORD_INVALID_TOKEN]: 'Invalid token reset password.',
  [ERROR_CODE.INVALID_INDEX_LESSON]: 'Invalid index lesson.',
  [ERROR_CODE.INVALID_USERNAME]: 'Invalid username.',
  [ERROR_CODE.LESSON_NOT_FOUND]: 'Lesson not found!',
  [ERROR_CODE.CANNOT_CREATE_QUESTION]: 'Have error when create question!',
  [ERROR_CODE.INVALID_ANSWER]: 'Invalid answer!',
  [ERROR_CODE.QUESTION_NOT_FOUND]: 'Question not found!',
  [ERROR_CODE.INSUFFICIENT_BALANCE]: 'Insufficient balance!',
  [ERROR_CODE.UPDATE_WALLET_FAIL]: 'Update wallet fail!',
  [ERROR_CODE.BUY_COURSE_FAIL]: 'Buy course fail!',
  [ERROR_CODE.CANNOT_BUY_COURSE]: 'Cannot buy course!',
  [ERROR_CODE.QUIZ_NOT_FOUND]: 'Quiz not found!',
  [ERROR_CODE.UPDATE_LESSON_FAIL]: 'Update lesson fail!',
};

export class BaseError extends Error {
  errorCode: number;
  message: string;

  statusCode: STATUS_CODE;

  constructor(errorCode: number, statusCode: number, message?: string) {
    super(MessageErrorMapping[errorCode]);
    this.errorCode = errorCode;
    this.message = message ? message : MessageErrorMapping[errorCode];
    this.statusCode = statusCode;
  }
}
