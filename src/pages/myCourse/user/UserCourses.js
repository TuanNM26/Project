import { Col, Divider, Row, Tag } from 'antd';
import CardComponent from '../../../components/Card';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../../api/user/user';
import { useEffect, useState } from 'react';
import CourseApi from '../../../api/course/course';
import { Link } from 'react-router-dom';
import userCourseApi from '../../../api/userCourse/userCourseApi';
// const coursesDone = [
//   {
//     image: 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png',
//     title: 'HTML CSS Pro',
//     description: (
//       <div style={{ width: '100%' }}>
//         <p>Học cách đây 2 tháng trước</p>
//         <Progress percent={100} size="small" />
//       </div>
//     ),
//   },
// ];

// const courses = [
//   {
//     image: 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png',
//     title: 'HTML CSS Pro',
//     description: (
//       <div style={{ width: '100%' }}>
//         <p>Học cách đây 2 tháng trước</p>
//         <Progress percent={99} size="small" />
//       </div>
//     ),
//   },
// ];

const style = { padding: '8px 0' };

const UserCourses = () => {
  const [userId, setUserId] = useState('');
  const [coursesDone, setCourseDone] = useState([]);
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  const { data: dataUserCourse } = useQuery({
    queryKey: ['user-courses', userId],
    queryFn: () => userCourseApi.getListUserCourse(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  console.log(dataUserCourse);

  useEffect(() => {
    if (dataUserCourse?.listCourses) {
      console.log(dataUserCourse?.listCourses, 'dataUserCourse?.data');
      setCourseDone(
        dataUserCourse?.listCourses.map((el) => {
          const { courseInfo } = el;
          return {
            id: courseInfo.id,
            title: courseInfo.name,
            image: courseInfo.image,
            description: (
              <div style={{ width: '100%' }}>
                <p>Tạo ngày: {courseInfo.created_at}</p>
              </div>
            ),
          };
        }),
      );
    }
  }, [dataUserCourse]);

  useEffect(() => {
    if (data?.user) {
      setUserId(data.user.id);
    }
  }, [data]);
  return (
    <div style={{ textAlign: 'left' }}>
      <h2>Khoá học của tôi</h2>
      <div>
        <Divider orientation="left">
          <h1>Khoá học của tôi</h1>
        </Divider>

        {coursesDone.length === 0 ? (
          <h4>Bạn chưa public khóa học nào</h4>
        ) : (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {coursesDone.map((course, index) => (
              <Col className="gutter-row" span={6} key={index}>
                <Link to={`/course/${course.id}`}>
                  <div style={style}>
                    <CardComponent dataFromParent={course} />
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default UserCourses;
