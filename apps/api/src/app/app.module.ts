import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WorkoutsModule, 
    PostsModule, 
    CommentsModule, 
    UploadModule,
    UsersModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
