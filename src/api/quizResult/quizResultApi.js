import axiosInstance from '../axios';

const quizResultApi = {
  startQuiz: (payload) => {
    return axiosInstance.post('api/quiz-result/start', payload);
  },
  getQuiz: (resultId) => axiosInstance.get(`api/quiz-result/${resultId}`),
  getListResult: (lessonId) => axiosInstance.get(`api/quiz-result`, { params: { lesson_id: lessonId } }),
  submitQuestions: (payload) => {
    return axiosInstance.post('api/quiz-result/submit-questions', payload);
  },
  reviewQuiz: (resultId) => axiosInstance.get(`api/quiz-result/${resultId}/review`),
  submitQuiz: (payload) => axiosInstance.post('api/quiz-result/submit-quiz', payload),
};

export default quizResultApi;
