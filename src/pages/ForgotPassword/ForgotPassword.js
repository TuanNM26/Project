import React, { useEffect } from 'react';
import { Card } from 'antd';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './index.css';
import { useMutation } from '@tanstack/react-query';
import { authApis } from '../../api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { mutate } = useMutation({
    mutationFn: (payload) => authApis.forgotPassword(payload),
  });
  const onFinish = (values) => {
    const { email } = values;
    mutate(
      { email },
      {
        onSuccess: () => {
          toast.success('Forgot password success!');
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      },
    );
  };

  return (
    <Card className="form-card" title="Forgot password" bordered={false}>
      <Form
        name="normal_forgot-password"
        className="forgot-password-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Username" type="email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="forgot-password-form-button">
            Send new password to email
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
