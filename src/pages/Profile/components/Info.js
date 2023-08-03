import { Button, Divider, Form, Input } from 'antd';
import { useEffect } from 'react';

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

const onFinish = (values) => {
  console.log(values);
};
const validateMessages = {
  // ... validateMessages content ...
};

const ProfileInfo = (props) => {
  const [form] = Form.useForm();
  const { paramUser } = props;

  useEffect(() => {
    if (paramUser?.username) {
      form.setFieldsValue(paramUser);
    }
  }, [paramUser]);

  return (
    <>
      <Divider>Thông Tin Cá Nhân</Divider>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          width: 600,
          textAlign: 'center',
        }}
        validateMessages={validateMessages}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          style={{
            textAlign: 'center',
          }}
          rules={[
            {
              message: 'Please enter your first name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          style={{
            textAlign: 'center',
          }}
          rules={[
            {
              message: 'Please enter your last name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Number"
          style={{
            textAlign: 'center',
          }}
          rules={[
            {
              message: 'Please enter your phone number',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          style={{
            textAlign: 'center',
          }}
          rules={[
            {
              message: 'Please enter your email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input />
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
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileInfo;
