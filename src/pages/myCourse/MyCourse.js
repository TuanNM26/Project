import { useQuery } from '@tanstack/react-query';
import userApi from '../../api/user/user';
import { useEffect, useState } from 'react';
import ExpertCourses from './expert/ExpertCourses';
import UserCourses from './user/UserCourses';
// const coursesDone = [
//   {
//     image: 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png',
//     title: 'HTML CSS Pro',
//     description: (
//       <div style={{ width: '100%' }}>
//         <p>Học cách đây 2 tháng trước</p>
//         <Progress percent={100} size="small" />
//       </div>
//     ),
//   },
// ];

// const courses = [
//   {
//     image: 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png',
//     title: 'HTML CSS Pro',
//     description: (
//       <div style={{ width: '100%' }}>
//         <p>Học cách đây 2 tháng trước</p>
//         <Progress percent={99} size="small" />
//       </div>
//     ),
//   },
// ];

const MyCourse = () => {
  const [isExpert, setIsExpert] = useState(false);
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (data?.user) {
      if (data.user.role === 'expert') {
        setIsExpert(true);
      }
    }
  }, [data]);
  console.log(isExpert);
  return <>{isExpert ? <ExpertCourses /> : <UserCourses />}</>;
};

export default MyCourse;
