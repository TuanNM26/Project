import { useNavigate } from 'react-router';
import { STATUS_COURSE } from '../../constant';
import TblCourseRequest from './TableCourseRequest';
import './course.css';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../api/user/user';
import { useEffect } from 'react';
const CourseManagementScreen = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (data?.user) {
      if (!data?.user?.role || data?.user?.role !== 'admin') {
        navigate('/forbidden');
      }
    }
  }, [data]);

  return (
    <div className="course-management-screen">
      <h2>Quản lý khóa học</h2>
      <TblCourseRequest statusCourse={STATUS_COURSE.PUBLISHED} queryKey={'list-course-publish'} />

      <h2>Quản lý khóa học chưa được duyệt</h2>
      <TblCourseRequest statusCourse={STATUS_COURSE.PROCESSING_REQUEST} queryKey={'list-course-processing'} />
    </div>
  );
};

export default CourseManagementScreen;
