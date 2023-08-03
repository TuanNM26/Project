import axiosInstance from '../axios';
import { USER_PATH } from '../constants';

const userApi = {
  userDetail: () => axiosInstance.get(USER_PATH.USER_DETAIL),
  changeAvatar: (params) => {
    const { file, userId } = params;
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post(`api/user/${userId}/change-avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getListUser: () => axiosInstance.get('api/user'),
  deleteUser: (payload) => axiosInstance.post('api/user/delete-user', payload),
  activeUser: (payload) => axiosInstance.post('api/user/active-user', payload),
};

export default userApi;
