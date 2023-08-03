import { Col, Divider, Row, Tag } from 'antd';
import CardComponent from '../../../components/Card';
import CreateCourseComponent from '../../../components/CreateCourse';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../../api/user/user';
import { useEffect, useState } from 'react';
import CourseApi from '../../../api/course/course';
import { Link } from 'react-router-dom';


const style = { padding: '8px 0' };

const ExpertCourses = () => {
  const [userId, setUserId] = useState('');
  const [coursesDone, setCourseDone] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesProcess, setCoursesProcess] = useState([]);
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

  const { data: dataCourseProcessing } = useQuery({
    queryKey: ['list-course-process', userId],
    queryFn: () => CourseApi.getListCourseOfUser({ status: 'Processing' }),
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
                <Tag color="Green" key="Published">
                  Đã công khai
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
                <Tag color="Red" key="Draft">
                  Nháp
                </Tag>
              </div>
            ),
          };
        }),
      );
    }
  }, [dataCourse]);

  useEffect(() => {
    if (dataCourseProcessing?.data) {
      if (dataCourseProcessing?.data.length > 0) {
        setCoursesProcess(
          dataCourseProcessing?.data.map((el) => {
            return {
              id: el.id,
              title: el.name,
              image: el.image,
              description: (
                <div style={{ width: '100%' }}>
                  <p>Tạo ngày: {el.created_at}</p>
                  <Tag color="blue" key="Processing">
                    Đang xử lý
                  </Tag>
                </div>
              ),
            };
          }),
        );
      }
    }
  }, [dataCourseProcessing]);
  console.log(dataCourseProcessing, 'sadfasdfasdfasdataCourseProcessing');

  useEffect(() => {
    if (data?.user) {
      if (data.user.role === 'expert') {
        setUserId(data.user.id);
      }
    }
  }, [data]);
  return (
    <div style={{ textAlign: 'left' }}>
      <h2>Khoá học của tôi</h2>
      <CreateCourseComponent params={userId} />
      <div>
        <Divider orientation="left">
          <h1>Khoá học đã public</h1>
        </Divider>

        {coursesDone.length === 0 ? (
          <h3>'Bạn chưa public khóa học nào'</h3>
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
          <h1>Khoá học đang chờ xử lý </h1>
        </Divider>

        {coursesProcess.length === 0 ? (
          <h3>Bạn không có khóa học nào đang chờ xử lý</h3>
        ) : (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {coursesProcess.map((course, index) => (
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
          <h1>Khoá học chưa được public</h1>
        </Divider>
        {courses.length === 0 ? (
          <h3>Không có khóa học nào</h3>
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

export default ExpertCourses;
