import React, { useState } from 'react';
import { Col, Row, Steps, Collapse } from 'antd';

function App() {
  const description = 'This is a description.';
  return (
    <>
      <Row>
        <Col flex="1 1 200px">
          <h1>PPTX Viewer</h1>
          <h2>{description}</h2>
          <iframe
            title={'PDF-Viewer'}
            src={`http://localhost:4000/uploads/CSS.pdf`}
            style={{ height: '100vh', width: '80%' }}
          ></iframe>
        </Col>
      </Row>
    </>
  );
}

export default App;
