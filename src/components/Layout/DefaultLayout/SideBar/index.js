import React from 'react';
import { Link } from 'react-router-dom';
import { BarChartOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const path = ['/', '/my-course', '/'];
const nameOfItem = ['Trang chủ', 'Khoá học của tôi', 'Khoá học'];
const items = [VideoCameraOutlined, UserOutlined, BarChartOutlined].map((icon, index) => ({
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
    </Sider>
  );
};

export default SideBar;
