import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimationDirectorsModule } from './animation-directors/animation-directors.module';
import { AuthModule } from './auth/auth.module';
import { BroadcastersModule } from './broadcasters/broadcasters.module';
import { DirectorsModule } from './directors/directors.module';
import { EpisodesModule } from './episodes/episodes.module';
import { GenresModule } from './genres/genres.module';
import { HealthModule } from './health/health.module';
import { ProducersModule } from './producers/producers.module';
import { ProductionStudiosModule } from './production-studios/production-studios.module';
import { ScriptsModule } from './scripts/scripts.module';
import { SeriesModule } from './series/series.module';
import { StoryboardsModule } from './storyboards/storyboards.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 100 }]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'production')
          .default('development'),
        API_PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_CHARSET: Joi.string().default('utf8mb4'),
        DB_COLLATION: Joi.string().default('utf8mb4_unicode_ci'),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: String(config.get('DB_HOST')),
        port: Number(config.get('DB_PORT')),
        username: String(config.get('DB_USER')),
        password: String(config.get('DB_PASSWORD')),
        database: String(config.get('DB_NAME')),
        autoLoadEntities: true,
        synchronize: false,
        charset: String(config.get('DB_CHARSET')),
        extra: {
          connectTimeout: 10000,
          decimalNumbers: true,
        },
        logging: config.get('NODE_ENV') !== 'production',
      }),
    }),
    AuthModule,
    HealthModule,
    UsersModule,
    DirectorsModule,
    GenresModule,
    ProductionStudiosModule,
    ProducersModule,
    BroadcastersModule,
    AnimationDirectorsModule,
    ScriptsModule,
    StoryboardsModule,
    SeriesModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
