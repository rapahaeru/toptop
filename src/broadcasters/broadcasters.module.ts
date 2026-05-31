import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broadcaster } from '../entities/broadcaster.entity';
import { BroadcastersController } from './broadcasters.controller';
import { BroadcastersService } from './broadcasters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Broadcaster])],
  controllers: [BroadcastersController],
  providers: [BroadcastersService],
  exports: [BroadcastersService],
})
export class BroadcastersModule {}
