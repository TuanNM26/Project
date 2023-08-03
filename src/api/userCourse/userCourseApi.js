import axiosInstance from '../axios';

const userCourseApi = {
  getListUserCourse: () => axiosInstance.get('api/user-course'),
  buyCourse: (payload) => axiosInstance.post('api/user-course/buy', payload),
};

export default userCourseApi;
