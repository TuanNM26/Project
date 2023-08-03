import { useQuery } from '@tanstack/react-query';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import userApi from '../api/user/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const AvatarComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [color] = useState(ColorList[3]);
  const [avatar, setAvatar] = useState(null);

  const { data, error, isError, isSuccess } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });
  useEffect(() => {
    if (isSuccess) {
      const { user } = data;
      setUser(user.username[0].toUpperCase());
      if (user.avatar) {
        setAvatar(user.avatar);
      }
    }
    if (isError) {
      toast.error(error?.response?.data?.message);
      navigate('/login');
    }
  }, [isSuccess, isError]);
  return (
    <>
      {avatar ? (
        <Avatar src={avatar} size="large" gap="2"></Avatar>
      ) : (
        <Avatar
          style={{
            backgroundColor: color,
            verticalAlign: 'middle',
            cursor: 'pointer',
          }}
          size="large"
          gap="2"
        >
          {user}
        </Avatar>
      )}
    </>
  );
};
export default AvatarComponent;
