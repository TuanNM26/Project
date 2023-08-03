import axiosInstance from '../axios';

const questionApis = {
  insertManyQuestion: (payload) => {
    console.log(payload, 'payload');
    return axiosInstance.post('api/question/bulk-insert', payload);
  },
  // getDetail: (lesson_id) => axiosInstance.get('api/quiz', { params: { lesson_id } }),
};

export default questionApis;
