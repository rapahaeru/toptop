import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storyboard } from '../entities/storyboard.entity';
import { StoryboardsController } from './storyboards.controller';
import { StoryboardsService } from './storyboards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Storyboard])],
  controllers: [StoryboardsController],
  providers: [StoryboardsService],
  exports: [StoryboardsService],
})
export class StoryboardsModule {}
