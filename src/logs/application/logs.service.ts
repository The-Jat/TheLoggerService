import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type {
  LogRepository,
} from '../domain/log.repository';

@Injectable()
export class LogsService {

  constructor(
    @Inject('LogRepository')
    private logsRepo: LogRepository,
  ) {}

  async saveLog(payload: any) {

    await this.logsRepo.create({
      event: payload.event,
      service: payload.service,

      level: payload.data.level,

      message: payload.data.message,

      meta: payload.data.meta,
    });
  }
}