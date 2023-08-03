import { Button, Form, Input, Upload, Modal, Divider, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { ImportOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import quizApi from '../../../api/quiz/quizApi';
import questionApis from '../../../api/question/questionApi';
import { toast } from 'react-toastify';
import lessonApi from '../../../api/lesson/lessonApi';
const onFinish = (values) => {
  console.log('Success:', values);
};

const LessonDetail = (props) => {
  const [form] = Form.useForm();
  const [quizForm] = Form.useForm();
  const [quizCreateForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalQuizOpen, setIsModalQuizOpen] = useState(false);
  const [isModalLessonOpen, setIsModalLessonOpen] = useState(false);
  const [quiz, setQuiz] = useState({});
  const { lessonDetail } = props;
  const queryClient = useQueryClient();
  const [counter, setCounter] = useState(0);
  // const [fileList, setFileList] = useState([]);
  const { data, error } = useQuery({
    queryKey: ['QuizDetail', lessonDetail.id],
    queryFn: () => quizApi.getDetail(lessonDetail.id),
    retry: 0,
    staleTime: 180000,
    cacheTime: 180000,
  });

  const importQuestionMutation = useMutation({
    mutationFn: (payload) => questionApis.insertManyQuestion(payload),
    retry: 0,
  });
  const updateQuizInfoMutation = useMutation({
    mutationFn: (payload) => quizApi.updateQuiz(payload),
  });

  const createQuizMutation = useMutation({
    mutationFn: (payload) => quizApi.createQuiz(payload),
  });

  const updateInfoLessonMutation = useMutation({
    mutationFn: (payload) => lessonApi.updateLessonInfo(payload),
  });

  const updateContentLessonMutation = useMutation({
    mutationFn: (payload) => lessonApi.updateLessonContent(payload),
  });

  useEffect(() => {
    if (error) {
      setQuiz({});
    }

    if (data) {
      const { id, lesson_id, name, pass_score, total_question, total_time, description, total_question_bank } = data;
      quizForm.setFieldsValue({
        testName: name,
        descriptionTest: description,
        totalTime: total_time,
        totalQuestion: total_question,
        passScore: pass_score,
      });
      setQuiz({ id, lesson_id, name, pass_score, total_question, total_time, description, total_question_bank });
    }
  }, [data, error]);

  const fileList = [
    {
      uid: '1',
      name: 'Nội dung bài học',
      status: 'done',
      url: lessonDetail.content,
    },
  ];
  useEffect(() => {
    if (lessonDetail?.name) {
      form.setFieldsValue({
        lessonName: lessonDetail.name,
        description: lessonDetail.description ? lessonDetail.description : '',
        index: lessonDetail.index,
      });
    }
  }, [lessonDetail]);

  const handleUploadQuestion = (info) => {
    setCounter(counter + 1);
    console.log('Load question');
    let fileList = [...info.fileList];

    // Limit the number of uploaded files
    fileList = fileList.slice(-1);

    // Read the file contents
    if (fileList.length > 0 && counter === 1) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(fileList[0].originFileObj);
    }
  };

  const handleUploadFileContent = (info) => {
    const fileList = [...info.fileList];
    updateContentLessonMutation.mutate(
      { lessonId: lessonDetail.id, content: fileList[0].originFileObj },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('CourseDetail', lessonDetail.course_id);
          toast.success('Cập nhật file content bài học thành công!');
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
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    const jsonData = JSON.parse(content);

    console.log(jsonData, 'JsonData');
    importQuestionMutation.mutate(
      { questions: jsonData },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('CourseDetail', lessonDetail.course_id);
          toast.success('Import thành công!');
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
  };

  const showModalLesson = () => {
    setIsModalLessonOpen(true);
  };
  const handleLessonOk = () => {
    const values = form.getFieldsValue();
    const { lessonName, description, index } = values;
    updateInfoLessonMutation.mutate(
      { name: lessonName, description, index: Number(index), lessonId: lessonDetail.id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('CourseDetail', lessonDetail.course_id);
          toast.success('Tạo mới bài kiểm tra thành công!');
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
    setIsModalLessonOpen(false);
  };
  const handleLessonCancel = () => {
    setIsModalLessonOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const values = quizCreateForm.getFieldsValue();
    const { descriptionTest, testName, totalQuestion, totalTime, passScore } = values;
    createQuizMutation.mutate(
      {
        lesson_id: lessonDetail.id,
        name: testName,
        description: descriptionTest,
        pass_score: Number(passScore),
        total_time: Number(totalTime),
        total_question: Number(totalQuestion),
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('QuizDetail', lessonDetail.id);
          toast.success('Tạo mới bài kiểm tra thành công!');
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showQuizModal = () => {
    setIsModalQuizOpen(true);
  };

  const handleQuizOk = () => {
    const values = quizForm.getFieldsValue();
    console.log(values, 'values');
    const { descriptionTest, testName, totalQuestion, totalTime, passScore } = values;
    updateQuizInfoMutation.mutate(
      {
        quizId: quiz.id,
        dataUpdate: {
          name: testName,
          description: descriptionTest,
          pass_score: Number(passScore),
          total_time: Number(totalTime),
          total_question: Number(totalQuestion),
        },
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('QuizDetail', lessonDetail.id);
          toast.success('Cập nhật bài kiểm tra thành công!');
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
    setIsModalQuizOpen(false);
  };

  const handleQuizCancel = () => {
    setIsModalQuizOpen(false);
  };

  return (
    <>
      <Divider>Thông tin bài học</Divider>

      <div>
        <Descriptions
          bordered
          size="default"
          extra={[
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="primary" onClick={showModalLesson} style={{ margin: 10 }}>
                Cập nhật
              </Button>
              <Button type="primary" danger>
                <DeleteOutlined />
              </Button>
              ,
            </div>,
          ]}
        >
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

      <Divider>Nội dung bài học</Divider>
      <Upload listType="picture" maxCount={1} defaultFileList={fileList} onChange={handleUploadFileContent}>
        <Button icon={<ImportOutlined />}>Thay đổi nội dung bài học</Button>
      </Upload>

      <Divider>Thông tin bài kiểm tra</Divider>
      {Object.keys(quiz).length === 0 ? (
        <div>
          <p>Chưa có bài kiểm tra nào.</p>
          <Button type="primary" onClick={showModal}>
            Tạo mới bài kiểm tra
          </Button>
        </div>
      ) : (
        <div>
          <Descriptions
            bordered
            size="default"
            extra={[
              // <Button type="primary" onClick={showQuizModal} icon={<ImportOutlined />}>
              //   Import câu hỏi
              // </Button>,
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Upload key="1" maxCount={1} onChange={handleUploadQuestion}>
                  <Button icon={<ImportOutlined />}>Import câu hỏi</Button>
                </Upload>

                <Button key="2" type="primary" onClick={showQuizModal} style={{ margin: 10 }}>
                  Cập nhật
                </Button>
              </div>,
            ]}
          >
            <Descriptions.Item key="1" label="Tên bài kiểm tra">
              {quiz.name}
            </Descriptions.Item>
            <Descriptions.Item key="2" label="Mô tả">
              {quiz.description}
            </Descriptions.Item>
            <Descriptions.Item key="3" label="Tổng số câu hỏi">
              {quiz.total_question}
            </Descriptions.Item>
            <Descriptions.Item key="4" label="Tổng số câu hỏi trong ngân hàng đề">
              {quiz.total_question_bank}
            </Descriptions.Item>
            <Descriptions.Item key="5" label="Tổng thời gian làm bài">
              {quiz.total_time}
            </Descriptions.Item>
            <Descriptions.Item
              key="6"
              label="Số điểm đạt yêu cầu"
            >{`${quiz.pass_score}/${quiz.total_question}`}</Descriptions.Item>
          </Descriptions>
        </div>
      )}

      {/* <Card title="Nội dung bài học">
        <iframe title={'PDF-Viewer'} src={lessonDetail.content} style={{ height: '60vh', width: '80%' }}></iframe>
      </Card> */}

      <Modal title="Tạo bài kiểm tra" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={quizCreateForm}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, textAlign: 'left' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="testName" rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra' }]}>
            <Input placeholder="Tên bài kiểm tra" />
          </Form.Item>

          <Form.Item
            name="descriptionTest"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả cho bài kiểm tra' }]}
          >
            <Input placeholder="Mô tả về bài kiểm tra" />
          </Form.Item>

          <Form.Item
            name="totalTime"
            rules={[
              { required: true, message: 'Vui lòng nhập tổng số thời gian làm bài' },
              { validator: validateNumber },
            ]}
          >
            <Input placeholder="Thời gian làm bài" />
          </Form.Item>

          <Form.Item
            name="totalQuestion"
            rules={[{ required: true, message: 'Vui lòng nhập tổng số câu hỏi' }, { validator: validateNumber }]}
          >
            <Input placeholder="Tổng số câu hỏi" />
          </Form.Item>

          <Form.Item
            name="passScore"
            rules={[{ required: true, message: 'Vui lòng nhập số điểm đạt yêu cầu' }, { validator: validateNumber }]}
          >
            <Input placeholder="Số điểm đạt yêu cầu" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Start update quiz modal */}
      <Modal title="Sửa bài kiểm tra" open={isModalQuizOpen} onOk={handleQuizOk} onCancel={handleQuizCancel}>
        <Form
          name="basic1"
          form={quizForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, textAlign: 'left' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="testName" rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra' }]}>
            <Input placeholder="Tên bài kiểm tra" />
          </Form.Item>

          <Form.Item
            name="descriptionTest"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả cho bài kiểm tra' }]}
          >
            <Input placeholder="Mô tả về bài kiểm tra" />
          </Form.Item>

          <Form.Item
            name="totalTime"
            rules={[
              { required: true, message: 'Vui lòng nhập tổng số thời gian làm bài' },
              { validator: validateNumber },
            ]}
          >
            <Input placeholder="Thời gian làm bài" />
          </Form.Item>

          <Form.Item
            name="totalQuestion"
            rules={[{ required: true, message: 'Vui lòng nhập tổng số câu hỏi' }, { validator: validateNumber }]}
          >
            <Input placeholder="Tổng số câu hỏi" />
          </Form.Item>

          <Form.Item
            name="passScore"
            rules={[{ required: true, message: 'Vui lòng nhập số điểm đạt yêu cầu' }, { validator: validateNumber }]}
          >
            <Input placeholder="Số điểm đạt yêu cầu" />
          </Form.Item>
        </Form>
      </Modal>
      {/* End update quiz modal */}

      {/* Start Update lessons */}
      <Modal title="Sửa bài học" open={isModalLessonOpen} onOk={handleLessonOk} onCancel={handleLessonCancel}>
        <Form
          form={form}
          name="basic"
          style={{
            maxWidth: '100%',
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="lessonName"
            label="Tên bài học"
            rules={[
              {
                required: true,
                message: 'Tên khoá học không được để trống',
              },
            ]}
          >
            <Input
              placeholder="Tên bài học"
              style={{ border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold' }}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your password!',
            //   },
            // ]}
          >
            <Input placeholder="Mô tả khoá học" style={{ border: 'none', outline: 'none', fontSize: '12px' }} />
          </Form.Item>

          <Form.Item
            label="Thứ tự"
            name="index"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số thứ tự của khoá học',
              },
              { validator: validateNumber },
            ]}
          >
            <Input placeholder="Số thứ tự" style={{ border: 'none', outline: 'none', fontSize: '12px' }} />
          </Form.Item>
        </Form>
      </Modal>
      {/* End update lesson */}
    </>
  );
};

const validateNumber = (rule, value, callback) => {
  const numberPattern = /^\d+$/; // Regular expression to match numeric input
  if (!numberPattern.test(value)) {
    callback('Chỉ được nhập số');
  } else {
    callback();
  }
};

export default LessonDetail;
