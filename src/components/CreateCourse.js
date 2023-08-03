import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import UploadImage from './Upload';
import { useMutation } from '@tanstack/react-query';
import CourseApi from '../api/course/course';
import { toast } from 'react-toastify';

const { Option } = Select;
const CreateCourse = (props) => {
  const { params: userId } = props;
  const [form] = Form.useForm();
  const [fileImageCourse, setFileImageCourse] = useState({});
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: (payload) => CourseApi.createCourse(payload),
  });

  const onSubmit = () => {
    const values = form.getFieldsValue();
    const { nameCourse, description, price, imageCourse } = values;
    mutate(
      { name: nameCourse, image: imageCourse, description, price, created_by: userId },
      {
        onSuccess: () => {
          toast.success('create success');
        },
        onError: (error) => {
          console.log(error?.response?.data?.message);
          toast.error(error?.response?.data?.message[0]);
        },
      },
    );
    setOpen(false);
  };
  const getFile = (file) => {
    setFileImageCourse(file);
  };

  // const onFinish = (values) => {
  //   console.log(values);
  // };

  return (
    <>
      <Button type="primary" size="large" icon={<PlusOutlined />} onClick={showDrawer}>
        Tạo khoá học
      </Button>
      <Form layout="vertical" hideRequiredMark form={form}>
        <Drawer
          title="Tạo khoá học mới"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          extra={
            <Space>
              <Form.Item>
                <Button onClick={onClose}>Huỷ bỏ</Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={onSubmit} type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Space>
          }
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="nameCourse"
                label="Tên khoá học"
                rules={[
                  {
                    required: true,
                    message: 'Phải nhập tên khoá học',
                  },
                ]}
              >
                <Input placeholder="Nhập tên khoá học" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="imageCourse"
                label="Ảnh khoá học"
                value={fileImageCourse}
                rules={[
                  {
                    required: false,
                    message: '',
                  },
                ]}
              >
                <UploadImage onChange={getFile} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá khoá học"
                rules={[
                  {
                    required: true,
                    message: 'Nhập giá của khoá học',
                  },
                ]}
              >
                <Input placeholder="Nhập giá của khoá học" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại khoá học"
                rules={[
                  {
                    required: true,
                    message: 'Phải chọn loại của khoá học',
                  },
                ]}
              >
                <Select name="type" placeholder="Phải chọn loại khoá học" defaultValue="free">
                  <Option value="free">Miễn phí</Option>
                  <Option value="charge">Mất phí</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Drawer>
      </Form>
    </>
  );
};
export default CreateCourse;
