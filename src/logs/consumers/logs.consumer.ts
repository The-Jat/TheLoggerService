import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { BaseConsumer }
from 'src/core/events/infrastructure/base.consumer';

import { RabbitMQConnection }
from 'src/core/events/infrastructure/rabbitmq.connection';

import { LogsService }
from '../application/logs.service';

@Injectable()
export class LogsConsumer
  extends BaseConsumer {

  protected queue =
    'system.logs.queue';

  protected routingKeys = [
    'system.logs',
  ];

  protected logger =
    new Logger(LogsConsumer.name);

  constructor(
    rabbit: RabbitMQConnection,

    private logsService:
      LogsService,
  ) {
    super(rabbit);
  }

  protected async handle(
    payload: any,
  ): Promise<void> {

    this.logger.log(
      '📦 CENTRALIZED LOG RECEIVED',
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2,
      ),
    );

    await this.logsService.saveLog(
      payload,
    );
  }
}