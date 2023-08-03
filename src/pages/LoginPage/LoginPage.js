import React from 'react';
import { Card } from 'antd';
import './index.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApis } from '../../api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (payload) => authApis.login(payload),
  });
  const onFinish = (values) => {
    const { username, password } = values;
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success('Login success!');

          Cookies.set('accessToken', data?.accessToken);
          if (data?.role === 'admin') {
            console.log('is admin');
            navigate('/admin');
          } else {
            navigate('/');
          }
        },
        onError: (error) => {
          console.log(error?.response?.data?.message, 'error?.response?.data?.message');
          toast.error(error?.response?.data?.message);
        },
      },
    );
  };

  return (
    <Card className="form-card" title="Login" bordered={false}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="/forgot-password">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
