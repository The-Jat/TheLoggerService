import { Injectable } from '@nestjs/common';

import { DatabaseService }
from 'src/database/database.service';

import { LogRepository }
from '../domain/log.repository';

@Injectable()
export class PgLogRepository
  implements LogRepository {

  constructor(
    private db: DatabaseService,
  ) {}

  async create(data: {
    event: string;
    service: string;
    level: string;
    message: string;
    meta: any;
  }): Promise<void> {

    await this.db.query(
      `
      INSERT INTO logs
      (
        event,
        service,
        level,
        message,
        meta
      )

      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        data.event,
        data.service,
        data.level,
        data.message,
        JSON.stringify(data.meta),
      ],
    );
  }
}