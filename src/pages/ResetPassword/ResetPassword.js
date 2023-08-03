import React, { useEffect } from 'react';
import { Card } from 'antd';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './index.css';
import { useMutation } from '@tanstack/react-query';
import { authApis } from '../../api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const validatePassword = (_, value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const passwordErrorMessage =
      'Password must be at least 8 characters long, contain at least one uppercase letter, and include at least one special character.';

    const { getFieldValue } = form;
    if (!value) {
      return Promise.reject(new Error('Passwords not empty.'));
    }
    if (value && !passwordRegex.test(value)) {
      return Promise.reject(new Error(passwordErrorMessage));
    }
    if (value && value !== getFieldValue('password')) {
      return Promise.reject(new Error('Passwords do not match.'));
    }
    return Promise.resolve();
  };

  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: (payload) => authApis.resetPassword(payload),
  });
  const { search } = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get('token');
  const onFinish = (values) => {
    const { password } = values;
    mutate({ userId: id, newPassword: password, token });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Reset password success!');
      navigate('/login');
    }
    if (isError) {
      toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);
  const [form] = Form.useForm();

  return (
    <Card className="form-card" title="Forgot password" bordered={false}>
      <Form
        form={form}
        name="normal_reset-password"
        className="reset-password-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item name="password" rules={[{ validator: validatePassword }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            type="password"
          />
        </Form.Item>
        <Form.Item name="rePassword" rules={[{ validator: validatePassword }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Re-Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="reset-password-form-button">
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ResetPassword;
