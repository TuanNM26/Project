import { SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Space, Table, Form, Modal, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import CourseApi from '../../api/course/course';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { STATUS_COURSE } from '../../constant';
import { toast } from 'react-toastify';

const TblCourseRequest = ({ statusCourse, queryKey }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [deleteForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const searchInput = useRef(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const { data: dataCourseProcessing } = useQuery({
    queryKey: [queryKey],
    queryFn: () => CourseApi.adminGetLisCourse({ status: statusCourse }),
    staleTime: 180000,
    cacheTime: 180000,
  });
  useEffect(() => {
    console.log(dataCourseProcessing, 'dataCourseProcessing');
    if (dataCourseProcessing?.data) {
      setDataTable(
        dataCourseProcessing.data.map((el) => {
          console.log(el);
          const startedDate = new Date(el.created_at);
          return {
            key: el.id,
            name: el.name,
            createdAt: startedDate.toLocaleString(),
            price: el.price,
            action:
              statusCourse === STATUS_COURSE.PROCESSING_REQUEST ? (
                <Space size="middle">
                  <Button type="primary" onClick={showModal}>
                    <CheckOutlined />
                  </Button>
                  <Button type="primary" danger onClick={showModalDelete}>
                    <DeleteOutlined />
                  </Button>
                </Space>
              ) : (
                <Space size="middle">
                  <Button type="primary" danger onClick={showModal}>
                    <DeleteOutlined />
                  </Button>
                </Space>
              ),
            status: [el.status],
          };
        }),
      );
    }
  }, [dataCourseProcessing]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === STATUS_COURSE.PROCESSING_REQUEST) {
              color = 'volcano';
            } else if (tag === STATUS_COURSE.PUBLISHED) {
              color = 'green';
            } else {
              color = 'red';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      // ...getColumnSearchProps('address'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
  ];

  const handleRowClick = (record) => {
    console.log('Selected row:', record);
    setSelectedRow(record);
  };

  const rowProps = (record) => {
    return {
      onClick: () => {
        handleRowClick(record);
      },
    };
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const updateStatusCourseMutation = useMutation({
    mutationFn: (payload) => CourseApi.updateStatusCourse(payload),
  });

  const handleOk = () => {
    const values = form.getFieldsValue();
    updateStatusCourseMutation.mutate(
      { course_id: selectedRow.key, status: STATUS_COURSE.PUBLISHED },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('list-course-process');
          toast.success('Gửi yêu cầu thành công!');
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

  const handleOkDelete = () => {
    const values = deleteForm.getFieldsValue();
    updateStatusCourseMutation.mutate(
      { course_id: selectedRow.key, status: STATUS_COURSE.CLOSED },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('list-course-process');
          toast.success('Gửi yêu cầu thành công!');
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

    setIsModalOpenDelete(false);
  };
  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={dataTable} onRow={rowProps} />
      <Modal title="Accepted course" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Bạn có thực sự muốn duyệt khoá học <em>"{selectedRow.name}"</em>{' '}
        </p>
        <p>Vui lòng nhập mật khẩu để duyệt:</p>

        <Form form={form}>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Delete course" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
        <p>
          Bạn có thực sự muốn xoá khoá học <em>"{selectedRow.name}"</em>{' '}
        </p>
        <p>Vui lòng nhập mật khẩu để xoá:</p>

        <Form form={deleteForm}>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TblCourseRequest;
