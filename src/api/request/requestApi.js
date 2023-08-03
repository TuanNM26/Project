import axiosInstance from '../axios';

const requestApi = {
  createRequest: (payload) => axiosInstance.post('api/request', payload),
  userGetListRequest: () => axiosInstance.get('api/request/user'),
};

export default requestApi;
