import React from 'react';
import { Routes, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { BarChartOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Input } from 'antd';
import './App.css';
import HomePage from './pages/Home';
import CourseDetailPage from './pages/CourseDetail';
import MyCoursePage from './pages/MyCourse';
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const path = ['/', 'my-course', '/'];
const nameOfItem = ['Trang chủ', 'Khoá học của tôi', 'Khoá học'];
const items = [VideoCameraOutlined, UserOutlined, BarChartOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: <Link to={path[index]}>{nameOfItem[index]}</Link>,
}));

const onSearch = (value) => console.log(value);

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Router>
      <Layout hasSider>
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
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{
                width: 400,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/course" element={<CourseDetailPage />} />
                <Route path="/my-course" element={<MyCoursePage />} />
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Quiz Practice ©2023 Created by Team 5 - SWP391
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
