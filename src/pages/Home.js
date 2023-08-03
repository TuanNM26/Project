import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/Carousel';
import ListCourse from '../components/ListCourse';
import { useQuery } from '@tanstack/react-query';
import CourseApi from '../api/course/course';
import { Pagination } from 'antd';

const Home = () => {
  const [listCourseFree, setListCourseFree] = useState([]);
  const [listCourse, setListCourse] = useState([]);
  const [totalCourseFree, setTotalCourseFree] = useState(0);
  const [currentPageFree, setCurrentPageFree] = useState(0);
  const [totalCourse, setTotalCourse] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [offsetFree, setOffsetFree] = useState(0);
  const { data: courseFree } = useQuery({
    queryKey: ['courseFree', currentPageFree],
    queryFn: () => CourseApi.getListCourse({ is_free: '1', limit: 4, offset: offsetFree }),
    staleTime: 180000,
    cacheTime: 180000,
  });

  const { data: course } = useQuery({
    queryKey: ['courseNotFee', currentPage],
    queryFn: () => CourseApi.getListCourse({ is_free: '0', limit: 100, offset: offset }),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    console.log(course, '123123123');
    if (course?.data) {
      // const { pagination } = course;
      // const { offset, limit, total } = pagination;
      // setTotalCourse(total);
      setListCourse(
        course.data.map((el) => ({ key: el.id, description: `$${el.price}`, image: el.image, title: el.name })),
      );
    }
  }, [course]);

  useEffect(() => {
    console.log(courseFree);
    if (courseFree?.data) {
      // const { pagination } = course;
      // const { offset, limit, total } = pagination;
      // setTotalCourseFree(total);
      setListCourseFree(
        courseFree.data.map((el) => ({ key: el.id, description: `$${el.price}`, image: el.image, title: el.name })),
      );
    }
  }, [courseFree]);
  console.log(listCourseFree);

  const onChangeFree = (page) => {
    const nextPage = page - currentPageFree;
    console.log(currentPage, 'currentPage');
    console.log(nextPage, 'nextPage');
    if (nextPage > 0) {
      console.log('asdfasdfasd');
      setCurrentPageFree(page);
      setOffsetFree(nextPage * 4);
    }
  };

  const onChange = (page) => {
    console.log(page);
    const nextPage = page - currentPage;
    if (nextPage > 0) {
      setCurrentPage(page);
      setOffset(nextPage * 4);
    }
  };
  return (
    <>
      <CarouselComponent />
      <ListCourse dataFromParent={{ title: 'Danh sách khoá học có phí', courses: listCourse }} />
      {/* <Pagination defaultCurrent={1} total={totalCourse} defaultPageSize={4} onChange={onChange} /> */}
      <ListCourse dataFromParent={{ title: 'Danh sách khoá học miễn phí', courses: listCourseFree }} />
      {/* <Pagination defaultCurrent={1} total={totalCourseFree} defaultPageSize={4} onChange={onChangeFree} /> */}
    </>
  );
};
export default Home;
