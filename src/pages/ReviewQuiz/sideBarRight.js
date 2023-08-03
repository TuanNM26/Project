import React from 'react';
import { Statistic } from 'antd';
const { Countdown } = Statistic;

const QuizSidebar = ({ questions, currentQuestion, totalQuestions, onQuestionClick, questionsSelected, endAt }) => {
  // Tạo một mảng các số từ 1 đến totalQuestions

  const onFinish = () => {
    console.log('finished!');
  };
  return (
    <div className="quiz-sidebar">
      <h3 className="question-list-title">Danh sách các câu hỏi</h3>
      <div className="question-list-right">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`question-number ${index + 1 === currentQuestion + 1 ? 'active' : ''} ${
              !!questionsSelected.find((el) => el.question_id === question.id && el.selectedAnswer.length > 0)
                ? 'answered'
                : ''
            }`}
            onClick={() => onQuestionClick(index + 1 - 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="timer">
        <h3 className="timer-title">Thời gian còn lại</h3>
        <Countdown value={endAt} onFinish={onFinish} />
      </div>
    </div>
  );
};

export default QuizSidebar;
