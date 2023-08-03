import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import quizResultApi from '../../api/quizResult/quizResultApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { STATUS_RESULT } from '../../constant';
const columns = [
  // {
  //   title: 'Name',
  //   dataIndex: 'name',
  //   key: 'name',
  //   render: (text) => <a>{text}</a>,
  // },
  {
    title: 'Ngày thực hiện',
    dataIndex: 'startedAt',
    key: 'startedAt',
  },
  {
    title: 'Số câu đúng',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Tổng số câu hỏi',
    dataIndex: 'totalQuestion',
    key: 'totalQuestion',
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let txt = '';
          let color = 'geekblue';
          if (tag === STATUS_RESULT.NOT_PASS) {
            color = 'volcano';
            txt = 'Không đạt';
          } else if (tag === STATUS_RESULT.PASS) {
            color = 'green';
            txt = 'Đạt';
          } else {
            color = 'geekblue';
            txt = 'Chưa hoàn thành';
          }
          return (
            <Tag color={color} key={tag}>
              {txt}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Reivew',
    key: 'review',
    render: (_, { hrefQuiz }) => (
      <Space size="middle">
        {/* /lesson/:id/review-quiz/:resultId */}
        <a href={hrefQuiz} target="_blank">
          Review
        </a>
      </Space>
    ),
  },
];

const LessonQuiz = () => {
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const { id: lessonId, courseId } = useParams();
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizPassScore, setQuizPassScore] = useState('');

  const { data } = useQuery({
    queryKey: ['Results'],
    queryFn: () => quizResultApi.getListResult(lessonId),
    retry: 0,
    staleTime: 180000,
    cacheTime: 180000,
  });
  const startQuizMutation = useMutation({
    mutationFn: (payload) => quizResultApi.startQuiz(payload),
  });

  useEffect(() => {
    if (data?.results) {
      console.log(data?.quizInfo, 'data?.results');
      const { results, quizInfo } = data;
      setQuizTitle(quizInfo?.name);
      setQuizDescription(quizInfo?.description);
      setQuizPassScore(quizInfo?.pass_score);

      setDataTable(
        results.map((el) => {
          const startedDate = new Date(Number(el.started_at));
          console.log(startedDate);
          return {
            key: el.id,
            score: el.total_correct,
            status: [el.status],
            hrefQuiz: `/lesson/${lessonId}/review-quiz/${el.id}`,
            startedAt: startedDate.toLocaleString(),
            totalQuestion: quizInfo.total_question,
          };
        }),
      );
    }
  }, [data]);
  const handleStartQuiz = () => {
    startQuizMutation.mutate(
      {
        course_id: courseId,
        lesson_id: lessonId,
      },
      {
        onSuccess: (data) => {
          console.log(data, 'Quiz data');
          if (data?.resultInfo) {
            const { course_id, lesson_id, id } = data?.resultInfo;
            navigate('/lesson/' + lesson_id + '/start-quiz/' + id);
            toast.success('Thanh cong');
          }
        },
      },
    );
  };
  return (
    <>
      <h1>{quizTitle}</h1>
      <p>{quizDescription}</p>
      <p>Cần phải trả lời đúng {quizPassScore} câu hỏi để đạt bài kiểm tra</p>
      <Table columns={columns} dataSource={dataTable} />
      <Button type="primary" onClick={handleStartQuiz}>
        Làm bài kiểm tra
      </Button>
    </>
  );
};

export default LessonQuiz;
