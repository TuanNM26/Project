import { Button, Descriptions, Form, Input, Modal, Result } from 'antd';
import { useEffect, useState } from 'react';
import { ShareAltOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import CourseApi from '../../../api/course/course';
import { STATUS_COURSE } from '../../../constant';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
const onFinish = (values) => {
  console.log('Success:', values);
};

const CourseInfo = (props) => {
  const { courseInfo } = props;
  const { id } = useParams();
  const [isModelEditOpen, setIModelEditOpen] = useState(false);
  const [isModelPublishOpen, setIModelPublishOpen] = useState(false);
  const [form] = Form.useForm();

  const updateStatusCourseMutation = useMutation({
    mutationFn: (payload) => CourseApi.updateStatusCourse(payload),
  });

  useEffect(() => {
    if (courseInfo?.name) {
      form.setFieldsValue({
        courseName: courseInfo.name,
        description: courseInfo.description,
        price: courseInfo.price,
      });
    }
  }, [courseInfo]);

  const showModalLesson = () => {
    setIModelEditOpen(true);
  };
  const handleLessonOk = () => {
    const values = form.getFieldsValue();
    const { lessonName, description, index } = values;
    // updateInfoLessonMutation.mutate(
    //   { name: lessonName, description, index: Number(index), lessonId: lessonDetail.id },
    //   {
    //     onSuccess: (data) => {
    //       queryClient.invalidateQueries('CourseDetail', lessonDetail.course_id);
    //       toast.success('Tạo mới bài kiểm tra thành công!');
    //     },
    //     onError: (error) => {
    //       toast.error(
    //         Array.isArray(error?.response?.data?.message)
    //           ? error?.response?.data?.message[0]
    //           : error?.response?.data?.message,
    //       );
    //     },
    //   },
    // );
    setIModelEditOpen(false);
  };
  const handleLessonCancel = () => {
    setIModelEditOpen(false);
  };

  const showModelPublish = () => {
    setIModelPublishOpen(true);
  };
  const handlePublishCancel = () => {
    setIModelPublishOpen(false);
  };
  const handlePublishOk = () => {
    updateStatusCourseMutation.mutate(
      { course_id: id, status: STATUS_COURSE.PROCESSING_REQUEST },
      {
        onSuccess: (data) => {
          toast.success('Gửi yêu cầu thành công!');
        },
        onError: (error) => {
          toast.error(
            Array.isArray(error?.response?.data?.message)
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message,
          );
        },
      },
    );
    setIModelPublishOpen(false);
  };

  return (
    <>
      <div>
        <Descriptions
          bordered
          size="default"
          extra={[
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="primary" onClick={showModalLesson} style={{ margin: 10 }}>
                Cập nhật
              </Button>
              <Button icon={<ShareAltOutlined />} onClick={showModelPublish}>
                Chia sẻ khoá học
              </Button>
            </div>,
          ]}
        >
          <Descriptions.Item key="1" label="Tên bài học">
            {courseInfo.name}
          </Descriptions.Item>
          <Descriptions.Item key="2" label="Mô tả">
            {courseInfo.description}
          </Descriptions.Item>
          <Descriptions.Item key="3" label="Giá">
            {courseInfo.price}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Modal title="Sửa bài học" open={isModelEditOpen} onOk={handleLessonOk} onCancel={handleLessonCancel}>
        <Form
          form={form}
          name="basic"
          style={{
            maxWidth: '100%',
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="courseName"
            label="Tên khoá học"
            rules={[
              {
                required: true,
                message: 'Tên khoá học không được để trống',
              },
            ]}
          >
            <Input
              placeholder="Tên khoá học"
              style={{ border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold' }}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your password!',
            //   },
            // ]}
          >
            <Input placeholder="Mô tả khoá học" style={{ border: 'none', outline: 'none', fontSize: '12px' }} />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số thứ tự của khoá học',
              },
              { validator: validateNumber },
            ]}
          >
            <Input placeholder="Số thứ tự" style={{ border: 'none', outline: 'none', fontSize: '12px' }} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Basic Modal" open={isModelPublishOpen} onOk={handlePublishOk} onCancel={handlePublishCancel}>
        <Result title="Bạn có thực sự muốn chia sẻ khoá học này không?" />
      </Modal>
    </>
  );
};

const validateNumber = (rule, value, callback) => {
  const numberPattern = /^\d+$/; // Regular expression to match numeric input
  if (!numberPattern.test(value)) {
    callback('Chỉ được nhập số');
  } else {
    callback();
  }
};
export default CourseInfo;
