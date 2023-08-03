import React from 'react';
import { Link } from 'react-router-dom';
import { BookOutlined, UserOutlined, DashboardOutlined, WalletOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const path = ['/admin', '/course-manage', '/user-manage', '/wallet-manage'];
const nameOfItem = ['Dashboard', 'Quản lí khóa học', 'Quản lý user', 'Quản lí ví'];
const items = [DashboardOutlined, BookOutlined, UserOutlined, WalletOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: <Link to={path[index]}>{nameOfItem[index]}</Link>,
}));
const SideBar = () => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: 'red',
          height: 50,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Quiz Practice
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[1]} items={items} />
    </Sider>
  );
};

export default SideBar;
