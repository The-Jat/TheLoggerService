import { Module } from '@nestjs/common';

import { RabbitMQConnection }
from './infrastructure/rabbitmq.connection';

@Module({
  providers: [
    RabbitMQConnection,
  ],

  exports: [
    RabbitMQConnection,
  ],
})
export class EventsModule {}