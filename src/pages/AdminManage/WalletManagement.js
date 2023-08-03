import './wallet.css';
const WalletManagementScreen = () => {
  const depositRequests = [
    { id: 1, user: 'User 1', amount: 100 },
    { id: 2, user: 'User 2', amount: 200 },
    { id: 3, user: 'User 3', amount: 300 },
  ];

  const handleApproveDeposit = (id) => {
    // Xử lí duyệt yêu cầu nạp tiền với id cho trước
  };

  const handleRejectDeposit = (id) => {
    // Xử lí từ chối yêu cầu nạp tiền với id cho trước
  };

  const renderTable = (requests) => {
    return (
      <table className="wallet-table">
        <thead>
          <tr>
            <th>Người dùng</th>
            <th>Số tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="user-cell">{request.user}</td>
              <td className="amount-cell">{request.amount}</td>
              <td className="action-cell">
                <button onClick={() => handleApproveDeposit(request.id)}>Duyệt</button>{' '}
                <button onClick={() => handleRejectDeposit(request.id)}>Từ chối</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="wallet-management-screen">
      <h2>Quản lý yêu cầu nạp tiền</h2>
      {renderTable(depositRequests)}
    </div>
  );
};

export default WalletManagementScreen;
