import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { BaseConsumer }
from 'src/core/events/infrastructure/base.consumer';

import { RabbitMQConnection }
from 'src/core/events/infrastructure/rabbitmq.connection';

@Injectable()
export class SystemLogConsumer
  extends BaseConsumer {

  protected queue =
    'system.logs.queue';

  protected routingKeys = [
    'system.logs',
  ];

  protected logger =
    new Logger(
      SystemLogConsumer.name,
    );

  constructor(
    rabbit: RabbitMQConnection,
  ) {
    super(rabbit);
  }

  protected async handle(
    payload: any,
  ): Promise<void> {

    console.log(
      '\n📦 CENTRALIZED LOG RECEIVED\n',
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2,
      ),
    );
  }
}