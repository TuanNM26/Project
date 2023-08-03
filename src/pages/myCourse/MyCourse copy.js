import { Col, Divider, Row, Progress, Tag } from 'antd';
import CardComponent from '../../components/Card';
import CreateCourseComponent from '../../components/CreateCourse';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../api/user/user';
import { useEffect, useState } from 'react';
import CourseApi from '../../api/course/course';
import { Link } from 'react-router-dom';
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

const MyCourse = () => {
  // TODO: Call Apis get role if use => isExpert = false expert isExpert = true
  // const isExpert = true;
  const [isExpert, setIsExpert] = useState(false);
  const [userId, setUserId] = useState('');
  const [coursesDone, setCourseDone] = useState([]);
  const [courses, setCourses] = useState([]);
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  const { data: dataCourse } = useQuery({
    queryKey: ['list-course-draft', userId],
    queryFn: () => CourseApi.getListCourseOfUser({ status: 'Draft' }),
    staleTime: 180000,
    cacheTime: 180000,
  });

  const { data: dataCoursePublish } = useQuery({
    queryKey: ['list-course-publish', userId],
    queryFn: () => CourseApi.getListCourseOfUser({ status: 'Published' }),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (dataCoursePublish?.data) {
      setCourseDone(
        dataCoursePublish?.data.map((el) => {
          return {
            id: el.id,
            title: el.name,
            image: el.image,
            description: (
              <div style={{ width: '100%' }}>
                <p>Tạo ngày: {el.created_at}</p>
                {/* <Progress percent={99} size="small" /> */}
                <Tag color="Green" key="Published">
                  Published
                </Tag>
              </div>
            ),
          };
        }),
      );
    }
  }, [dataCoursePublish]);

  useEffect(() => {
    if (dataCourse?.data) {
      setCourses(
        dataCourse?.data.map((el) => {
          return {
            id: el.id,
            title: el.name,
            image: el.image,
            description: (
              <div style={{ width: '100%' }}>
                <p>Tạo ngày: {el.created_at}</p>
                {/* <Progress percent={99} size="small" /> */}
                <Tag color="Red" key="Draft">
                  Draft
                </Tag>
              </div>
            ),
          };
        }),
      );
    }
  }, [dataCourse]);

  useEffect(() => {
    if (data?.user) {
      if (data.user.role === 'expert') {
        setIsExpert(true);
        setUserId(data.user.id);
      }
    }
  }, [data]);
  return (
    <div style={{ textAlign: 'left' }}>
      <h2>Khoá học của tôi</h2>
      {isExpert ? <CreateCourseComponent params={userId} /> : <p></p>}
      <div>
        <Divider orientation="left">{isExpert ? <h1>Khoá học đã public</h1> : <h1>Khoá học đã hoàn thành</h1>}</Divider>

        {coursesDone.length === 0 ? (
          <h1>{isExpert ? 'Bạn chưa public khóa học nào' : 'Bạn chưa hoàn thành khóa học nào '}</h1>
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

      <div>
        <Divider orientation="left">
          {isExpert ? <h1>Khoá học chưa được public</h1> : <h1>Khoá học chưa hoàn thành</h1>}
        </Divider>
        {courses.length === 0 ? (
          <h1>{isExpert ? 'Không có khóa học nào ' : 'Không có khóa học chưa được hoàn thành nào '}</h1>
        ) : (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {courses.map((course, index) => (
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

export default MyCourse;
