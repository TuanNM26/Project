import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Descriptions, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import quizApi from '../../../api/quiz/quizApi';
import { useEffect, useState } from 'react';

const UserLessonDetail = (props) => {
  const { lessonDetail } = props;

  console.log(lessonDetail, 'lessonDetail');
  const [quiz, setQuiz] = useState(false);

  const { data, error } = useQuery({
    queryKey: ['QuizDetail', lessonDetail.id],
    queryFn: () => quizApi.getDetail(lessonDetail.id),
    retry: 0,
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (error) {
      setQuiz(false);
    }

    if (data) {
      setQuiz(true);
    }
  }, [data, error]);

  const navigate = useNavigate();

  const onclickQuiz = () => {
    // `lesson/${lessonDetail.id}/quiz`
    navigate('/course/' + lessonDetail.course_id + '/lesson/' + lessonDetail.id + '/quiz', { replace: true });
  };

  return (
    <>
      <Divider>Thông tin bài học</Divider>

      <div>
        <Descriptions bordered size="default">
          <Descriptions.Item key="1" label="Tên bài học">
            {lessonDetail.name}
          </Descriptions.Item>
          <Descriptions.Item key="2" label="Mô tả">
            {lessonDetail.description}
          </Descriptions.Item>
          <Descriptions.Item key="3" label="Số thứ tự">
            {lessonDetail.index}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <Card title="Nội dung bài học" style={{ paddingTop: '20px' }}>
        <iframe title={'PDF-Viewer'} src={lessonDetail.content} style={{ height: '60vh', width: '80%' }}></iframe>
      </Card>

      <Divider>Bài kiểm tra</Divider>
      {quiz ? (
        <div>
          <Button type="primary" onClick={onclickQuiz}>
            Làm bài kiểm tra
          </Button>
        </div>
      ) : (
        <div>
          <Button type="primary" onClick={onclickQuiz} disabled>
            Làm bài kiểm tra
          </Button>
        </div>
      )}
    </>
  );
};

export default UserLessonDetail;
