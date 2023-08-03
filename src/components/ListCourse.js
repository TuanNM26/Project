import React from 'react';
import { Col, Divider, Row, Pagination } from 'antd';
import CardComponent from './Card';
import { Link } from 'react-router-dom';

const style = { padding: '8px 0' };

const ListCourse = (props) => {
  const { title, courses } = props.dataFromParent;
  const onChange = (page) => {
    console.log(page);
  };
  const onClick = (key) => {
    console.log(key);
  };
  return (
    <>
      <Divider orientation="left">
        <h1>{title}</h1>
      </Divider>
      {courses?.length === 0 ? (
        <p>Không có khoá học nào</p>
      ) : (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {courses.map((course) => (
            <Col className="gutter-row" span={6} key={course.key}>
              <Link to={`/view-course/${course.key}`}>
                <div style={style} onClick={() => onClick(course.key)}>
                  <CardComponent dataFromParent={course} />
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      )}

      {/* <Pagination defaultCurrent={1} total={30} defaultPageSize={4} onChange={onChange} /> */}
    </>
  );
};

export default ListCourse;
