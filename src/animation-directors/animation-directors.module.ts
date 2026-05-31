import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimationDirector } from '../entities/animation-director.entity';
import { AnimationDirectorsController } from './animation-directors.controller';
import { AnimationDirectorsService } from './animation-directors.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimationDirector])],
  controllers: [AnimationDirectorsController],
  providers: [AnimationDirectorsService],
  exports: [AnimationDirectorsService],
})
export class AnimationDirectorsModule {}
