export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'POST',
  DELETE: 'DELETE',
};

export const AUTH_PATH = {
  REGISTER: 'api/auth/register',
  LOGIN: 'api/auth/login',
  CHANGE_PASSWORD: 'api/auth/change-password',
  FORGOT_PASSWORD: 'api/auth/forgot-password',
  RESET_PASSWORD: 'api/auth/reset-password',
};

export const USER_PATH = {
  USER_DETAIL: 'api/user/me',
  CHANGE_AVATAR: 'api/user/${userId}/change-avatar',
};

export const COURSE_PATH = {
  CREATE_COURSE: 'api/courses',
  GET_DETAIL: 'api/courses',
  GET_LIST: '',
  GET_LIST_OF_USER: '',
};
