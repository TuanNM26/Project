import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Badge, Modal, Form, Input } from 'antd';
import { UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userApi from '../../api/user/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const UserManage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [activeForm] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalActiveOpen, setIsModalActiveOpen] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (data?.user) {
      if (!data?.user?.role || data?.user?.role !== 'admin') {
        navigate('/forbidden');
      }
    }
  }, [data]);

  const { data: users } = useQuery({
    queryKey: ['List user'],
    queryFn: () => userApi.getListUser(),
    retry: 0,
    staleTime: 180000,
    cacheTime: 180000,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (payload) => userApi.deleteUser(payload),
  });
  const activeUserMutation = useMutation({
    mutationFn: (payload) => userApi.activeUser(payload),
  });

  useEffect(() => {
    if (users?.listUser) {
      const { listUser } = users;
      console.log(listUser, 'asdfasdfasdf');
      setDataTable(
        listUser.map((el) => {
          const { user } = el;
          const { id, username, email, first_name, last_name, role, is_deleted } = user;
          return {
            key: id,
            username,
            email,
            firstName: first_name,
            lastName: last_name,
            role: [role],
            status: !is_deleted ? (
              <Badge status="processing" text="Active" />
            ) : (
              <Badge status="error" text="Inactive" />
            ),
            action: !is_deleted ? (
              <Space size="middle">
                <Button type="primary" danger onClick={showModal}>
                  <UserDeleteOutlined />
                </Button>
              </Space>
            ) : (
              <Space size="middle">
                <Button type="primary" onClick={showModalActive}>
                  <UserAddOutlined />
                </Button>
              </Space>
            ),
          };
        }),
      );
    }
  }, [users]);

  const handleRowClick = (record) => {
    console.log('Selected row:', record);
    setSelectedRow(record);
  };

  const rowProps = (record) => {
    return {
      onClick: () => {
        handleRowClick(record);
        // if (onRowClick) {
        //   onRowClick(record); // Nếu bạn muốn truyền sự kiện lên thành phần cha thông qua props
        // }
      },
    };
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const values = form.getFieldsValue();
    deleteUserMutation.mutate(
      { user_id: selectedRow?.key, password: values?.password },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('List user');
          toast.success('Xoá user thành công!');
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

  const handleActiveCancel = () => {
    setIsModalActiveOpen(false);
  };

  const showModalActive = () => {
    setIsModalActiveOpen(true);
  };
  const handleActiveOk = () => {
    const values = activeForm.getFieldsValue();
    activeUserMutation.mutate(
      { user_id: selectedRow?.key, password: values?.password },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('List user');
          toast.success('Active user thành công!');
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

  return (
    <>
      <Table columns={columns} dataSource={dataTable} onRow={rowProps} />
      <Modal title="Delete user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Bạn có thực sự muốn xoá user <em>"{selectedRow.username}"</em>{' '}
        </p>
        <p>Vui lòng nhập mật khẩu để xoá:</p>

        <Form form={form}>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Active user" open={isModalActiveOpen} onOk={handleActiveOk} onCancel={handleActiveCancel}>
        <p>
          Bạn có thực sự muốn active user <em>"{selectedRow.username}"</em>{' '}
        </p>
        <p>Vui lòng nhập mật khẩu để active:</p>

        <Form form={activeForm}>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserManage;

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    render: (_, { role }) => (
      <>
        {role.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'admin') {
            color = 'volcano';
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
    key: 'action',
    dataIndex: 'action',
  },
];
