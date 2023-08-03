import React, { useEffect, useState } from 'react';
import QuizSidebar from './sideBarRight';
import ErrorPage from '../Error/500';
import './QuizPractice.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import quizResultApi from '../../api/quizResult/quizResultApi';
import { Form, Radio, Space, Checkbox, Alert } from 'antd';
import { QUESTION_TYPE } from '../../constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuizPage = () => {
  const navigate = useNavigate();
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
  const [courseId, setCourseId] = useState('');

  const { data, error } = useQuery({
    queryKey: ['result-quiz', resultId],
    queryFn: () => quizResultApi.getQuiz(resultId),
    retry: 1,
    staleTime: 180000,
    cacheTime: 180000,
  });

  const submitQuestionMutation = useMutation({
    mutationFn: (payload) => quizResultApi.submitQuestions(payload),
  });

  const submitQuizMutation = useMutation({
    mutationFn: (payload) => quizResultApi.submitQuiz(payload),
  });

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
    if (data?.resultInfo) {
      console.log(data, 'dafadfasdfsdf');
      const { resultInfo, quizInfo } = data;
      const quizQuestion = resultInfo.quizQuestions;
      setEndAt(resultInfo.end_at);
      setCourseId(resultInfo.course_id);
      setQuizInfo(quizInfo);
      setQuestions(quizQuestion);
      setAnswers(quizQuestion[currentQuestion].answers);
      setQuestionsSelected(quizQuestion.map((el) => ({ question_id: el.id, selectedAnswer: el.selected_answer })));
    }
  }, [data, error]);

  useEffect(() => {
    console.log('Current question change');
  }, [currentQuestion]);

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
    const questionInServer = questions[currentQuestion];
    const { selected_answer: selectAnswerServer } = questionInServer;
    const questionIsSelected = questionsSelected[currentQuestion];
    const { selectedAnswer: selectedAnswerState } = questionIsSelected;

    console.log({ selectedAnswerState, selectAnswerServer }, 'asdfasdfasdfasdfasdfasdf');
    if (JSON.stringify(selectedAnswerState) !== JSON.stringify(selectAnswerServer) && selectedAnswerState.length > 0) {
      submitQuestionMutation.mutate(
        {
          result_id: resultId,
          listQuestions: [{ question_id: questionIsSelected.question_id, selected_answer: selectedAnswerState }],
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries('result-quiz', resultId);
          },
          onError: (error) => {
            toast.error(
              Array.isArray(error?.response?.data?.message)
                ? error?.response?.data?.message[0]
                : error?.response?.data?.message,
            );
          },
        },
      );
    }

    // setPreviousIndex(currentQuestion);

    // Chuyển đến câu hỏi được chọn
    setCurrentQuestion(questionIndex);
    setAnswers(questions[questionIndex].answers);
  };

  const handlePreviousQuestion = () => {
    const questionInServer = questions[currentQuestion];
    const { selected_answer: selectAnswerServer } = questionInServer;
    const questionIsSelected = questionsSelected[currentQuestion];
    const { selectedAnswer: selectedAnswerState } = questionIsSelected;

    console.log({ selectedAnswerState, selectAnswerServer }, 'asdfasdfasdfasdfasdfasdf');
    if (JSON.stringify(selectedAnswerState) !== JSON.stringify(selectAnswerServer) && selectedAnswerState.length > 0) {
      submitQuestionMutation.mutate(
        {
          result_id: resultId,
          listQuestions: [{ question_id: questionIsSelected.question_id, selected_answer: selectedAnswerState }],
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries('result-quiz', resultId);
          },
          onError: (error) => {
            toast.error(
              Array.isArray(error?.response?.data?.message)
                ? error?.response?.data?.message[0]
                : error?.response?.data?.message,
            );
          },
        },
      );
    }
    setCurrentQuestion(currentQuestion - 1);
    setAnswers(questions[currentQuestion - 1].answers);
  };

  const handleNextQuestion = () => {
    const questionInServer = questions[currentQuestion];
    const { selected_answer: selectAnswerServer } = questionInServer;
    const questionIsSelected = questionsSelected[currentQuestion];
    const { selectedAnswer: selectedAnswerState } = questionIsSelected;

    console.log({ selectedAnswerState, selectAnswerServer }, 'asdfasdfasdfasdfasdfasdf');
    if (JSON.stringify(selectedAnswerState) !== JSON.stringify(selectAnswerServer) && selectedAnswerState.length > 0) {
      submitQuestionMutation.mutate(
        {
          result_id: resultId,
          listQuestions: [{ question_id: questionIsSelected.question_id, selected_answer: selectedAnswerState }],
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries('result-quiz', resultId);
          },
          onError: (error) => {
            toast.error(
              Array.isArray(error?.response?.data?.message)
                ? error?.response?.data?.message[0]
                : error?.response?.data?.message,
            );
          },
        },
      );
    }

    setCurrentQuestion(currentQuestion + 1);
    setAnswers(questions[currentQuestion + 1].answers);
  };

  const handleSubmitQuiz = () => {
    submitQuizMutation.mutate(
      { result_id: resultId },
      {
        onSuccess: (data) => {
          navigate('/course/' + courseId + '/lesson/' + id + '/quiz');
          toast.success('Submit success');
        },
        onError: (error) => {
          toast.error(
            Array.isArray(error?.response?.data?.message)
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message,
          );
        },
      },
    );
    alert('ban lam xong r');
  };
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1 className="quiz-title">{quizInfo?.name}</h1>
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
                      <Checkbox value={answer.id} key={answer.id}>
                        {answer.content}
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            ) : (
              <Form.Item>
                <Radio.Group onChange={handleRadioChange} value={questionsSelected[currentQuestion]?.selectedAnswer[0]}>
                  <Space direction="vertical">
                    {answers.map((answer) => (
                      <Radio value={answer.id} key={answer.id}>
                        {answer.content}
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

export default QuizPage;
