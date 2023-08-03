import React from 'react';
import { Layout, theme } from 'antd';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
const { Content } = Layout;

const DefaultLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <SideBar />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header />
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
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
