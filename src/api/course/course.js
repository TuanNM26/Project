import axiosInstance from '../axios';

const CourseApi = {
  createCourse: (payload) => {
    const { created_by, name, image, description, price } = payload;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('created_by', created_by);
    // formData.append('created_by', '395e963c-c5a6-4d4f-b150-d886364ef35b');
    formData.append('price', price);
    formData.append('name', name);
    formData.append('description', description);
    for (const [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
    return axiosInstance.post(`api/courses`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  courseDetail: (id) => {
    return axiosInstance.get(`api/courses/${id}`);
  },
  getListCourse: (params) => {
    return axiosInstance.get(`api/courses`, {
      params: {
        limit: params.limit,
        offset: params.offset,
        is_free: params.is_free,
      },
    });
  },

  getListCourseOfUser: (params) => {
    return axiosInstance.get('/api/courses/my-courses', {
      params: {
        limit: params.limit | 20,
        offset: params.offset | 0,
        status: params.status,
      },
    });
  },

  updateStatusCourse: (payload) => {
    return axiosInstance.post('api/courses/update-status', payload);
  },

  adminGetLisCourse: (params) => {
    return axiosInstance.get('api/courses/admin/courses', {
      params: {
        limit: params.limit | 100,
        offset: params.offset | 0,
        status: params.status,
      },
    });
  },

  getListCoursePublish: (params) => axiosInstance.get('api/courses', { params }),
};

export default CourseApi;
