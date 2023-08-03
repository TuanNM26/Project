import axiosInstance from '../axios';

const quizApi = {
  createQuiz: (payload) => {
    console.log(payload, 'payload');
    return axiosInstance.post('api/quiz', payload);
  },
  getDetail: (lesson_id) => axiosInstance.get('api/quiz', { params: { lesson_id } }),
  updateQuiz: (payload) => {
    const { quizId, dataUpdate } = payload;
    console.log(dataUpdate, 'dataUpdate');
    return axiosInstance.put(`api/quiz/${quizId}`, dataUpdate);
  },
};

export default quizApi;
