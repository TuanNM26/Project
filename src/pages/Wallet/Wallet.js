import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import TableComponent from '../../components/Table';
import './wallet.css';
import './modal.css';
import { QRCode } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userApi from '../../api/user/user';
import requestApi from '../../api/request/requestApi';
import { toast } from 'react-toastify';
// import QR from '../Wallet/QRCode';

const Wallet = () => {
  const queryClient = useQueryClient();
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [bank, setBank] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(0);
  // const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [walletId, setWalletId] = useState('');
  const [listRequest, setListRequest] = useState([]);
  const createRequestMutation = useMutation({
    mutationFn: (payload) => requestApi.createRequest(payload),
  });

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  const { data: requests } = useQuery({
    queryKey: ['requests', userId],
    queryFn: () => requestApi.userGetListRequest(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (requests?.requests) {
      console.log(requests?.requests, 'list request');
      setListRequest(
        requests?.requests.map((el) => {
          const startedDate = new Date(el.created_at);
          console.log(startedDate);
          return {
            walletId: el.wallet_id,
            note: el.note,
            amount: el.amount,
            type: [el.type],
            createdAt: startedDate.toLocaleString(),
            status: [el.status],
          };
        }),
      );
    }
  }, [requests]);

  useEffect(() => {
    if (data?.user) {
      setUserId(data.user.id);
    }
    if (data?.wallet) {
      setWalletId(data.wallet.id);
      setCurrentBalance(data.wallet.current_balance);
      setPreviousBalance(data.wallet.previous_balance);
    }
  }, [data]);

  const openDepositModal = () => {
    setDepositModalOpen(true);
  };

  const closeDepositModal = () => {
    setDepositModalOpen(false);
    setName('');
    setAccountNumber('');
    setBank('');
    setAmount(0);
  };

  const openWithdrawModal = () => {
    setWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setWithdrawModalOpen(false);
  };

  const handleDeposit = () => {
    // Do something with the entered name, account number, and amount, e.g. submit to a backend server
    console.log('Name:', name);
    console.log('Account Number:', accountNumber);
    console.log('Bank:', bank);
    console.log('Amount:', amount);
    createRequestMutation.mutate(
      {
        user_id: userId,
        wallet_id: walletId,
        amount: Number(amount),
        type: 'Deposit',
        note: `${name}-${accountNumber}-${bank}`,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('requests', userId);
          toast.success('Gửi request thành công!');
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

  const handleWithDraw = () => {
    // Do something with the entered name, account number, and amount, e.g. submit to a backend server
    console.log('Name:', name);
    console.log('Account Number:', accountNumber);
    console.log('Bank:', bank);
    console.log('Amount:', amount);

    createRequestMutation.mutate(
      {
        user_id: userId,
        wallet_id: walletId,
        amount: Number(amount),
        type: 'Deposit',
        note: `${name}-${accountNumber}-${bank}`,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('requests', userId);
          toast.success('Gửi request thành công!');
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
  return (
    <>
      {/* <QR /> */}
      <Divider>Thông tin ví</Divider>
      <div className="wallet-card">
        <p>
          Số dư hiện tại: <span id="current-balance">{currentBalance}</span>
        </p>
        <p>
          Số dư trước đó: <span id="previous-balance">{previousBalance}</span>
        </p>
        <button id="deposit-button" onClick={openDepositModal}>
          Nạp tiền
        </button>
        <button id="withdraw-button" onClick={openWithdrawModal}>
          Rút tiền
        </button>
      </div>

      <Divider>Danh sách các giao dịch nạp rút tiền</Divider>
      <TableComponent listRequest={listRequest} />

      <Modal
        isOpen={isDepositModalOpen}
        onRequestClose={closeDepositModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Nạp tiền</h2>
          <QRCode value="Dữ liệu mã QR code" />

          <div className="modal-info">
            <p>Nhập người nạp: </p>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Người nạp" />

            <p> Nhập Số tài khoản:</p>

            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Số tài khoản"
            />

            <p>Nhập ngân hàng:</p>

            <input type="text" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Ngân hàng" />

            <p>Nhập số tiền cần nạp:</p>

            <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="modal-buttons">
            <button className="modal-button" onClick={closeDepositModal}>
              Hủy
            </button>
            <button className="modal-button modal-button-primary" onClick={handleDeposit}>
              Nạp tiền
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isWithdrawModalOpen}
        onRequestClose={closeWithdrawModal}
        className="modal-withdraw"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Rút tiền</h2>

          <div className="modal-info">
            <p>Nhập người rút: </p>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Người nạp" />

            <p> Nhập Số tài khoản:</p>

            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Số tài khoản"
            />

            <p>Nhập ngân hàng:</p>

            <input type="text" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Ngân hàng" />

            <p>Nhập số tiền cần nạp:</p>

            <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="modal-buttons">
            <button className="modal-button" onClick={closeWithdrawModal}>
              Hủy
            </button>
            <button className="modal-button modal-button-primary" onClick={handleWithDraw}>
              Nạp tiền
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Wallet;
