import { Divider, Card } from 'antd';

const UserCourseInfo = (props) => {
  const { courseInfo } = props;

  return (
    <>
      <Divider>{courseInfo.name}</Divider>
      <p>{courseInfo.description}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          hoverable
          style={{
            width: '50%',
          }}
          cover={<img alt="image course" src={courseInfo.image} />}
        >
          {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
        </Card>
      </div>
    </>
  );
};
export default UserCourseInfo;
