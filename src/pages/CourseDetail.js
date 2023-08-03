import { Col, Row, Button, Modal } from 'antd';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import CourseApi from '../api/course/course';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import userCourseApi from '../api/userCourse/userCourseApi';
import { toast } from 'react-toastify';

const treeData = [
  {
    title: '1. Khái niệm kĩ thuật cần biết',
    key: '0-0',
    children: [
      {
        title: '1. Mô hình Client - Server là gì?',
        key: '0-0-0',
      },
      {
        title: '2. Domain là gì? Tên miền là gì?',
        key: '0-0-1',
      },
    ],
  },

  {
    title: '2. Môi trường, con người IT',
    key: '0-1',
    children: [
      {
        title: '3. Học IT cần tố chất gì?',
        key: '0-1-0',
      },
      {
        title: '4. Sinh viên IT đi thực tập tại doanh nghiệp cần chuẩn bị những gì?',
        key: '0-1-1',
      },
    ],
  },
];

const CourseDetail = () => {
  const [isModalOpen, setIsModelOpen] = useState(false);

  const { id } = useParams();
  const [course, setCourse] = useState({});

  const buyCourseMutation = useMutation({
    mutationFn: (payload) => userCourseApi.buyCourse(payload),
  });

  const { data } = useQuery({
    queryKey: ['CourseDetail', id],
    queryFn: () => CourseApi.courseDetail(id),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    console.log(data);
    if (data?.name) {
      setCourse({ name: data.name, description: data.description, image: data.image, price: data.price });
    }
  }, [data]);
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const handleActiveCancel = () => {
    setIsModelOpen(false);
  };
  const showModal = () => {
    setIsModelOpen(true);
  };

  const handleActiveOk = () => {
    buyCourseMutation.mutate(
      {
        course_id: id,
      },
      {
        onSuccess: (data) => {
          toast.success('Đăng ký khoá học thành công');
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
    setIsModelOpen(false);
  };
  return (
    <>
      <Row>
        <Col span={16}>
          <div style={{ textAlign: 'left' }}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <h1>Bạn học được gì từ khoá học</h1>
            <ul>
              <li>
                {/* <CheckOutlined /> */}
                Các kiến thức cơ bản, nền móng của ngành IT
              </li>
              <li>
                {/* <CheckOutlined /> */}
                Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng
              </li>
              <li>
                {/* <CheckOutlined /> */}
                Hiểu hơn về cách internet và máy vi tính hoạt động
              </li>
              <li>
                {/* <CheckOutlined /> */}
                Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng
              </li>
            </ul>
            <h1>Nội dung khoá học</h1>
            <Tree
              showLine
              switcherIcon={<DownOutlined />}
              defaultExpandedKeys={['0-0-0']}
              onSelect={onSelect}
              treeData={treeData}
            />
          </div>
        </Col>
        <Col span={8}>
          <h2>Thông tin</h2>
          <img alt="Course" src={course.image} style={{ width: '100%', borderRadius: 10 }} />
          {course?.price > 0 ? <h1>{`$${course.price}`}</h1> : <h1>Miễn phí</h1>}
          <Button type="primary" shape="round" size="large" onClick={showModal}>
            Đăng ký ngay
          </Button>
        </Col>
      </Row>

      <Modal title="Active user" open={isModalOpen} onOk={handleActiveOk} onCancel={handleActiveCancel}>
        <p>Bạn có thực sự muốn mua khoá học</p>
      </Modal>
    </>
  );
};
export default CourseDetail;
