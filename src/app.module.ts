import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
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
        autoLoadEntities: true, // só mapeia entidades se você criar alguma
        synchronize: false, // mantenha o schema via SQL externo / Flyway / etc.
        charset: String(config.get('DB_CHARSET')),
        extra: {
          connectTimeout: 10000,
          decimalNumbers: true,
        },
        logging: config.get('NODE_ENV') !== 'production',
      }),
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
