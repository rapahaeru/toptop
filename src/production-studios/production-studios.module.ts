import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionStudio } from '../entities/production-studio.entity';
import { ProductionStudiosController } from './production-studios.controller';
import { ProductionStudiosService } from './production-studios.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionStudio])],
  controllers: [ProductionStudiosController],
  providers: [ProductionStudiosService],
  exports: [ProductionStudiosService],
})
export class ProductionStudiosModule {}
