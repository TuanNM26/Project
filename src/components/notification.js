import React, { useEffect } from 'react';
import { notification } from 'antd';

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();
  const notificationContent = 'Register success';
  const message = 'Register new account';

  useEffect(() => {
    api['success']({
      message,
      description: notificationContent,
    });
  }, []);

  return <>{contextHolder}</>;
};

export default Notification;
