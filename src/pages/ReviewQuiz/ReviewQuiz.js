import React, { useEffect, useState } from 'react';
import QuizSidebar from './sideBarRight';
import ErrorPage from '../Error/500';
import './QuizPractice.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import quizResultApi from '../../api/quizResult/quizResultApi';
import { Form, Radio, Space, Checkbox, Alert } from 'antd';
import { QUESTION_TYPE } from '../../constant';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReviewQuiz = () => {
  const { id, resultId } = useParams();
  const queryClient = useQueryClient();

  console.log({ id, resultId }, '{ id, resultId }');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionsSelected, setQuestionsSelected] = useState([]);
  const [quizInfo, setQuizInfo] = useState({});
  const [endAt, setEndAt] = useState(null);
  const [isError, setIsError] = useState(false);

  const { data, error } = useQuery({
    queryKey: ['review-result-quiz', resultId],
    queryFn: () => quizResultApi.reviewQuiz(resultId),
    retry: 1,
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
    if (data?.result) {
      console.log(data, 'dafadfasdfsdf');
      const { result } = data;
      const { quizQuestions } = result;
      const { question } = quizQuestions;
      console.log('quizQuestions', question);
      const listQuestions = quizQuestions.map((el) => {
        const { question } = el;
        return question;
      });
      setQuizInfo(quizInfo);
      setQuestions(listQuestions);
      setAnswers(listQuestions[currentQuestion].answers);
      setQuestionsSelected(
        quizQuestions.map((el) => ({
          question_id: el.question_id,
          selectedAnswer: JSON.parse(el.selected_answer) || [],
        })),
      );
    }
  }, [data, error]);

  console.log(questionsSelected, 'question selected');

  const handleRadioChange = (e) => {
    setQuestionsSelected(
      questionsSelected.map((el) => {
        if (el.question_id === questions[currentQuestion].id) {
          return { question_id: questions[currentQuestion].id, selectedAnswer: [e.target.value] };
        } else {
          return el;
        }
      }),
    );
  };

  const handleCheckBoxChange = (e) => {
    setQuestionsSelected(
      questionsSelected.map((el) => {
        if (el.question_id === questions[currentQuestion].id) {
          return { question_id: questions[currentQuestion].id, selectedAnswer: e };
        } else {
          return el;
        }
      }),
    );
  };

  const handleQuestionClick = (questionIndex) => {
    // setPreviousIndex(currentQuestion);

    // Chuyển đến câu hỏi được chọn
    setCurrentQuestion(questionIndex);
    setAnswers(questions[questionIndex].answers);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setAnswers(questions[currentQuestion - 1].answers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setAnswers(questions[currentQuestion + 1].answers);
  };

  const handleSubmitQuiz = () => {
    // Xử lý logic khi người dùng hoàn thành làm bài
    // Ví dụ: tính điểm, lưu kết quả, chuyển đến trang kết quả
    alert('ban lam xong r');
  };

  console.log(currentQuestion, 'currentQuestioncurrentQuestion');
  useEffect(() => {
    console.log(questions, 'question state');
    console.log(questionsSelected, 'selected answer');
    {
      console.log(
        questionsSelected[currentQuestion]?.selectedAnswer,
        'questionsSelected[currentQuestion]?.selectedAnswer',
      );
    }
  }, [currentQuestion]);

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1 className="quiz-title">{'quizInfo?.name'}</h1>
      </div>
      <div className="quiz-content">
        <div className="question-list">
          <h2>Câu hỏi {currentQuestion + 1}</h2>
        </div>
        <div className="question-section">
          <Form>
            <h1>{questions[currentQuestion]?.question}</h1>
            {questions[currentQuestion]?.type === QUESTION_TYPE.MULTIPLE_CHOICE ? (
              <Form.Item>
                <Checkbox.Group
                  onChange={handleCheckBoxChange}
                  value={questionsSelected[currentQuestion]?.selectedAnswer}
                >
                  <Space direction="vertical">
                    {answers.map((answer) => (
                      <Checkbox value={answer.id} key={answer.id} disabled={true}>
                        {answer.is_correct ? <Alert message={answer.content} type="success" /> : <>{answer.content}</>}
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            ) : (
              <Form.Item>
                <Radio.Group onChange={handleRadioChange} value={questionsSelected[currentQuestion]?.selectedAnswer[0]}>
                  {console.log(
                    questionsSelected[currentQuestion]?.selectedAnswer,
                    'questionsSelected[currentQuestion]?.selectedAnswer',
                  )}
                  <Space direction="vertical">
                    {answers.map((answer) => (
                      <Radio value={answer.id} key={answer.id} disabled={true}>
                        {answer.is_correct ? <Alert message={answer.content} type="success" /> : <>{answer.content}</>}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            )}
          </Form>

          <div className="button-container">
            <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
              Trước đó
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
              Tiếp theo
            </button>
          </div>
        </div>

        <div className="quiz-sidebar">
          <QuizSidebar
            questions={questions}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            endAt={endAt}
            onQuestionClick={handleQuestionClick}
            questionsSelected={questionsSelected}
          />
          <button onClick={handleSubmitQuiz}>Hoàn thành</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewQuiz;
