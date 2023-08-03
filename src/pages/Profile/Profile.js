import { useEffect, useState } from 'react';

import './App.css';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../api/user/user';
import { toast } from 'react-toastify';
import AvatarUploader from './components/AvatarUloader';
import ProfileInfo from './components/Info';
import ChangePassword from './components/ChangePassword';

const Profile = () => {
  const [user, setUser] = useState({});
  const { data, error, isError, isSuccess } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);
  return (
    <div
      style={{
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <AvatarUploader />
      <ProfileInfo paramUser={user} />
      <ChangePassword paramUser={user} />
    </div>
  );
};

export default Profile;
