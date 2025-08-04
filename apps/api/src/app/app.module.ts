import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';


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
