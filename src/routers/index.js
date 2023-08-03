import HomePage from '../pages/Home';
import CourseDetailPage from '../pages/CourseDetail';
import MyCoursePage from '../pages/myCourse/MyCourse';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPassword';
import Profile from '../pages/Profile/Profile';
import Wallet from '../pages/Wallet/Wallet';
import QuizPage from '../pages/QuizPractice/QuizPractice';
import Test from '../pages/Test/Test';
import CourseManagement from '../pages/AdminManage/CourseManagement';
import WalletManagement from '../pages/AdminManage/WalletManagement';
import AdminPage from '../pages/AdminManage/AdminPage';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import CourseItem from '../pages/CourseDetail/CourseDetail';
import LessonQuiz from '../pages/LessonQuiz/LessonQuiz';
import ReviewQuiz from '../pages/ReviewQuiz/ReviewQuiz';
import UserManage from '../pages/AdminManage/UserManage';
import Error403 from '../pages/Error/403';

export const publicRoutes = [
  { path: '/', component: HomePage, layout: 2 },
  { path: '/view-course/:id', component: CourseDetailPage, layout: 2 },
  { path: '/my-course', component: MyCoursePage, layout: 2 },
  { path: '/course-manage', component: CourseManagement, layout: 1 },
  { path: '/wallet-manage', component: WalletManagement, layout: 1 },
  { path: '/user-manage', component: UserManage, layout: 1 },
  { path: '/admin', component: AdminPage, layout: 1 },
  { path: '/course/:id', component: CourseItem, layout: 2 },
  { path: '/login', component: LoginPage, layout: null },
  { path: '/lesson/:id/start-quiz/:resultId', component: QuizPage, layout: null },
  { path: '/lesson/:id/review-quiz/:resultId', component: ReviewQuiz, layout: null },
  { path: '/register', component: RegisterPage, layout: null },
  { path: '/reset-password/:id', component: ResetPassword, layout: null },
  { path: '/forgot-password', component: ForgotPasswordPage, layout: null },
  { path: '/profile/:id', component: Profile, layout: 2 },
  { path: '/wallet/:id', component: Wallet, layout: 2 },
  { path: '/test1', component: Test, layout: 2 },
  { path: '/course/:courseId/lesson/:id/quiz', component: LessonQuiz, layout: 2 },
  { path: '/forbidden', component: Error403, layout: null },
];

export const privateRoutes = [];
