import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const Error403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="Rất tiếc, Bạn không có quyền vào link này."
    extra={
      <Link to={'/'}>
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
export default Error403;
