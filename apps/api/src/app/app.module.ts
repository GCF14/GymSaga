import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [WorkoutsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
