import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  async db(): Promise<{ ok: boolean }> {
    // SELECT 1 para validar conexão/pool
    await this.dataSource.query('SELECT 1');
    return { ok: true };
  }
}
