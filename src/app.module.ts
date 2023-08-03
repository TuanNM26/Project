import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/Database.Module';
import { UserModule } from './modules/user/module/User.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WalletModule } from './modules/wallet/module/Wallet.module';
import { CourseModule } from './modules/course/module/Course.module';
import { RedisModule } from './modules/redis/module/redis.module';
import { EmailModule } from './modules/email/module/Email.module';
import { LessonModule } from './modules/lesson/module/lesson.module';
import { QuizModule } from './modules/quiz/module/Quiz.module';
import { QuestionModule } from './modules/question/module/Question.module';
import { UserCourseModule } from './modules/user-course/module/UserCourse.module';
import { QuizResultModule } from './modules/quiz-result/module/QuizResult.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),
    DatabaseModule,
    RedisModule,
    UserModule,
    AuthModule,
    WalletModule,
    CourseModule,
    EmailModule,
    LessonModule,
    QuizModule,
    QuestionModule,
    UserCourseModule,
    QuizResultModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
