import React, { useEffect, useState } from 'react';
import { LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { Layout, Input, theme, Button, Dropdown, Space } from 'antd';
import AvatarComponent from '../../../Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../../../api/user/user';
const { Header: HeaderAntd } = Layout;
const { Search } = Input;

const onSearch = (value) => console.log(value);

const Header = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isLogin, setIsLogin] = useState('false');
  const accessToken = Cookies.get('accessToken');
  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  const items = [
    {
      key: 1,
      label: <Link to={`/profile/${data?.user?.id}`}>Thông tin cá nhân</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 2,
      label: <Link to={`/wallet/${data?.user?.id}`}>Thông tin ví</Link>,
      icon: <WalletOutlined />,
    },

    {
      key: 3,
      label: (
        <a rel="noopener noreferrer" href="/login">
          Logout
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <HeaderAntd
      style={{
        padding: 0,
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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

      <div
        style={{
          marginLeft: 10,
          position: 'absolute',
          right: '40px',
        }}
      >
        {isLogin ? (
          <Dropdown
            menu={{
              items,
            }}
          >
            <Space>
              <AvatarComponent />
            </Space>
          </Dropdown>
        ) : (
          <Button onClick={navigateToLogin} type="primary">
            Login
          </Button>
        )}
      </div>
    </HeaderAntd>
  );
};

export default Header;
