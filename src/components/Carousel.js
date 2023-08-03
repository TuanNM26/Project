import { Carousel } from 'antd';
const contentStyle = {
  height: '260px',
  color: '#fff',
  lineHeight: '260px',
  textAlign: 'center',
  background: '#364d79',
};
const CarouselCourse = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>Khoá học NodeJs cho người mới bắt đầu</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Khoá học React cơ bản</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Khoá học HTML/CSS từ cơ bản đến nâng cao</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Khoá học Database cho người mới bắt đầu </h3>
    </div>
  </Carousel>
);
export default CarouselCourse;
