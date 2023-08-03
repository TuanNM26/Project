import React, { useEffect } from 'react';
import './admin.css';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../api/user/user';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  const totalUsers = 10;
  const currentCourses = 10;
  const pendingCourses = 1;
  const registrationsInPast = 4;
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
    <div className="dashboard">
      <div className="dashboard-section">
        <h3>Tổng số người dùng</h3>
        <p>{totalUsers}</p>
      </div>
      <div className="dashboard-section">
        <h3>Số khóa học hiện có</h3>
        <p>{currentCourses}</p>
      </div>
      <div className="dashboard-section">
        <h3>Số khóa học đang xử lí</h3>
        <p>{pendingCourses}</p>
      </div>
      <div className="dashboard-section">
        <h3>Số người đăng kí thêm</h3>
        <p>{registrationsInPast}</p>
      </div>
    </div>
  );
};

export default Dashboard;
