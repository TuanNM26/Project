import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'ID ví',
    dataIndex: 'walletId',
    key: 'walletId',
  },
  {
    title: 'amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Ngày thực hiện',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Loại',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { type }) => (
      <>
        {type.map((tag) => {
          let txt = '';
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'Deposit') {
            color = 'volcano';
            txt = 'Nạp tiền';
          } else {
            color = 'green';
            txt = 'Rút tiền';
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
    title: 'Trạng thái',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let txt = '';
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'Reject') {
            color = 'volcano';
            txt = 'Từ chối';
          } else if (tag === 'Processing') {
            color = 'geekblue';
            txt = 'Đang chờ xử lý';
          } else {
            color = 'green';
            txt = 'Thành công';
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
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
  },
];
const TableComponent = ({ listRequest }) => {
  console.log(listRequest, 'asdfasdfasdfasdf');
  return <Table columns={columns} dataSource={listRequest} />;
};
export default TableComponent;
