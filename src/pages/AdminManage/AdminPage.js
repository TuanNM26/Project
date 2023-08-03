import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css';
import Dashboard from './adminDashBoard';
const AdminPage = () => {
  return (
    <div>
      <h1>Trang quản trị Admin</h1>
      <Dashboard />
      <Link to="/course-manage">
        <button className="button">Quản lý khóa học</button>
      </Link>
      <Link to="/wallet-manage">
        <button className="button">Quản lý ví</button>
      </Link>
    </div>
  );
};

export default AdminPage;
