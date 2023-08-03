import axiosInstance from '../axios';

const lessonApi = {
  createLesson: (payload) => {
    const { description, lessonName, createdBy, courseId, content } = payload;
    const formData = new FormData();
    formData.append('name', lessonName);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('created_by', createdBy);
    formData.append('course_id', courseId);
    return axiosInstance.post(`api/lesson`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateLessonContent: (payload) => {
    const { lessonId, content } = payload;
    const formData = new FormData();
    formData.append('content', content);
    return axiosInstance.put(`api/lesson/update-content/${lessonId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateLessonInfo: (payload) => {
    const { lessonId, ...dataUpdate } = payload;
    console.log(payload, 'payload update lesson');
    return axiosInstance.put(`api/lesson/update-info/${lessonId}`, dataUpdate);
  },
};
export default lessonApi;
