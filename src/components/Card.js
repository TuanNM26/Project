import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CardCourse = (props) => {
  const { image, title, description } = props.dataFromParent;

  return (
    <>
      <Card hoverable style={{ width: '100%' }} cover={<img alt="example" src={image} style={{ height: 200 }} />}>
        <Meta title={title} description={description} />
      </Card>
    </>
  );
};

export default CardCourse;
