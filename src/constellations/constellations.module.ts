import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constellation } from '../entities/constellation.entity';
import { ConstellationsController } from './constellations.controller';
import { ConstellationsService } from './constellations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Constellation])],
  controllers: [ConstellationsController],
  providers: [ConstellationsService],
})
export class ConstellationsModule {}
