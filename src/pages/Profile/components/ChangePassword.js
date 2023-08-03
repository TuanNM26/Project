import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Form, Input } from 'antd';
import { authApis } from '../../../api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const layout = {
  labelCol: {
    span: 8,
    style: {
      textAlign: 'left',
    },
  },
  wrapperCol: {
    span: 16,
  },
};

const ChangePassword = (props) => {
  const { paramUser } = props;
  const [userId, setUserId] = useState('');
  const { mutate } = useMutation({
    mutationFn: (payload) => authApis.changePassword(payload),
  });
  useEffect(() => {
    if (paramUser?.id) {
      setUserId(paramUser?.id);
    }
  }, [paramUser]);

  const onFinish = (values) => {
    const { current_password, new_password } = values;
    mutate(
      { userId, currentPassword: current_password, newPassword: new_password },
      {
        onSuccess: () => {
          toast.success('Change password success!');
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      },
    );
  };

  return (
    <>
      <Divider>Thay Đổi Mật Khẩu</Divider>
      <Form
        {...layout}
        name="change-password"
        onFinish={onFinish}
        style={{
          width: 600,
          textAlign: 'center',
        }}
      >
        <Form.Item
          name="current_password"
          label="Mật khẩu hiện tại"
          style={{
            textAlign: 'center',
          }}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu hiện tại',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="Mật khẩu mới"
          style={{
            textAlign: 'center',
          }}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu mới',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="Xác nhận mật khẩu mới"
          style={{
            textAlign: 'center',
          }}
          dependencies={['new_password']}
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận mật khẩu mới',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
          style={{
            textAlign: 'center',
          }}
        >
          <Button type="primary" htmlType="submit">
            Đổi Mật Khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
