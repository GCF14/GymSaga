import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [WorkoutsModule, PostsModule, CommentsModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
