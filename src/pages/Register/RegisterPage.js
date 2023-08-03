import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { Form, Input, Button, DatePicker, Radio } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { authApis } from '../../api';
import './index.css';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: (payload) => authApis.register(payload),
  });

  const onFinish = (values) => {
    const { username, dateOfBirth, password, email, phoneNumber, role } = values;
    const dateOfBirthFormat = new Date(dateOfBirth);
    const day = dateOfBirthFormat.getDate();
    const month = dateOfBirthFormat.getMonth() + 1;
    const year = dateOfBirthFormat.getFullYear();
    const strDateOfBirth = `${day}/${month}/${year}`;

    mutate({ username, date_of_birth: strDateOfBirth, password, email, phone_number: phoneNumber, role });
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      toast.success('Register success');
      navigate('/login');
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Card className="form-card" title="Register account" bordered={false}>
        <Form
          form={form}
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
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: 'Please input your date of birth!',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} placeholder="Date of birth" />
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
          <Form.Item
            name="re-password"
            rules={[
              {
                required: true,
                message: 'Please input your RePassword!',
              },
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="RePassword" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone number" />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: 'Please select role!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="user"> Normal user </Radio>
              <Radio value="expert"> Expert </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
            Or <a href="/login">Login!</a>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Register;
