import axiosInstance from '../axios';
import { AUTH_PATH, HTTP_METHOD } from '../constants';

const authApis = {
  register: (data) => axiosInstance.post(AUTH_PATH.REGISTER, data),
  login: (data) => axiosInstance.post(AUTH_PATH.LOGIN, data),
  changePassword: (data) =>
    axiosInstance.post(`${AUTH_PATH.CHANGE_PASSWORD}/${data.userId}`, {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }),
  forgotPassword: (data) => axiosInstance.post(AUTH_PATH.FORGOT_PASSWORD, data),
  resetPassword: (data) => axiosInstance.post(AUTH_PATH.RESET_PASSWORD, data),
};

export default authApis;
