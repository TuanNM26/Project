import { PlusCircleOutlined, InfoCircleOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Menu, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import CourseInfo from './expert/CourseInfo';
import { useQuery } from '@tanstack/react-query';
import CourseApi from '../../api/course/course';
import { useParams } from 'react-router-dom';
import ModalCreateLesson from './expert/ModalCreateLesson';
import LessonDetail from './expert/LessonDetail';
import userApi from '../../api/user/user';
import UserCourseInfo from './user/UserCourseInfo';
import UserLessonDetail from './user/UserLessonDetail';

const CourseItem = () => {
  const params = useParams();
  const { id } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [isShowInfo, setIsShowInfo] = useState(true);
  const [subItems, setSubItems] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});
  const [lessonDetail, setLessonDetail] = useState({});
  const [lessons, setLessons] = useState([]);
  const [isExpert, setIsExpert] = useState(false);

  const handleClickSub = (e) => {
    const { key } = e;
    if (key === 'sub3') {
      setIsShowInfo(true);
    }
    if (key === 'sub2') {
      setIsModalOpen(true);
    }
  };

  const { data } = useQuery({
    queryKey: ['CourseDetail', id],
    queryFn: () => CourseApi.courseDetail(id),
    staleTime: 180000,
    cacheTime: 180000,
  });

  const { data: dataUserInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (dataUserInfo?.user) {
      if (dataUserInfo.user.role === 'expert') {
        console.log('Is Expert');
        setIsExpert(true);
      }
    }
  }, [dataUserInfo]);

  useEffect(() => {
    if (data?.id) {
      if (data?.lessons?.length > 0) {
        setLessons(data.lessons);
        setSubItems(
          data.lessons.map((el) => {
            return getItem(el.name, `${el.id}`, null, null, null, handleClickShowLesson(data.lessons));
          }),
        );
      }

      setCourseInfo({ name: data.name, description: data.description, image: data.image, price: data.price });
    }
  }, [data]);

  const handleClickShowLesson = (lessonData) => (e) => {
    const { key } = e;
    setIsShowInfo(false);
    const result = lessonData.find((obj) => obj.id === key);
    const { content, course_id, description, id, image, index, name } = result;
    setLessonDetail({ content, course_id, description, id, image, index, name });
  };

  const items = [
    getItem('Thông tin khoá học', 'sub3', <InfoCircleOutlined />, null, null, handleClickSub),
    getItem('Danh sách bài học', 'sub1', <OrderedListOutlined />, subItems),
  ];

  if (isExpert) {
    items.push(getItem('Thêm mới lesson', 'sub2', <PlusCircleOutlined />, null, null, handleClickSub));
  }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Row>
        <Col span={6}>
          <div>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              defaultSelectedKeys="sub3"
              style={{
                width: 256,
              }}
              items={items}
            />
          </div>
        </Col>
        <Col span={18}>
          {isExpert ? (
            <div>
              {isShowInfo ? <CourseInfo courseInfo={courseInfo} /> : <LessonDetail lessonDetail={lessonDetail} />}
            </div>
          ) : (
            <div>
              {isShowInfo ? (
                <UserCourseInfo courseInfo={courseInfo} />
              ) : (
                <UserLessonDetail lessonDetail={lessonDetail} />
              )}
            </div>
          )}
        </Col>
        <ModalCreateLesson isModalOpen={isModalOpen}></ModalCreateLesson>
      </Row>
    </>
  );
};

function getItem(label, key, icon, children, type, onClick) {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  };
}
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
export default CourseItem;
