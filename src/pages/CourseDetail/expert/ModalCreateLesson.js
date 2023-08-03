import { Button, Modal, Form, Input, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userApi from '../../../api/user/user';
import lessonApi from '../../../api/lesson/lessonApi';
import { toast } from 'react-toastify';
const ModalCreateLesson = (props) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileImageCourse, setFileImageCourse] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (props.isModalOpen) {
      setIsModalOpen(true);
    }
  }, [props.isModalOpen]);
  const params = useParams();
  const { id } = params;

  const { data: dataUser } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (dataUser?.user?.id) {
      setUserId(dataUser?.user?.id);
    }
  }, [dataUser]);

  const { mutate } = useMutation({
    mutationFn: (payload) => lessonApi.createLesson(payload),
  });
  const handleOk = () => {
    const values = form.getFieldsValue();
    mutate(
      { ...values, createdBy: userId, courseId: id, content: fileImageCourse },
      {
        onSuccess: (data) => {
          toast.success('Tạo bài học thành công');
          queryClient.invalidateQueries('CourseDetail', id);
          setIsModalOpen(false);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      },
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileImageCourse(newFileList[0].originFileObj);
    // const fileImageBase64 = await getBase64(newFileList[0].originFileObj);
  };
  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form}>
          <Form.Item label="Tên bài học" name="lessonName">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item name="lessonFile" label="Tài liệu khoá học" values={fileImageCourse}>
            <Upload listType="picture" defaultFileList={[]} className="upload-list-inline" onChange={handleChange}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateLesson;
